/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * To HTML Entity operation
 */
class ToHTMLEntity extends Operation {

    /**
     * ToHTMLEntity constructor
     */
    constructor() {
        super();

        this.name = "HTML实体编码";
        this.module = "Encodings";
        this.description = "把字符编码为HTML实体<br><br>例： <code>&amp;</code> 编码为 <code>&amp;<span>amp;</span></code>";
        this.infoURL = "https://wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "转换所有字符",
                "type": "boolean",
                "value": false
            },
            {
                "name": "转换成",
                "type": "option",
                "value": ["名称", "十进制", "十六进制"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const convertAll = args[0],
            numeric = args[1] === "十进制",
            hexa = args[1] === "十六进制";

        const charcodes = Utils.strToCharcode(input);
        let output = "";

        for (let i = 0; i < charcodes.length; i++) {
            if (convertAll && numeric) {
                output += "&#" + charcodes[i] + ";";
            } else if (convertAll && hexa) {
                output += "&#x" + Utils.hex(charcodes[i]) + ";";
            } else if (convertAll) {
                output += byteToEntity[charcodes[i]] || "&#" + charcodes[i] + ";";
            } else if (numeric) {
                if (charcodes[i] > 255 || charcodes[i] in byteToEntity) {
                    output += "&#" + charcodes[i] + ";";
                } else {
                    output += Utils.chr(charcodes[i]);
                }
            } else if (hexa) {
                if (charcodes[i] > 255 || charcodes[i] in byteToEntity) {
                    output += "&#x" + Utils.hex(charcodes[i]) + ";";
                } else {
                    output += Utils.chr(charcodes[i]);
                }
            } else {
                output += byteToEntity[charcodes[i]] || (
                    charcodes[i] > 255 ?
                        "&#" + charcodes[i] + ";" :
                        Utils.chr(charcodes[i])
                );
            }
        }
        return output;
    }

}

/**
 * Lookup table to translate byte values to their HTML entity codes.
 */
const byteToEntity = {
    9: "&Tab;",
    10: "&NewLine;",
    33: "&excl;",
    34: "&quot;",
    35: "&num;",
    36: "&dollar;",
    37: "&percnt;",
    38: "&amp;",
    39: "&apos;",
    40: "&lpar;",
    41: "&rpar;",
    42: "&ast;",
    43: "&plus;",
    44: "&comma;",
    46: "&period;",
    47: "&sol;",
    58: "&colon;",
    59: "&semi;",
    60: "&lt;",
    61: "&equals;",
    62: "&gt;",
    63: "&quest;",
    64: "&commat;",
    91: "&lsqb;",
    92: "&bsol;",
    93: "&rsqb;",
    94: "&Hat;",
    95: "&lowbar;",
    96: "&grave;",
    123: "&lcub;",
    124: "&verbar;",
    125: "&rcub;",
    160: "&nbsp;",
    161: "&iexcl;",
    162: "&cent;",
    163: "&pound;",
    164: "&curren;",
    165: "&yen;",
    166: "&brvbar;",
    167: "&sect;",
    168: "&uml;",
    169: "&copy;",
    170: "&ordf;",
    171: "&laquo;",
    172: "&not;",
    173: "&shy;",
    174: "&reg;",
    175: "&macr;",
    176: "&deg;",
    177: "&plusmn;",
    178: "&sup2;",
    179: "&sup3;",
    180: "&acute;",
    181: "&micro;",
    182: "&para;",
    183: "&middot;",
    184: "&cedil;",
    185: "&sup1;",
    186: "&ordm;",
    187: "&raquo;",
    188: "&frac14;",
    189: "&frac12;",
    190: "&frac34;",
    191: "&iquest;",
    192: "&Agrave;",
    193: "&Aacute;",
    194: "&Acirc;",
    195: "&Atilde;",
    196: "&Auml;",
    197: "&Aring;",
    198: "&AElig;",
    199: "&Ccedil;",
    200: "&Egrave;",
    201: "&Eacute;",
    202: "&Ecirc;",
    203: "&Euml;",
    204: "&Igrave;",
    205: "&Iacute;",
    206: "&Icirc;",
    207: "&Iuml;",
    208: "&ETH;",
    209: "&Ntilde;",
    210: "&Ograve;",
    211: "&Oacute;",
    212: "&Ocirc;",
    213: "&Otilde;",
    214: "&Ouml;",
    215: "&times;",
    216: "&Oslash;",
    217: "&Ugrave;",
    218: "&Uacute;",
    219: "&Ucirc;",
    220: "&Uuml;",
    221: "&Yacute;",
    222: "&THORN;",
    223: "&szlig;",
    224: "&agrave;",
    225: "&aacute;",
    226: "&acirc;",
    227: "&atilde;",
    228: "&auml;",
    229: "&aring;",
    230: "&aelig;",
    231: "&ccedil;",
    232: "&egrave;",
    233: "&eacute;",
    234: "&ecirc;",
    235: "&euml;",
    236: "&igrave;",
    237: "&iacute;",
    238: "&icirc;",
    239: "&iuml;",
    240: "&eth;",
    241: "&ntilde;",
    242: "&ograve;",
    243: "&oacute;",
    244: "&ocirc;",
    245: "&otilde;",
    246: "&ouml;",
    247: "&divide;",
    248: "&oslash;",
    249: "&ugrave;",
    250: "&uacute;",
    251: "&ucirc;",
    252: "&uuml;",
    253: "&yacute;",
    254: "&thorn;",
    255: "&yuml;",
    256: "&Amacr;",
    257: "&amacr;",
    258: "&Abreve;",
    259: "&abreve;",
    260: "&Aogon;",
    261: "&aogon;",
    262: "&Cacute;",
    263: "&cacute;",
    264: "&Ccirc;",
    265: "&ccirc;",
    266: "&Cdot;",
    267: "&cdot;",
    268: "&Ccaron;",
    269: "&ccaron;",
    270: "&Dcaron;",
    271: "&dcaron;",
    272: "&Dstrok;",
    273: "&dstrok;",
    274: "&Emacr;",
    275: "&emacr;",
    278: "&Edot;",
    279: "&edot;",
    280: "&Eogon;",
    281: "&eogon;",
    282: "&Ecaron;",
    283: "&ecaron;",
    284: "&Gcirc;",
    285: "&gcirc;",
    286: "&Gbreve;",
    287: "&gbreve;",
    288: "&Gdot;",
    289: "&gdot;",
    290: "&Gcedil;",
    292: "&Hcirc;",
    293: "&hcirc;",
    294: "&Hstrok;",
    295: "&hstrok;",
    296: "&Itilde;",
    297: "&itilde;",
    298: "&Imacr;",
    299: "&imacr;",
    302: "&Iogon;",
    303: "&iogon;",
    304: "&Idot;",
    305: "&imath;",
    306: "&IJlig;",
    307: "&ijlig;",
    308: "&Jcirc;",
    309: "&jcirc;",
    310: "&Kcedil;",
    311: "&kcedil;",
    312: "&kgreen;",
    313: "&Lacute;",
    314: "&lacute;",
    315: "&Lcedil;",
    316: "&lcedil;",
    317: "&Lcaron;",
    318: "&lcaron;",
    319: "&Lmidot;",
    320: "&lmidot;",
    321: "&Lstrok;",
    322: "&lstrok;",
    323: "&Nacute;",
    324: "&nacute;",
    325: "&Ncedil;",
    326: "&ncedil;",
    327: "&Ncaron;",
    328: "&ncaron;",
    329: "&napos;",
    330: "&ENG;",
    331: "&eng;",
    332: "&Omacr;",
    333: "&omacr;",
    336: "&Odblac;",
    337: "&odblac;",
    338: "&OElig;",
    339: "&oelig;",
    340: "&Racute;",
    341: "&racute;",
    342: "&Rcedil;",
    343: "&rcedil;",
    344: "&Rcaron;",
    345: "&rcaron;",
    346: "&Sacute;",
    347: "&sacute;",
    348: "&Scirc;",
    349: "&scirc;",
    350: "&Scedil;",
    351: "&scedil;",
    352: "&Scaron;",
    353: "&scaron;",
    354: "&Tcedil;",
    355: "&tcedil;",
    356: "&Tcaron;",
    357: "&tcaron;",
    358: "&Tstrok;",
    359: "&tstrok;",
    360: "&Utilde;",
    361: "&utilde;",
    362: "&Umacr;",
    363: "&umacr;",
    364: "&Ubreve;",
    365: "&ubreve;",
    366: "&Uring;",
    367: "&uring;",
    368: "&Udblac;",
    369: "&udblac;",
    370: "&Uogon;",
    371: "&uogon;",
    372: "&Wcirc;",
    373: "&wcirc;",
    374: "&Ycirc;",
    375: "&ycirc;",
    376: "&Yuml;",
    377: "&Zacute;",
    378: "&zacute;",
    379: "&Zdot;",
    380: "&zdot;",
    381: "&Zcaron;",
    382: "&zcaron;",
    402: "&fnof;",
    437: "&imped;",
    501: "&gacute;",
    567: "&jmath;",
    710: "&circ;",
    711: "&caron;",
    728: "&breve;",
    729: "&dot;",
    730: "&ring;",
    731: "&ogon;",
    732: "&tilde;",
    785: "&DownBreve;",
    818: "&UnderBar;",
    913: "&Alpha;",
    914: "&Beta;",
    915: "&Gamma;",
    916: "&Delta;",
    917: "&Epsilon;",
    918: "&Zeta;",
    919: "&Eta;",
    920: "&Theta;",
    921: "&Iota;",
    922: "&Kappa;",
    923: "&Lambda;",
    924: "&Mu;",
    925: "&Nu;",
    926: "&Xi;",
    927: "&Omicron;",
    928: "&Pi;",
    929: "&Rho;",
    931: "&Sigma;",
    932: "&Tau;",
    933: "&Upsilon;",
    934: "&Phi;",
    935: "&Chi;",
    936: "&Psi;",
    937: "&Omega;",
    945: "&alpha;",
    946: "&beta;",
    947: "&gamma;",
    948: "&delta;",
    949: "&epsilon;",
    950: "&zeta;",
    951: "&eta;",
    952: "&theta;",
    953: "&iota;",
    954: "&kappa;",
    955: "&lambda;",
    956: "&mu;",
    957: "&nu;",
    958: "&xi;",
    959: "&omicron;",
    960: "&pi;",
    961: "&rho;",
    962: "&sigmaf;",
    963: "&sigma;",
    964: "&tau;",
    965: "&upsilon;",
    966: "&phi;",
    967: "&chi;",
    968: "&psi;",
    969: "&omega;",
    977: "&thetasym;",
    978: "&upsih;",
    981: "&straightphi;",
    982: "&piv;",
    988: "&Gammad;",
    989: "&gammad;",
    1008: "&kappav;",
    1009: "&rhov;",
    1013: "&epsi;,",
    1014: "&bepsi;",
    1025: "&IOcy;",
    1026: "&DJcy;",
    1027: "&GJcy;",
    1028: "&Jukcy;",
    1029: "&DScy;",
    1030: "&Iukcy;",
    1031: "&YIcy;",
    1032: "&Jsercy;",
    1033: "&LJcy;",
    1034: "&NJcy;",
    1035: "&TSHcy;",
    1036: "&KJcy;",
    1038: "&Ubrcy;",
    1039: "&DZcy;",
    1040: "&Acy;",
    1041: "&Bcy;",
    1042: "&Vcy;",
    1043: "&Gcy;",
    1044: "&Dcy;",
    1045: "&IEcy;",
    1046: "&ZHcy;",
    1047: "&Zcy;",
    1048: "&Icy;",
    1049: "&Jcy;",
    1050: "&Kcy;",
    1051: "&Lcy;",
    1052: "&Mcy;",
    1053: "&Ncy;",
    1054: "&Ocy;",
    1055: "&Pcy;",
    1056: "&Rcy;",
    1057: "&Scy;",
    1058: "&Tcy;",
    1059: "&Ucy;",
    1060: "&Fcy;",
    1061: "&KHcy;",
    1062: "&TScy;",
    1063: "&CHcy;",
    1064: "&SHcy;",
    1065: "&SHCHcy;",
    1066: "&HARDcy;",
    1067: "&Ycy;",
    1068: "&SOFTcy;",
    1069: "&Ecy;",
    1070: "&YUcy;",
    1071: "&YAcy;",
    1072: "&acy;",
    1073: "&bcy;",
    1074: "&vcy;",
    1075: "&gcy;",
    1076: "&dcy;",
    1077: "&iecy;",
    1078: "&zhcy;",
    1079: "&zcy;",
    1080: "&icy;",
    1081: "&jcy;",
    1082: "&kcy;",
    1083: "&lcy;",
    1084: "&mcy;",
    1085: "&ncy;",
    1086: "&ocy;",
    1087: "&pcy;",
    1088: "&rcy;",
    1089: "&scy;",
    1090: "&tcy;",
    1091: "&ucy;",
    1092: "&fcy;",
    1093: "&khcy;",
    1094: "&tscy;",
    1095: "&chcy;",
    1096: "&shcy;",
    1097: "&shchcy;",
    1098: "&hardcy;",
    1099: "&ycy;",
    1100: "&softcy;",
    1101: "&ecy;",
    1102: "&yucy;",
    1103: "&yacy;",
    1105: "&iocy;",
    1106: "&djcy;",
    1107: "&gjcy;",
    1108: "&jukcy;",
    1109: "&dscy;",
    1110: "&iukcy;",
    1111: "&yicy;",
    1112: "&jsercy;",
    1113: "&ljcy;",
    1114: "&njcy;",
    1115: "&tshcy;",
    1116: "&kjcy;",
    1118: "&ubrcy;",
    1119: "&dzcy;",
    8194: "&ensp;",
    8195: "&emsp;",
    8196: "&emsp13;",
    8197: "&emsp14;",
    8199: "&numsp;",
    8200: "&puncsp;",
    8201: "&thinsp;",
    8202: "&hairsp;",
    8203: "&ZeroWidthSpace;",
    8204: "&zwnj;",
    8205: "&zwj;",
    8206: "&lrm;",
    8207: "&rlm;",
    8208: "&hyphen;",
    8211: "&ndash;",
    8212: "&mdash;",
    8213: "&horbar;",
    8214: "&Verbar;",
    8216: "&lsquo;",
    8217: "&rsquo;",
    8218: "&sbquo;",
    8220: "&ldquo;",
    8221: "&rdquo;",
    8222: "&bdquo;",
    8224: "&dagger;",
    8225: "&Dagger;",
    8226: "&bull;",
    8229: "&nldr;",
    8230: "&hellip;",
    8240: "&permil;",
    8241: "&pertenk;",
    8242: "&prime;",
    8243: "&Prime;",
    8244: "&tprime;",
    8245: "&bprime;",
    8249: "&lsaquo;",
    8250: "&rsaquo;",
    8254: "&oline;",
    8257: "&caret;",
    8259: "&hybull;",
    8260: "&frasl;",
    8271: "&bsemi;",
    8279: "&qprime;",
    8287: "&MediumSpace;",
    8288: "&NoBreak;",
    8289: "&ApplyFunction;",
    8290: "&InvisibleTimes;",
    8291: "&InvisibleComma;",
    8364: "&euro;",
    8411: "&tdot;",
    8412: "&DotDot;",
    8450: "&Copf;",
    8453: "&incare;",
    8458: "&gscr;",
    8459: "&hamilt;",
    8460: "&Hfr;",
    8461: "&quaternions;",
    8462: "&planckh;",
    8463: "&planck;",
    8464: "&Iscr;",
    8465: "&image;",
    8466: "&Lscr;",
    8467: "&ell;",
    8469: "&Nopf;",
    8470: "&numero;",
    8471: "&copysr;",
    8472: "&weierp;",
    8473: "&Popf;",
    8474: "&rationals;",
    8475: "&Rscr;",
    8476: "&real;",
    8477: "&reals;",
    8478: "&rx;",
    8482: "&trade;",
    8484: "&integers;",
    8486: "&ohm;",
    8487: "&mho;",
    8488: "&Zfr;",
    8489: "&iiota;",
    8491: "&angst;",
    8492: "&bernou;",
    8493: "&Cfr;",
    8495: "&escr;",
    8496: "&Escr;",
    8497: "&Fscr;",
    8499: "&phmmat;",
    8500: "&order;",
    8501: "&alefsym;",
    8502: "&beth;",
    8503: "&gimel;",
    8504: "&daleth;",
    8517: "&CapitalDifferentialD;",
    8518: "&DifferentialD;",
    8519: "&ExponentialE;",
    8520: "&ImaginaryI;",
    8531: "&frac13;",
    8532: "&frac23;",
    8533: "&frac15;",
    8534: "&frac25;",
    8535: "&frac35;",
    8536: "&frac45;",
    8537: "&frac16;",
    8538: "&frac56;",
    8539: "&frac18;",
    8540: "&frac38;",
    8541: "&frac58;",
    8542: "&frac78;",
    8592: "&larr;",
    8593: "&uarr;",
    8594: "&rarr;",
    8595: "&darr;",
    8596: "&harr;",
    8597: "&varr;",
    8598: "&nwarr;",
    8599: "&nearr;",
    8600: "&searr;",
    8601: "&swarr;",
    8602: "&nlarr;",
    8603: "&nrarr;",
    8605: "&rarrw;",
    8606: "&Larr;",
    8607: "&Uarr;",
    8608: "&Rarr;",
    8609: "&Darr;",
    8610: "&larrtl;",
    8611: "&rarrtl;",
    8612: "&LeftTeeArrow;",
    8613: "&UpTeeArrow;",
    8614: "&map;",
    8615: "&DownTeeArrow;",
    8617: "&larrhk;",
    8618: "&rarrhk;",
    8619: "&larrlp;",
    8620: "&rarrlp;",
    8621: "&harrw;",
    8622: "&nharr;",
    8624: "&lsh;",
    8625: "&rsh;",
    8626: "&ldsh;",
    8627: "&rdsh;",
    8629: "&crarr;",
    8630: "&cularr;",
    8631: "&curarr;",
    8634: "&olarr;",
    8635: "&orarr;",
    8636: "&lharu;",
    8637: "&lhard;",
    8638: "&uharr;",
    8639: "&uharl;",
    8640: "&rharu;",
    8641: "&rhard;",
    8642: "&dharr;",
    8643: "&dharl;",
    8644: "&rlarr;",
    8645: "&udarr;",
    8646: "&lrarr;",
    8647: "&llarr;",
    8648: "&uuarr;",
    8649: "&rrarr;",
    8650: "&ddarr;",
    8651: "&lrhar;",
    8652: "&rlhar;;",
    8653: "&nlArr;",
    8654: "&nhArr;",
    8655: "&nrArr;",
    8656: "&lArr;",
    8657: "&uArr;",
    8658: "&rArr;",
    8659: "&dArr;",
    8660: "&hArr;",
    8661: "&vArr;",
    8662: "&nwArr;",
    8663: "&neArr;",
    8664: "&seArr;",
    8665: "&swArr;",
    8666: "&lAarr;",
    8667: "&rAarr;",
    8669: "&zigrarr;",
    8676: "&larrb;",
    8677: "&rarrb;",
    8693: "&duarr;",
    8701: "&loarr;",
    8702: "&roarr;",
    8703: "&hoarr;",
    8704: "&forall;",
    8705: "&comp;",
    8706: "&part;",
    8707: "&exist;",
    8708: "&nexist;",
    8709: "&empty;",
    8711: "&nabla;",
    8712: "&isin;",
    8713: "&notin;",
    8715: "&ni;",
    8716: "&notni;",
    8719: "&prod;",
    8720: "&coprod;",
    8721: "&sum;",
    8722: "&minus;",
    8723: "&mnplus;",
    8724: "&plusdo;",
    8726: "&setmn;",
    8727: "&lowast;",
    8728: "&compfn;",
    8730: "&radic;",
    8733: "&prop;",
    8734: "&infin;",
    8735: "&angrt;",
    8736: "&ang;",
    8737: "&angmsd;",
    8738: "&angsph;",
    8739: "&mid;",
    8740: "&nmid;",
    8741: "&par;",
    8742: "&npar;",
    8743: "&and;",
    8744: "&or;",
    8745: "&cap;",
    8746: "&cup;",
    8747: "&int;",
    8748: "&Int;",
    8749: "&tint;",
    8750: "&conint;",
    8751: "&Conint;",
    8752: "&Cconint;",
    8753: "&cwint;",
    8754: "&cwconint;",
    8755: "&awconint;",
    8756: "&there4;",
    8757: "&becaus;",
    8758: "&ratio;",
    8759: "&Colon;",
    8760: "&minusd;",
    8762: "&mDDot;",
    8763: "&homtht;",
    8764: "&sim;",
    8765: "&bsim;",
    8766: "&ac;",
    8767: "&acd;",
    8768: "&wreath;",
    8769: "&nsim;",
    8770: "&esim;",
    8771: "&sime;",
    8772: "&nsime;",
    8773: "&cong;",
    8774: "&simne;",
    8775: "&ncong;",
    8776: "&asymp;",
    8777: "&nap;",
    8778: "&ape;",
    8779: "&apid;",
    8780: "&bcong;",
    8781: "&asympeq;",
    8782: "&bump;",
    8783: "&bumpe;",
    8784: "&esdot;",
    8785: "&eDot;",
    8786: "&efDot;",
    8787: "&erDot;",
    8788: "&colone;",
    8789: "&ecolon;",
    8790: "&ecir;",
    8791: "&cire;",
    8793: "&wedgeq;",
    8794: "&veeeq;",
    8796: "&trie;",
    8799: "&equest;",
    8800: "&ne;",
    8801: "&equiv;",
    8802: "&nequiv;",
    8804: "&le;",
    8805: "&ge;",
    8806: "&lE;",
    8807: "&gE;",
    8808: "&lnE;",
    8809: "&gnE;",
    8810: "&Lt;",
    8811: "&Gt;",
    8812: "&twixt;",
    8813: "&NotCupCap;",
    8814: "&nlt;",
    8815: "&ngt;",
    8816: "&nle;",
    8817: "&nge;;",
    8818: "&lsim;",
    8819: "&gsim;",
    8820: "&nlsim;",
    8821: "&ngsim;",
    8822: "&lg;",
    8823: "&gl;",
    8824: "&ntlg;",
    8825: "&ntgl;",
    8826: "&pr;",
    8827: "&sc;",
    8828: "&prcue;",
    8829: "&sccue;",
    8830: "&prsim;",
    8831: "&scsim;",
    8832: "&npr;",
    8833: "&nsc;",
    8834: "&sub;",
    8835: "&sup;",
    8836: "&nsub;",
    8837: "&nsup;",
    8838: "&sube;",
    8839: "&supe;",
    8840: "&nsube;",
    8841: "&nsupe;",
    8842: "&subne;",
    8843: "&supne;",
    8845: "&cupdot;",
    8846: "&uplus;",
    8847: "&sqsub;",
    8848: "&sqsup;",
    8849: "&sqsube;",
    8850: "&sqsupe;",
    8851: "&sqcap;",
    8852: "&sqcup;",
    8853: "&oplus;",
    8854: "&ominus;",
    8855: "&otimes;",
    8856: "&osol;",
    8857: "&odot;",
    8858: "&ocir;",
    8859: "&oast;",
    8861: "&odash;",
    8862: "&plusb;",
    8863: "&minusb;",
    8864: "&timesb;",
    8865: "&sdotb;",
    8866: "&vdash;",
    8867: "&dashv;",
    8868: "&top;",
    8869: "&perp;",
    8871: "&models;",
    8872: "&vDash;",
    8873: "&Vdash;",
    8874: "&Vvdash;",
    8875: "&VDash;",
    8876: "&nvdash;",
    8877: "&nvDash;",
    8878: "&nVdash;",
    8879: "&nVDash;",
    8880: "&prurel;",
    8882: "&vltri;",
    8883: "&vrtri;",
    8884: "&ltrie;",
    8885: "&rtrie;",
    8886: "&origof;",
    8887: "&imof;",
    8888: "&mumap;",
    8889: "&hercon;",
    8890: "&intcal;",
    8891: "&veebar;",
    8893: "&barvee;",
    8894: "&angrtvb;",
    8895: "&lrtri;",
    8896: "&xwedge;",
    8897: "&xvee;",
    8898: "&xcap;",
    8899: "&xcup;",
    8900: "&diam;",
    8901: "&sdot;",
    8902: "&sstarf;",
    8903: "&divonx;",
    8904: "&bowtie;",
    8905: "&ltimes;",
    8906: "&rtimes;",
    8907: "&lthree;",
    8908: "&rthree;",
    8909: "&bsime;",
    8910: "&cuvee;",
    8911: "&cuwed;",
    8912: "&Sub;",
    8913: "&Sup;",
    8914: "&Cap;",
    8915: "&Cup;",
    8916: "&fork;",
    8917: "&epar;",
    8918: "&ltdot;",
    8919: "&gtdot;",
    8920: "&Ll;",
    8921: "&Gg;",
    8922: "&leg;",
    8923: "&gel;",
    8926: "&cuepr;",
    8927: "&cuesc;",
    8928: "&nprcue;",
    8929: "&nsccue;",
    8930: "&nsqsube;",
    8931: "&nsqsupe;",
    8934: "&lnsim;",
    8935: "&gnsim;",
    8936: "&prnsim;",
    8937: "&scnsim;",
    8938: "&nltri;",
    8939: "&nrtri;",
    8940: "&nltrie;",
    8941: "&nrtrie;",
    8942: "&vellip;",
    8943: "&ctdot;",
    8944: "&utdot;",
    8945: "&dtdot;",
    8946: "&disin;",
    8947: "&isinsv;",
    8948: "&isins;",
    8949: "&isindot;",
    8950: "&notinvc;",
    8951: "&notinvb;",
    8953: "&isinE;",
    8954: "&nisd;",
    8955: "&xnis;",
    8956: "&nis;",
    8957: "&notnivc;",
    8958: "&notnivb;",
    8965: "&barwed;",
    8966: "&Barwed;",
    8968: "&lceil;",
    8969: "&rceil;",
    8970: "&lfloor;",
    8971: "&rfloor;",
    8972: "&drcrop;",
    8973: "&dlcrop;",
    8974: "&urcrop;",
    8975: "&ulcrop;",
    8976: "&bnot;",
    8978: "&profline;",
    8979: "&profsurf;",
    8981: "&telrec;",
    8982: "&target;",
    8988: "&ulcorn;",
    8989: "&urcorn;",
    8990: "&dlcorn;",
    8991: "&drcorn;",
    8994: "&frown;",
    8995: "&smile;",
    9001: "&lang;",
    9002: "&rang;",
    9005: "&cylcty;",
    9006: "&profalar;",
    9014: "&topbot;",
    9021: "&ovbar;",
    9023: "&solbar;",
    9084: "&angzarr;",
    9136: "&lmoust;",
    9137: "&rmoust;",
    9140: "&tbrk;",
    9141: "&bbrk;",
    9142: "&bbrktbrk;",
    9180: "&OverParenthesis;",
    9181: "&UnderParenthesis;",
    9182: "&OverBrace;",
    9183: "&UnderBrace;",
    9186: "&trpezium;",
    9191: "&elinters;",
    9251: "&blank;",
    9416: "&oS;",
    9472: "&boxh;",
    9474: "&boxv;",
    9484: "&boxdr;",
    9488: "&boxdl;",
    9492: "&boxur;",
    9496: "&boxul;",
    9500: "&boxvr;",
    9508: "&boxvl;",
    9516: "&boxhd;",
    9524: "&boxhu;",
    9532: "&boxvh;",
    9552: "&boxH;",
    9553: "&boxV;",
    9554: "&boxdR;",
    9555: "&boxDr;",
    9556: "&boxDR;",
    9557: "&boxdL;",
    9558: "&boxDl;",
    9559: "&boxDL;",
    9560: "&boxuR;",
    9561: "&boxUr;",
    9562: "&boxUR;",
    9563: "&boxuL;",
    9564: "&boxUl;",
    9565: "&boxUL;",
    9566: "&boxvR;",
    9567: "&boxVr;",
    9568: "&boxVR;",
    9569: "&boxvL;",
    9570: "&boxVl;",
    9571: "&boxVL;",
    9572: "&boxHd;",
    9573: "&boxhD;",
    9674: "&loz;",
    9675: "&cir;",
    9708: "&tridot;",
    9711: "&xcirc;",
    9720: "&ultri;",
    9721: "&urtri;",
    9722: "&lltri;",
    9723: "&EmptySmallSquare;",
    9724: "&FilledSmallSquare;",
    9733: "&starf;",
    9734: "&star;",
    9742: "&phone;",
    9792: "&female;",
    9794: "&male;",
    9824: "&spades;",
    9827: "&clubs;",
    9829: "&hearts;",
    9830: "&diams;",
    9834: "&sung;",
    9837: "&flat;",
    9838: "&natur;",
    9839: "&sharp;",
    10003: "&check;",
    10007: "&cross;",
    10016: "&malt;",
    10038: "&sext;",
    10072: "&VerticalSeparator;",
    10098: "&lbbrk;",
    10099: "&rbbrk;",
    10214: "&lobrk;",
    10215: "&robrk;",
    10216: "&lang;",
    10217: "&rang;",
    10218: "&Lang;",
    10219: "&Rang;",
    10220: "&loang;",
    10221: "&roang;",
    10229: "&xlarr;",
    10230: "&xrarr;",
    10231: "&xharr;",
    10232: "&xlArr;",
    10233: "&xrArr;",
    10234: "&xhArr;",
    10236: "&xmap;",
    10239: "&dzigrarr;",
    10498: "&nvlArr;",
    10499: "&nvrArr;",
    10500: "&nvHarr;",
    10501: "&Map;",
    10508: "&lbarr;",
    10509: "&rbarr;",
    10510: "&lBarr;",
    10511: "&rBarr;",
    10512: "&RBarr;",
    10513: "&DDotrahd;",
    10514: "&UpArrowBar;",
    10515: "&DownArrowBar;",
    10518: "&Rarrtl;",
    10521: "&latail;",
    10522: "&ratail;",
    10523: "&lAtail;",
    10524: "&rAtail;",
    10525: "&larrfs;",
    10526: "&rarrfs;",
    10527: "&larrbfs;",
    10528: "&rarrbfs;",
    10531: "&nwarhk;",
    10532: "&nearhk;",
    10533: "&searhk;",
    10534: "&swarhk;",
    10535: "&nwnear;",
    10536: "&nesear;",
    10537: "&seswar;",
    10538: "&swnwar;",
    10547: "&rarrc;",
    10549: "&cudarrr;",
    10550: "&ldca;",
    10551: "&rdca;",
    10552: "&cudarrl;",
    10553: "&larrpl;",
    10556: "&curarrm;",
    10557: "&cularrp;",
    10565: "&rarrpl;",
    10568: "&harrcir;",
    10569: "&Uarrocir;",
    10570: "&lurdshar;",
    10571: "&ldrushar;",
    10574: "&LeftRightVector;",
    10575: "&RightUpDownVector;",
    10576: "&DownLeftRightVector;",
    10577: "&LeftUpDownVector;",
    10578: "&LeftVectorBar;",
    10579: "&RightVectorBar;",
    10580: "&RightUpVectorBar;",
    10581: "&RightDownVectorBar;",
    10582: "&DownLeftVectorBar;",
    10583: "&DownRightVectorBar;",
    10584: "&LeftUpVectorBar;",
    10585: "&LeftDownVectorBar;",
    10586: "&LeftTeeVector;",
    10587: "&RightTeeVector;",
    10588: "&RightUpTeeVector;",
    10589: "&RightDownTeeVector;",
    10590: "&DownLeftTeeVector;",
    10591: "&DownRightTeeVector;",
    10592: "&LeftUpTeeVector;",
    10593: "&LeftDownTeeVector;",
    10594: "&lHar;",
    10595: "&uHar;",
    10596: "&rHar;",
    10597: "&dHar;",
    10598: "&luruhar;",
    10599: "&ldrdhar;",
    10600: "&ruluhar;",
    10601: "&rdldhar;",
    10602: "&lharul;",
    10603: "&llhard;",
    10604: "&rharul;",
    10605: "&lrhard;",
    10606: "&udhar;",
    10607: "&duhar;",
    10608: "&RoundImplies;",
    10609: "&erarr;",
    10610: "&simrarr;",
    10611: "&larrsim;",
    10612: "&rarrsim;",
    10613: "&rarrap;",
    10614: "&ltlarr;",
    10616: "&gtrarr;",
    10617: "&subrarr;",
    10619: "&suplarr;",
    10620: "&lfisht;",
    10621: "&rfisht;",
    10622: "&ufisht;",
    10623: "&dfisht;",
    10629: "&lopar;",
    10630: "&ropar;",
    10635: "&lbrke;",
    10636: "&rbrke;",
    10637: "&lbrkslu;",
    10638: "&rbrksld;",
    10639: "&lbrksld;",
    10640: "&rbrkslu;",
    10641: "&langd;",
    10642: "&rangd;",
    10643: "&lparlt;",
    10644: "&rpargt;",
    10645: "&gtlPar;",
    10646: "&ltrPar;",
    10650: "&vzigzag;",
    10652: "&vangrt;",
    10653: "&angrtvbd;",
    10660: "&ange;",
    10661: "&range;",
    10662: "&dwangle;",
    10663: "&uwangle;",
    10664: "&angmsdaa;",
    10665: "&angmsdab;",
    10666: "&angmsdac;",
    10667: "&angmsdad;",
    10668: "&angmsdae;",
    10669: "&angmsdaf;",
    10670: "&angmsdag;",
    10671: "&angmsdah;",
    10672: "&bemptyv;",
    10673: "&demptyv;",
    10674: "&cemptyv;",
    10675: "&raemptyv;",
    10676: "&laemptyv;",
    10677: "&ohbar;",
    10678: "&omid;",
    10679: "&opar;",
    10681: "&operp;",
    10683: "&olcross;",
    10684: "&odsold;",
    10686: "&olcir;",
    10687: "&ofcir;",
    10688: "&olt;",
    10689: "&ogt;",
    10690: "&cirscir;",
    10691: "&cirE;",
    10692: "&solb;",
    10693: "&bsolb;",
    10697: "&boxbox;",
    10701: "&trisb;",
    10702: "&rtriltri;",
    10703: "&LeftTriangleBar;",
    10704: "&RightTriangleBar;",
    10714: "&race;",
    10716: "&iinfin;",
    10717: "&infintie;",
    10718: "&nvinfin;",
    10723: "&eparsl;",
    10724: "&smeparsl;",
    10725: "&eqvparsl;",
    10731: "&lozf;",
    10740: "&RuleDelayed;",
    10742: "&dsol;",
    10752: "&xodot;",
    10753: "&xoplus;",
    10754: "&xotime;",
    10756: "&xuplus;",
    10758: "&xsqcup;",
    10764: "&qint;",
    10765: "&fpartint;",
    10768: "&cirfnint;",
    10769: "&awint;",
    10770: "&rppolint;",
    10771: "&scpolint;",
    10772: "&npolint;",
    10773: "&pointint;",
    10774: "&quatint;",
    10775: "&intlarhk;",
    10786: "&pluscir;",
    10787: "&plusacir;",
    10788: "&simplus;",
    10789: "&plusdu;",
    10790: "&plussim;",
    10791: "&plustwo;",
    10793: "&mcomma;",
    10794: "&minusdu;",
    10797: "&loplus;",
    10798: "&roplus;",
    10799: "&Cross;",
    10800: "&timesd;",
    10801: "&timesbar;",
    10803: "&smashp;",
    10804: "&lotimes;",
    10805: "&rotimes;",
    10806: "&otimesas;",
    10807: "&Otimes;",
    10808: "&odiv;",
    10809: "&triplus;",
    10810: "&triminus;",
    10811: "&tritime;",
    10812: "&iprod;",
    10815: "&amalg;",
    10816: "&capdot;",
    10818: "&ncup;",
    10819: "&ncap;",
    10820: "&capand;",
    10821: "&cupor;",
    10822: "&cupcap;",
    10823: "&capcup;",
    10824: "&cupbrcap;",
    10825: "&capbrcup;",
    10826: "&cupcup;",
    10827: "&capcap;",
    10828: "&ccups;",
    10829: "&ccaps;",
    10832: "&ccupssm;",
    10835: "&And;",
    10836: "&Or;",
    10837: "&andand;",
    10838: "&oror;",
    10839: "&orslope;",
    10840: "&andslope;",
    10842: "&andv;",
    10843: "&orv;",
    10844: "&andd;",
    10845: "&ord;",
    10847: "&wedbar;",
    10854: "&sdote;",
    10858: "&simdot;",
    10861: "&congdot;",
    10862: "&easter;",
    10863: "&apacir;",
    10864: "&apE;",
    10865: "&eplus;",
    10866: "&pluse;",
    10867: "&Esim;",
    10868: "&Colone;",
    10869: "&Equal;",
    10871: "&eDDot;",
    10872: "&equivDD;",
    10873: "&ltcir;",
    10874: "&gtcir;",
    10875: "&ltquest;",
    10876: "&gtquest;",
    10877: "&les;",
    10878: "&ges;",
    10879: "&lesdot;",
    10880: "&gesdot;",
    10881: "&lesdoto;",
    10882: "&gesdoto;",
    10883: "&lesdotor;",
    10884: "&gesdotol;",
    10885: "&lap;",
    10886: "&gap;",
    10887: "&lne;",
    10888: "&gne;",
    10889: "&lnap;",
    10890: "&gnap;",
    10891: "&lEg;",
    10892: "&gEl;",
    10893: "&lsime;",
    10894: "&gsime;",
    10895: "&lsimg;",
    10896: "&gsiml;",
    10897: "&lgE;",
    10898: "&glE;",
    10899: "&lesges;",
    10900: "&gesles;",
    10901: "&els;",
    10902: "&egs;",
    10903: "&elsdot;",
    10904: "&egsdot;",
    10905: "&el;",
    10906: "&eg;",
    10909: "&siml;",
    10910: "&simg;",
    10911: "&simlE;",
    10912: "&simgE;",
    10913: "&LessLess;",
    10914: "&GreaterGreater;",
    10916: "&glj;",
    10917: "&gla;",
    10918: "&ltcc;",
    10919: "&gtcc;",
    10920: "&lescc;",
    10921: "&gescc;",
    10922: "&smt;",
    10923: "&lat;",
    10924: "&smte;",
    10925: "&late;",
    10926: "&bumpE;",
    10927: "&pre;",
    10928: "&sce;",
    10931: "&prE;",
    10932: "&scE;",
    10933: "&prnE;",
    10934: "&scnE;",
    10935: "&prap;",
    10936: "&scap;",
    10937: "&prnap;",
    10938: "&scnap;",
    10939: "&Pr;",
    10940: "&Sc;",
    10941: "&subdot;",
    10942: "&supdot;",
    10943: "&subplus;",
    10944: "&supplus;",
    10945: "&submult;",
    10946: "&supmult;",
    10947: "&subedot;",
    10948: "&supedot;",
    10949: "&subE;",
    10950: "&supE;",
    10951: "&subsim;",
    10952: "&supsim;",
    10955: "&subnE;",
    10956: "&supnE;",
    10959: "&csub;",
    10960: "&csup;",
    10961: "&csube;",
    10962: "&csupe;",
    10963: "&subsup;",
    10964: "&supsub;",
    10965: "&subsub;",
    10966: "&supsup;",
    10967: "&suphsub;",
    10968: "&supdsub;",
    10969: "&forkv;",
    10970: "&topfork;",
    10971: "&mlcp;",
    10980: "&Dashv;",
    10982: "&Vdashl;",
    10983: "&Barv;",
    10984: "&vBar;",
    10985: "&vBarv;",
    10987: "&Vbar;",
    10988: "&Not;",
    10989: "&bNot;",
    10990: "&rnmid;",
    10991: "&cirmid;",
    10992: "&midcir;",
    10993: "&topcir;",
    10994: "&nhpar;",
    10995: "&parsim;",
    11005: "&parsl;",
    64256: "&fflig;",
    64257: "&filig;",
    64258: "&fllig;",
    64259: "&ffilig;",
    64260: "&ffllig;",
    119964: "&Ascr;",
    119966: "&Cscr;",
    119967: "&Dscr;",
    119970: "&Gscr;",
    119973: "&Jscr;",
    119974: "&Kscr;",
    119977: "&Nscr;",
    119978: "&Oscr;",
    119979: "&Pscr;",
    119980: "&Qscr;",
    119982: "&Sscr;",
    119983: "&Tscr;",
    119984: "&Uscr;",
    119985: "&Vscr;",
    119986: "&Wscr;",
    119987: "&Xscr;",
    119988: "&Yscr;",
    119989: "&Zscr;",
    119990: "&ascr;",
    119991: "&bscr;",
    119992: "&cscr;",
    119993: "&dscr;",
    119995: "&fscr;",
    119997: "&hscr;",
    119998: "&iscr;",
    119999: "&jscr;",
    120000: "&kscr;",
    120001: "&lscr;",
    120002: "&mscr;",
    120003: "&nscr;",
    120005: "&pscr;",
    120006: "&qscr;",
    120007: "&rscr;",
    120008: "&sscr;",
    120009: "&tscr;",
    120010: "&uscr;",
    120011: "&vscr;",
    120012: "&wscr;",
    120013: "&xscr;",
    120014: "&yscr;",
    120015: "&zscr;",
    120068: "&Afr;",
    120069: "&Bfr;",
    120071: "&Dfr;",
    120072: "&Efr;",
    120073: "&Ffr;",
    120074: "&Gfr;",
    120077: "&Jfr;",
    120078: "&Kfr;",
    120079: "&Lfr;",
    120080: "&Mfr;",
    120081: "&Nfr;",
    120082: "&Ofr;",
    120083: "&Pfr;",
    120084: "&Qfr;",
    120086: "&Sfr;",
    120087: "&Tfr;",
    120088: "&Ufr;",
    120089: "&Vfr;",
    120090: "&Wfr;",
    120091: "&Xfr;",
    120092: "&Yfr;",
    120094: "&afr;",
    120095: "&bfr;",
    120096: "&cfr;",
    120097: "&dfr;",
    120098: "&efr;",
    120099: "&ffr;",
    120100: "&gfr;",
    120101: "&hfr;",
    120102: "&ifr;",
    120103: "&jfr;",
    120104: "&kfr;",
    120105: "&lfr;",
    120106: "&mfr;",
    120107: "&nfr;",
    120108: "&ofr;",
    120109: "&pfr;",
    120110: "&qfr;",
    120111: "&rfr;",
    120112: "&sfr;",
    120113: "&tfr;",
    120114: "&ufr;",
    120115: "&vfr;",
    120116: "&wfr;",
    120117: "&xfr;",
    120118: "&yfr;",
    120119: "&zfr;",
    120120: "&Aopf;",
    120121: "&Bopf;",
    120123: "&Dopf;",
    120124: "&Eopf;",
    120125: "&Fopf;",
    120126: "&Gopf;",
    120128: "&Iopf;",
    120129: "&Jopf;",
    120130: "&Kopf;",
    120131: "&Lopf;",
    120132: "&Mopf;",
    120134: "&Oopf;",
    120138: "&Sopf;",
    120139: "&Topf;",
    120140: "&Uopf;",
    120141: "&Vopf;",
    120142: "&Wopf;",
    120143: "&Xopf;",
    120144: "&Yopf;",
    120146: "&aopf;",
    120147: "&bopf;",
    120148: "&copf;",
    120149: "&dopf;",
    120150: "&eopf;",
    120151: "&fopf;",
    120152: "&gopf;",
    120153: "&hopf;",
    120154: "&iopf;",
    120155: "&jopf;",
    120156: "&kopf;",
    120157: "&lopf;",
    120158: "&mopf;",
    120159: "&nopf;",
    120160: "&oopf;",
    120161: "&popf;",
    120162: "&qopf;",
    120163: "&ropf;",
    120164: "&sopf;",
    120165: "&topf;",
    120166: "&uopf;",
    120167: "&vopf;",
    120168: "&wopf;",
    120169: "&xopf;",
    120170: "&yopf;",
    120171: "&zopf;"
};

export default ToHTMLEntity;
