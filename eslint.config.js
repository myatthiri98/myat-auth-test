// https://docs.expo.dev/guides/using-eslint/
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin')
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const prettierConfig = require('eslint-config-prettier')
const noSwitchStatementsPlugin = require('eslint-plugin-no-switch-statements')
const prettierPlugin = require('eslint-plugin-prettier')
const reactNativePlugin = require('eslint-plugin-react-native')
const vitestPlugin = require('eslint-plugin-vitest')
const globals = require('globals')
const noSwitchStatementsRecommendedConfig =
  noSwitchStatementsPlugin.configs?.recommended ?? {}

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  noSwitchStatementsRecommendedConfig,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      prettier: prettierPlugin,
      'no-switch-statements': noSwitchStatementsPlugin,
      'react-native': reactNativePlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'object-shorthand': ['error', 'always'],
      'lines-between-class-members': ['error', 'always'],
      'max-statements-per-line': ['error', { max: 1 }],
      'no-console': 'error',
      'no-else-return': 'warn',
      'no-nested-ternary': 'error',
      'no-switch-statements/no-switch': 'error',
      'prefer-const': 'error',
      'prettier/prettier': 'error',
      complexity: ['warn', { max: 10 }],
      curly: ['error', 'multi-or-nest'],
      eqeqeq: ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'block-like', next: 'block-like' },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/prefer-optional-chain': 'error',
    },
  },
  {
    files: ['scripts/**/*.{js,cjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      vitest: vitestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
    rules: {
      'vitest/no-commented-out-tests': 'error',
      'vitest/no-conditional-expect': 'error',
      'vitest/no-conditional-in-test': 'error',
      'vitest/no-disabled-tests': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-identical-title': 'error',
      'vitest/prefer-each': 'error',
      'vitest/prefer-hooks-in-order': 'error',
      'vitest/prefer-hooks-on-top': 'error',
    },
  },
])
