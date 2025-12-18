import { resolve } from "path";
import type { DictData, DictEntry, DictResult } from "./types";

/**
 * 查询单词翻译
 * @param word 要查询的单词
 * @returns 查询结果，包含翻译和音标
 */
export function query(word: string): DictResult {
  const emptyResult: DictResult = { w: "", p: "" };

  if (word.length < 2) {
    return emptyResult;
  }

  try {
    const prefix = word.substring(0, 2).toLowerCase();
    const dictPath = resolve(__dirname, `dict/${prefix}.json`);
    const dict: DictData = require(dictPath);

    const entry = dict[word];

    if (!entry) {
      return emptyResult;
    }

    // 判断是对象还是字符串
    if (typeof entry === "object") {
      return {
        w: (entry as DictEntry).t,
        p: (entry as DictEntry).p,
      };
    }

    return {
      w: entry as string,
      p: "",
    };
  } catch (error) {
    // 词典文件不存在或加载失败
    return emptyResult;
  }
}
