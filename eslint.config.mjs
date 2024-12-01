// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  ...[eslint.configs.recommended, ...tseslint.configs.recommended].map((conf) => ({
    ...conf,
    files: ['**/*.ts'],
  })),
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-wrapper-object-types': 'warn',
    },
  },
];
