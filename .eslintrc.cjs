const ERROR = 2
const WARN = 1

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/typescript',
    // this must be last
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    'import/extensions': [ERROR, 'always', { ignorePackages: true }],
    'import/no-unresolved': [2, { ignore: ['solid-start/*', '~/*/*'] }],
    'import/order': [
      WARN,
      {
        groups: [
          'builtin',
          ['external', 'internal'],
          'parent',
          ['sibling', 'index'],
        ],
      },
    ],
  },
  settings: {
    'import/ignore': ['node_modules', '.json$', '.(scss|less|css|styl)$'],
    'import/resolver': 'node',
  },
}
