module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['react-refresh', 'import'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json', 'figma-primitives/tsconfig.json', 'website/tsconfig.json'],
      },
    },
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'import/exports-last': 'off',
      },
    },
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],

    // Import plugin rules
    //
    // https://github.com/import-js/eslint-plugin-import
    // https://typescript-eslint.io/docs/linting/troubleshooting#eslint-plugin-import

    //'import/no-cycle': 'error', // Extremely useful, yet extremely slow to keep enabled. Worth occasionally enabling locally for finding & removing circular imports.
    'import/no-default-export': 'error',
    'import/no-unresolved': 'error',
    'import/no-self-import': 'error',
    'import/no-relative-packages': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/exports-last': 'error',

    'import/order': [
      'error',
      {
        groups: ['external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],

    // TypeScript overrides
    '@typescript-eslint/consistent-type-imports': 'error', // Avoid type-only imports being incorrectly bundled: https://vitejs.dev/guide/features.html#typescript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: 'props|context|event' }],
  },
};
