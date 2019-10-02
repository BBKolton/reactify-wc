import ts from "rollup-plugin-typescript2";
import cjs from "rollup-plugin-commonjs";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    ts({
      typescript: require("typescript")
    }),
    cjs({
      include: ["node_modules/**"],
      exclude: ["node_modules/process-es6/**"],
      namedExports: {
        "node_modules/react/index.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement",
          "createRef"
        ],
        "node_modules/react-dom/index.js": ["render"]
      }
    }),
    terser()
  ]
};
