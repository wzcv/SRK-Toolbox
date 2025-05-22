/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";


/**
 * ROT13 operation.
 */
class ROT13 extends Operation {

    /**
     * ROT13 constructor
     */
    constructor() {
        super();

        this.name = "ROT13";
        this.module = "Default";
        this.description = "一个简单的凯撒密码，默认情况下把字母偏移13个位置。";
        this.infoURL = "https://wikipedia.org/wiki/ROT13";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "偏移小写字母",
                type: "boolean",
                value: true
            },
            {
                name: "偏移大写字母",
                type: "boolean",
                value: true
            },
            {
                name: "偏移数字",
                type: "boolean",
                value: false
            },
            {
                name: "偏移数量",
                type: "number",
                value: 13
            },
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const output = input,
            rot13Lowercase = args[0],
            rot13Upperacse = args[1],
            rotNumbers = args[2];
        let amount = args[3],
            amountNumbers = args[3];

        if (amount) {
            if (amount < 0) {
                amount = 26 - (Math.abs(amount) % 26);
                amountNumbers = 10 - (Math.abs(amountNumbers) % 10);
            }

            for (let i = 0; i < input.length; i++) {
                let chr = input[i];
                if (rot13Upperacse && chr >= 65 && chr <= 90) { // Upper case
                    chr = (chr - 65 + amount) % 26;
                    output[i] = chr + 65;
                } else if (rot13Lowercase && chr >= 97 && chr <= 122) { // Lower case
                    chr = (chr - 97 + amount) % 26;
                    output[i] = chr + 97;
                } else if (rotNumbers && chr >= 48 && chr <= 57) { // Numbers
                    chr = (chr - 48 + amountNumbers) % 10;
                    output[i] = chr + 48;
                }
            }
        }
        return output;
    }

    /**
     * Highlight ROT13
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight ROT13 in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }
}

export default ROT13;
