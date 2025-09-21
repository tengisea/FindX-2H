import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores - must be at the top level
  {
    ignores: [
      // Dependencies
      "node_modules/",
      "node_modules/**",

      // Next.js build output
      ".next/",
      ".next/**",
      ".next/**/*",
      "**/.next/**",
      "**/.next/**/*",

      // Build outputs
      "out/",
      "out/**",
      "build/",
      "build/**",
      "dist/",
      "dist/**",

      // Generated files
      "**/generated/**",

      // Config files
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",

      // Environment files
      "next-env.d.ts",
      "**/next-env.d.ts",

      // Logs
      "**/*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",

      // Runtime data
      "pids",
      "**/*.pid",
      "**/*.seed",
      "**/*.pid.lock",

      // Coverage directory
      "coverage/",
      "coverage/**",

      // nyc test coverage
      ".nyc_output",
      ".nyc_output/**",

      // Dependency directories
      "jspm_packages/",
      "jspm_packages/**",

      // Optional npm cache directory
      ".npm",
      ".npm/**",

      // Optional REPL history
      ".node_repl_history",

      // Output of 'npm pack'
      "**/*.tgz",

      // Yarn Integrity file
      ".yarn-integrity",

      // dotenv environment variables file
      ".env",
      ".env.local",
      ".env.development.local",
      ".env.test.local",
      ".env.production.local",

      // parcel-bundler cache
      ".cache",
      ".cache/**",
      ".parcel-cache",
      ".parcel-cache/**",

      // nuxt.js build output
      ".nuxt",
      ".nuxt/**",

      // vuepress build output
      ".vuepress/dist",
      ".vuepress/dist/**",

      // Serverless directories
      ".serverless",
      ".serverless/**",

      // FuseBox cache
      ".fusebox/",
      ".fusebox/**",

      // DynamoDB Local files
      ".dynamodb/",
      ".dynamodb/**",

      // TernJS port file
      ".tern-port",
    ],
  },
  // Main configuration
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
  // Specific rules for Next.js generated files
  {
    files: ["next-env.d.ts", "**/next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];

export default eslintConfig;
