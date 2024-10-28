module.exports = {
  root: true,
  extends: ['custom/node'],
  ignorePatterns: ['jest.config.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],
  },
};
