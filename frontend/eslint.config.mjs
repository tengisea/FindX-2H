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
      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "warn", // Keep as warning for gradual improvement
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-inferrable-types": "warn",

      // React specific rules
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "off",

      // Next.js specific rules
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "error",

      // General code quality rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "warn",
      "prefer-const": "warn",
      "no-var": "error",

      // Code style rules (simplified to avoid conflicts)
      quotes: ["warn", "double", { avoidEscape: true }],
      semi: ["warn", "always"],
      "comma-dangle": ["warn", "always-multiline"],
      "object-curly-spacing": ["warn", "always"],
      "array-bracket-spacing": ["warn", "never"],
      
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      ".next/**/*",
      "**/.next/**",
      "**/.next/**/*",
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
      "**/generated/**", // Exclude generated files
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",
    ],
  },
  // Separate config for generated files
  {
    files: ["**/generated/**/*.ts", "**/generated/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "off",
    },
  },
  // Completely ignore .next directory files
  {
    ignores: [".next/**", ".next/**/*", "**/.next/**", "**/.next/**/*"],
  },
];

export default eslintConfig;
