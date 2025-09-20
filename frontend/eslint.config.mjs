import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Convert all errors to warnings
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-var-requires": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "warn",
      "react/prop-types": "warn",
      "no-unused-vars": "warn",
      "no-console": "warn",
      "no-debugger": "warn",
      "no-alert": "warn",
      "no-var": "warn",
      "prefer-const": "warn",
      "no-undef": "warn",
      "no-unreachable": "warn",
      "no-duplicate-case": "warn",
      "no-empty": "warn",
      "no-extra-semi": "warn",
      "no-func-assign": "warn",
      "no-invalid-regexp": "warn",
      "no-irregular-whitespace": "warn",
      "no-obj-calls": "warn",
      "no-sparse-arrays": "warn",
      "no-unexpected-multiline": "warn",
      "use-isnan": "warn",
      "valid-typeof": "warn",
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
