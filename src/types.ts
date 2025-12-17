/**
 * 词典查询结果
 */
export interface DictResult {
  /** 翻译内容 */
  w: string;
  /** 音标 */
  p: string;
}

/**
 * 词典条目
 */
export interface DictEntry {
  /** 单词 */
  w: string;
  /** 音标 */
  p: string;
  /** 翻译 */
  t: string;
}

/**
 * 词典数据结构
 */
export type DictData = Record<string, DictEntry | string>;
