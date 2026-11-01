const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  globalIgnores([
    '.expo/**',
    'dist/**',
    'web-build/**',
    'coverage/**',
    'android/**',
    'ios/**',
    'expo-env.d.ts',
  ]),
  expoConfig,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
    },
  },
  // Keep this last so ESLint never overrides Prettier formatting.
  prettierConfig,
]);
