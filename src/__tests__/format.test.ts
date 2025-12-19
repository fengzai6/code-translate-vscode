import { describe, expect, it } from "vitest";
import { parseAndQuery } from "../utils/format";

describe("format", () => {
  describe("parseAndQuery", () => {
    it("应该拆分驼峰命名，保留原始大小写", () => {
      const results = parseAndQuery("fooBar");
      expect(results.map((r) => r.word)).toEqual(["foo", "Bar"]);
    });

    it("应该拆分帕斯卡命名，保留原始大小写", () => {
      const results = parseAndQuery("FooBar");
      expect(results.map((r) => r.word)).toEqual(["Foo", "Bar"]);
    });

    it("应该处理全大写单词", () => {
      expect(parseAndQuery("HTTP").map((r) => r.word)).toEqual(["HTTP"]);
      expect(parseAndQuery("API").map((r) => r.word)).toEqual(["API"]);
    });

    it("应该处理连续大写字母", () => {
      expect(parseAndQuery("HTTP Server").map((r) => r.word)).toEqual([
        "HTTP",
        "Server",
      ]);
      expect(parseAndQuery("XMLParser").map((r) => r.word)).toEqual([
        "XML",
        "Parser",
      ]);
    });

    it("应该处理下划线分隔", () => {
      expect(parseAndQuery("foo_bar").map((r) => r.word)).toEqual([
        "foo",
        "bar",
      ]);
    });

    it("应该处理连字符分隔", () => {
      expect(parseAndQuery("foo-bar").map((r) => r.word)).toEqual([
        "foo",
        "bar",
      ]);
    });

    it("应该去重重复的单词（忽略大小写）", () => {
      expect(parseAndQuery("fooFoo").map((r) => r.word)).toEqual(["foo"]);
    });

    it("应该处理空字符串", () => {
      expect(parseAndQuery("")).toEqual([]);
    });

    it("应该处理单个单词", () => {
      expect(parseAndQuery("hello").map((r) => r.word)).toEqual(["hello"]);
      expect(parseAndQuery("HELLO").map((r) => r.word)).toEqual(["HELLO"]);
    });

    it("应该处理混合格式", () => {
      expect(parseAndQuery("get_userName").map((r) => r.word)).toEqual([
        "get",
        "user",
        "Name",
      ]);
      expect(parseAndQuery("HTTP_Server").map((r) => r.word)).toEqual([
        "HTTP",
        "Server",
      ]);
    });

    it("应该拆分组合词", () => {
      const results = parseAndQuery("audioinput");
      expect(results.map((r) => r.word.toLowerCase())).toContain("audio");
      expect(results.map((r) => r.word.toLowerCase())).toContain("input");
    });

    it("应该忽略单字母前缀", () => {
      const results = parseAndQuery("IBoardList");
      const words = results.map((r) => r.word.toLowerCase());
      expect(words).not.toContain("i");
      expect(words).toContain("board");
      expect(words).toContain("list");
    });

    it("应该处理 HTTPServer", () => {
      expect(parseAndQuery("HTTPServer").map((r) => r.word)).toEqual([
        "HTTP",
        "Server",
      ]);
    });

    it("应该处理复杂的混合情况", () => {
      const results = parseAndQuery("IHTTPService");
      expect(results.map((r) => r.word)).toEqual(["HTTP", "Service"]);
    });

    it("应该返回查询结果", () => {
      const results = parseAndQuery("user");
      expect(results.length).toBe(1);
      expect(results[0].result?.w).toBe("user");
      expect(results[0].result?.t).toBeTruthy();
    });

    it("应该清理引号", () => {
      const results = parseAndQuery('"hello"');
      expect(results.map((r) => r.word)).toEqual(["hello"]);
    });

    it("应该移除数字", () => {
      const results = parseAndQuery("user123");
      expect(results.map((r) => r.word)).toEqual(["user"]);
    });
  });
});
