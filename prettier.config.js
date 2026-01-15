/**
 * Shared Prettier configuration for Angular projects
 * @dittmar/shared-angular-configs
 */

module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'angular',
        printWidth: 200,
        htmlWhitespaceSensitivity: 'ignore',
        singleAttributePerLine: true,
      },
    },
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '*.ts',
      options: {
        printWidth: 80,
        singleQuote: true,
        trailingComma: 'all',
      },
    },
  ],
};
