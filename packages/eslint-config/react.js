const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/react'),
    'eslint-config-turbo'
  ],
  plugins: ['tailwindcss'],
  globals: {
    React: true,
    JSX: true
  },
  env: {
    browser: true,
    node: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/'
  ],
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)']
    }
  ],
  rules: {
    'react/jsx-sort-props': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/no-contradicting-classname': 'error'
  }
}
