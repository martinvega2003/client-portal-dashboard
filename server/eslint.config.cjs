// server/eslint.config.cjs
/**
 * Flat ESLint config (v9+) for TypeScript projects.
 * Uses actual parser/plugin modules (not require.resolve paths).
 */

module.exports = [
  // global ignores (replaces .eslintignore)
  {
    ignores: ["node_modules", "dist", ".env"]
  },

  // Rules and settings for TS/TSX files
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      // here we require the parser module (an object), not resolve a path string
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
        // omit "project" to avoid type-aware rules complexity
      }
    },
    plugins: {
      // plugin must be the module object
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-module-boundary-types": "off"
    },
    settings: {}
  }
];
