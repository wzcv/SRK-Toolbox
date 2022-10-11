/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {INFLATE_BUFFER_TYPE} from "../lib/Zlib.mjs";
import rawinflate from "zlibjs/bin/rawinflate.min.js";
import OperationError from "../errors/OperationError.mjs";

const Zlib = rawinflate.Zlib;

const RAW_BUFFER_TYPE_LOOKUP = {
    "自适应": Zlib.RawInflate.BufferType.ADAPTIVE,
    "块":    Zlib.RawInflate.BufferType.BLOCK,
};

/**
 * Raw Inflate operation
 */
class RawInflate extends Operation {

    /**
     * RawInflate constructor
     */
    constructor() {
        super();

        this.name = "Raw Inflate";
        this.module = "Compression";
        this.description = "解压缩使用无头部deflate算法压缩的数据。";
        this.infoURL = "https://wikipedia.org/wiki/DEFLATE";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "起始索引",
                type: "number",
                value: 0
            },
            {
                name: "起始输出缓冲区尺寸",
                type: "number",
                value: 0
            },
            {
                name: "缓冲区扩展类型",
                type: "option",
                value: INFLATE_BUFFER_TYPE
            },
            {
                name: "解压缩后重置缓冲区尺寸",
                type: "boolean",
                value: false
            },
            {
                name: "验证结果",
                type: "boolean",
                value: false
            }
        ];
        this.checks = [
            {
                entropyRange: [7.5, 8],
                args: [0, 0, INFLATE_BUFFER_TYPE, false, false]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const inflate = new Zlib.RawInflate(new Uint8Array(input), {
                index: args[0],
                bufferSize: args[1],
                bufferType: RAW_BUFFER_TYPE_LOOKUP[args[2]],
                resize: args[3],
                verify: args[4]
            }),
            result = new Uint8Array(inflate.decompress());

        // Raw Inflate sometimes messes up and returns nonsense like this:
        // ]....]....]....]....]....]....]....]....]....]....]....]....]....]...
        // e.g. Input data of [8b, 1d, dc, 44]
        // Look for the first two square brackets:
        if (result.length > 158 && result[0] === 93 && result[5] === 93) {
            // If the first two square brackets are there, check that the others
            // are also there. If they are, throw an error. If not, continue.
            let valid = false;
            for (let i = 0; i < 155; i += 5) {
                if (result[i] !== 93) {
                    valid = true;
                }
            }

            if (!valid) {
                throw new OperationError("错误：无法解压数据");
            }
        }
        // This seems to be the easiest way...
        return result.buffer;
    }

}

export default RawInflate;
