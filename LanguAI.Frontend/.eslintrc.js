import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      indent: ['error', 2],
      '@stylistic/js/indent': ['error', 2]
      // ...
    },

    files: ['*.html'],
    extends: ['plugin:@angular-eslint/template/recommended'],
    rules: {
      '@stylistic/object-curly-spacing': ['error', 'always']
    },
    files: ['*.html'],
    excludedFiles: ['*inline-template-*.component.html'],
    extends: ['plugin:prettier/recommended'],
    rules: {
      'prettier/prettier': ['error', { parser: 'angular' }]
    },
    files: ['*.scss, *.css, *.json'],
    extends: ['plugin:prettier/recommended'],
    rules: {
      'prettier/prettier': ['error', { parser: 'angular' }]
    }
  }
];
