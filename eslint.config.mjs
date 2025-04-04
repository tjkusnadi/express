import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly"
      },
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: "latest"
    },
    plugins: { "@typescript-eslint": ts },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-console": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "indent": ["error", 2],
      "no-trailing-spaces": "error",
    }
  }
];
