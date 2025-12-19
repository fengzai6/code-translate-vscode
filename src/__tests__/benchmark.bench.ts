import { bench, describe } from "vitest";
import { parseAndQuery } from "../utils/format";

describe("parseAndQuery 性能测试", () => {
  // 简单单词
  bench("简单单词 - hello", () => {
    parseAndQuery("hello");
  });

  bench("简单单词 - user", () => {
    parseAndQuery("user");
  });

  // 驼峰命名
  bench("驼峰命名 - getUserName", () => {
    parseAndQuery("getUserName");
  });

  bench("驼峰命名 - fooBar", () => {
    parseAndQuery("fooBar");
  });

  // 帕斯卡命名
  bench("帕斯卡命名 - UserName", () => {
    parseAndQuery("UserName");
  });

  // 连续大写
  bench("连续大写 - HTTPServer", () => {
    parseAndQuery("HTTPServer");
  });

  bench("连续大写 - XMLParser", () => {
    parseAndQuery("XMLParser");
  });

  // 复杂情况
  bench("复杂情况 - IHTTPService", () => {
    parseAndQuery("IHTTPService");
  });

  bench("复杂情况 - IUser", () => {
    parseAndQuery("IUser");
  });

  // 组合词
  bench("组合词 - audioinput", () => {
    parseAndQuery("audioinput");
  });

  bench("组合词 - videooutput", () => {
    parseAndQuery("videooutput");
  });

  // 下划线分隔
  bench("下划线 - user_name", () => {
    parseAndQuery("user_name");
  });

  bench("下划线 - HTTP_Server", () => {
    parseAndQuery("HTTP_Server");
  });

  // 缩写形式
  bench("缩写 - Ht", () => {
    parseAndQuery("Ht");
  });

  bench("缩写 - HTTP", () => {
    parseAndQuery("HTTP");
  });

  // 专有名词
  bench("专有名词 - Ezechiel", () => {
    parseAndQuery("Ezechiel");
  });

  // 带数字
  bench("带数字 - user123", () => {
    parseAndQuery("user123");
  });

  // 长单词
  bench("长单词 - internationalization", () => {
    parseAndQuery("internationalization");
  });

  // 不存在的单词
  bench("不存在 - xyzabc", () => {
    parseAndQuery("xyzabc");
  });
});
