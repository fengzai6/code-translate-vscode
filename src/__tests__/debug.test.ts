import { describe, it } from "vitest";
import { parseAndQuery } from "../utils/format";

describe("debug parseAndQuery", () => {
  it("调试 IUser", () => {
    const results = parseAndQuery("IUser");
    console.log(
      "IUser words:",
      results.map((r) => r.word)
    );
    console.log(
      "IUser results:",
      results.map((r) => r.result)
    );
  });

  it("调试 HTTPServer", () => {
    const results = parseAndQuery("HTTPServer");
    console.log(
      "HTTPServer words:",
      results.map((r) => r.word)
    );
    console.log(
      "HTTPServer results:",
      results.map((r) => r.result)
    );
  });

  it("调试 user123", () => {
    const results = parseAndQuery("user123");
    console.log(
      "user123 words:",
      results.map((r) => r.word)
    );
    console.log(
      "user123 results:",
      results.map((r) => r.result)
    );
  });

  it("调试 Ht", () => {
    const results = parseAndQuery("Ht");
    console.log(
      "Ht words:",
      results.map((r) => r.word)
    );
    console.log(
      "Ht results:",
      results.map((r) => r.result)
    );
  });

  it("调试 IHTTPService", () => {
    const results = parseAndQuery("IHTTPService");
    console.log(
      "IHTTPService words:",
      results.map((r) => r.word)
    );
    console.log(
      "IHTTPService results:",
      results.map((r) => r.result)
    );
  });

  it("调试 Ezechiel", () => {
    const results = parseAndQuery("Ezechiel");
    console.log(
      "Ezechiel words:",
      results.map((r) => r.word)
    );
    console.log(
      "Ezechiel results:",
      results.map((r) => r.result)
    );
  });
});
