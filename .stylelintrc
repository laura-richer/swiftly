{
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-html",
    "stylelint-config-idiomatic-order",
    "stylelint-prettier/recommended",
    "stylelint-selector-bem-pattern",
  ],
  plugins: [
    "stylelint-order",
    "stylelint-prettier",
  ],
  customSyntax: 'postcss-scss',
  rules: {
    "no-descending-specificity": null,
    "selector-pseudo-element-colon-notation": "single",
    indentation: 2,
    "order/order": ["custom-properties", "declarations"],
    "unit-allowed-list": [
      ["px", "fr", "rem", "em", "%", "s", "deg", "vh", "vw"],
      { severity: "warning" },
    ],
    "prettier/prettier": [true, { severity: "warning" }],
    "selector-class-pattern": ["^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$", { severity: "warning"}],
    "at-rule-no-unknown": null,
    "scss/at-import-no-partial-leading-underscore": null,
    'scss/dollar-variable-empty-line-before': null,
    "function-url-quotes": "never"
  }
}
