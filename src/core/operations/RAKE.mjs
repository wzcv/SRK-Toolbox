/**
 * @author sw5678
 * @copyright Crown Copyright 2024
 * @license Apache-2.0
 * 
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";

/**
 * RAKE operation
 */
class RAKE extends Operation {

    /**
     * RAKE constructor
     */
    constructor() {
        super();

        this.name = "RAKE";
        this.module = "Default";
        this.description = [
            "快速自动关键词提取（Rapid Automatic Keyword Extraction，RAKE）",
            "<br><br>",
            "RAKE是自然语言处理（NLP）中的一种领域无关的关键词提取算法。",
            "<br><br>",
            "终止词（Stop words）的列表来自NLTK Python包。",
        ].join("\n");
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "词分隔符（正则）",
                type: "text",
                value: "\\s"
            },
            {
                name: "句分隔符（正则）",
                type: "text",
                value: "\\.\\s|\\n"
            },
            {
                name: "终止词（Stop Words）",
                type: "text",
                value: "i,me,my,myself,we,our,ours,ourselves,you,you're,you've,you'll,you'd,your,yours,yourself,yourselves,he,him,his,himself,she,she's,her,hers,herself,it,it's,its,itsef,they,them,their,theirs,themselves,what,which,who,whom,this,that,that'll,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does',did,doing,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,s,t,can,will,just,don,don't,should,should've,now,d,ll,m,o,re,ve,y,ain,aren,aren't,couldn,couldn't,didn,didn't,doesn,doesn't,hadn,hadn't,hasn,hasn't,haven,haven't,isn,isn't,ma,mightn,mightn't,mustn,mustn't,needn,needn't,shan,shan't,shouldn,shouldn't,wasn,wasn't,weren,weren't,won,won't,wouldn,wouldn't"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {

        // Get delimiter regexs
        const wordDelim =  new RegExp(args[0], "g");
        const sentDelim = new RegExp(args[1], "g");

        // Deduplicate the stop words and add the empty string
        const stopWords = args[2].toLowerCase().replace(/ /g, "").split(",").unique();
        stopWords.push("");

        // Lower case input and remove start and ending whitespace
        input = input.toLowerCase().trim();

        // Get tokens, token count, and phrases
        const tokens = [];
        const wordFrequencies = [];
        let phrases = [];

        // Build up list of phrases and token counts
        const sentences = input.split(sentDelim);
        for (const sent of sentences) {

            // Split sentence into words
            const splitSent = sent.split(wordDelim);
            let startIndex = 0;

            for (let i = 0; i < splitSent.length; i++) {
                const token = splitSent[i];
                if (stopWords.includes(token)) {
                    // If token is stop word then split to create phrase
                    phrases.push(splitSent.slice(startIndex, i));
                    startIndex = i + 1;
                } else {
                    // If token is not a stop word add to the count of the list of words
                    if (tokens.includes(token)) {
                        wordFrequencies[tokens.indexOf(token)]+=1;
                    } else {
                        tokens.push(token);
                        wordFrequencies.push(1);
                    }
                }
            }
            phrases.push(splitSent.slice(startIndex));
        }

        // remove empty phrases
        phrases = phrases.filter(subArray => subArray.length > 0);

        // Remove duplicate phrases
        const uniquePhrases = [...new Set(phrases.map(function (phrase) {
            return phrase.join(" ");
        }))];
        phrases = uniquePhrases.map(function (phrase) {
            return phrase.split(" ");
        });

        // Generate word_degree_matrix and populate
        const wordDegreeMatrix = Array.from(Array(tokens.length), _ => Array(tokens.length).fill(0));
        phrases.forEach(function (phrase) {
            phrase.forEach(function (word1) {
                phrase.forEach(function (word2) {
                    wordDegreeMatrix[tokens.indexOf(word1)][tokens.indexOf(word2)]++;
                });
            });
        });

        // Calculate degree score for each token
        const degreeScores = Array(tokens.length).fill(0);
        for (let i=0; i<tokens.length; i++) {
            let wordDegree = 0;
            for (let j=0; j<wordDegreeMatrix.length; j++) {
                wordDegree += wordDegreeMatrix[j][i];
            }
            degreeScores[i] = wordDegree / wordFrequencies[i];
        }

        // Calculate score for each phrase
        const scores = phrases.map(function (phrase) {
            let score = 0;
            phrase.forEach(function (token) {
                score += degreeScores[tokens.indexOf(token)];
            });
            return new Array(score, phrase.join(" "));
        });
        scores.sort((a, b) => b[0] - a[0]);
        scores.unshift(new Array("评分：", "关键词："));

        // Output works with the 'To Table' functionality already built into CC
        return scores.map(function (score) {
            return score.join(", ");
        }).join("\n");
    }
}

export default RAKE;
