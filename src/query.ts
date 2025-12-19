import { resolve } from "path";
import type { DictData } from "./types";

/**
 * 生成单词的各种大小写变体
 * 按优先级排序：原文 → 小写 → 首字母大写 → 首字母大写加点 → 缩写形式 → 全大写
 */
export function getWordVariants(word: string): string[] {
  const variants: string[] = [word];
  const lowerWord = word.toLowerCase();
  const upperWord = word.toUpperCase();
  const capitalizedWord =
    lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
  // 首字母大写加点（缩写形式），如 Ht -> Ht.
  const capitalizedWithDot = capitalizedWord + ".";

  if (lowerWord !== word) variants.push(lowerWord);
  if (capitalizedWord !== word && capitalizedWord !== lowerWord) {
    variants.push(capitalizedWord);
  }
  variants.push(capitalizedWithDot);
  if (upperWord !== word) variants.push(upperWord);

  return variants;
}

/**
 * 加载词典文件
 */
export function loadDict(word: string): DictData | null {
  if (word.length < 2) return null;

  try {
    const prefix = word.substring(0, 2).toLowerCase();
    const dictPath = resolve(__dirname, `dict/${prefix}.json`);
    return require(dictPath);
  } catch {
    return null;
  }
}

/**
 * 在词典中查找单词，返回匹配的变体
 */
export function findInDict(word: string, dict: DictData): string | null {
  const variants = getWordVariants(word);
  for (const variant of variants) {
    if (dict[variant]) {
      return variant;
    }
  }
  return null;
}

/**
 * 检查单词是否在词典中存在
 */
export function isWordInDict(word: string): boolean {
  if (word.length < 2) return false;
  const dict = loadDict(word);
  if (!dict) return false;
  return findInDict(word, dict) !== null;
}
