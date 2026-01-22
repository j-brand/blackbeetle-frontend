import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    // Vue-specific rules
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",

    // TypeScript rules
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],

    // General rules
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
});
