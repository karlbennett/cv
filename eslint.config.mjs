import jest from "eslint-plugin-jest";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    ignores: ["**/*.css", "**/*.svg"],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ),
  {
    plugins: {
      jest,
      react,
      "react-hooks": fixupPluginRules(reactHooks),
      "jsx-a11y": jsxA11Y,
      import: fixupPluginRules(_import),
      "@typescript-eslint": typescriptEslint,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
        ...globals.mocha,
      },
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      "import/extensions": [".js", ".mjs", ".jsx", ".js", ".jsx", ".ts", ".tsx"],
      "import/resolver": {
        typescript: {},
      },
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-use-before-define": "off",
      "import/prefer-default-export": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-filename-extension": "off",
      "linebreak-style": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "react/no-array-index-key": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "object-curly-newline": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/label-has-for": "off",
      "max-len": [
        "error",
        {
          code: 140,
        },
      ],
      "arrow-parens": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "prefer-object-spread": "off",
      "react/jsx-fragments": "off",
      "react/jsx-curly-newline": "off",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",
      "no-plusplus": [
        2,
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      "no-undef": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          jsx: "never",
          js: "never",
        },
      ],
      "import/no-unresolved": 0,
      semi: "error",
    },
  }];
