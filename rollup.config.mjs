import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { dirname } from "path";
import copy from "rollup-plugin-copy";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  input: "src/extension.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: true,
    exports: "named",
  },
  external: ["vscode", "path", "fs", "util", "stream", "os", "assert"],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    copy({
      targets: [{ src: "src/dict", dest: "dist" }],
      verbose: true,
      flatten: false,
    }),
  ],
};
