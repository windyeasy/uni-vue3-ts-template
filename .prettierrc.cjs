// @see https://prettier.io/docs/en/options
module.exports = {
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  trailingComma: 'all',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.json',
      options: {
        trailingComma: 'none',
      },
    },
  ],
}
