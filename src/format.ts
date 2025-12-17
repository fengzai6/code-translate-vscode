import { camelize, decamelize, pascalize } from "./humps";

/**
 * 单词拆分
 * 例: fooBar 拆分为 [foo, bar]
 * @param character 要拆分的字符
 * @returns 拆分后的单词数组
 */
export function getWordArray(character: string): string[] {
  let formatChar = character;

  // 处理连续大写字母
  const capitalizes = formatChar.match(/[A-Z\s]{2,}/g);
  if (capitalizes?.length) {
    capitalizes.forEach((item) => {
      formatChar = formatChar.replace(item, pascalize(item.toLowerCase()));
    });
  }

  if (!formatChar) {
    return [];
  }

  // 判断是否全大写
  if (/^[A-Z]+$/.test(character)) {
    return [character.toLowerCase()];
  }

  // 拆分单词并去重
  const words = decamelize(camelize(formatChar), { separator: "|" }).split("|");
  return Array.from(new Set(words));
}

/**
 * 清理单词中的引号
 * @param character 要清理的字符
 * @returns 清理后的字符
 */
export function cleanWord(character: string): string {
  return character.replace(/"/g, "");
}
