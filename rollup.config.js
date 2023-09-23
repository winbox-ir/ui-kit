import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import terser from "@rollup/plugin-terser"
import ts from "rollup-plugin-ts"

const packageJson = require("./package.json")

export default [
  {
    input: "./index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/__tests__", "**/*.test.ts", "**/*.stories.tsx"],
      }),
      commonjs(),
      resolve(),
      postcss({
        extract: true,
      }),
      terser(),
    ],
  },
  {
    input: "./dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      ts({
        /* Plugin options */
      }),
    ],
    // NEW
    external: [/\.css|\.scss$/],
  },
]
