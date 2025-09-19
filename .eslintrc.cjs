module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
  plugins: ['import'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'jsx-a11y/no-autofocus': 'off',
  },
};
