module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    extraFileExtensions: [ '.vue' ],
    createDefaultProgram: true,
  },
  plugins: [
    '@typescript-eslint',
    'deprecation',
  ],
  extends: [
    'google',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // '@vue/standard',
    // '@vue/typescript/recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:import/errors',
    // 'plugin:import/typescript',
    // 'plugin:import/warnings',
  ],
  rules: {
    /* BASIC RULES */

    // Always have spaces around arrays and objects
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],

    // Always have newline character at the end of the file
    'eol-last': [ 'error', 'always' ],

    // Constraints for the max line length
    // 'max-len': [ 'error', { 'code': 120, 'comments': 80 } ],
    'max-len': [ 'off' ],

    // No more than 2 blank lines
    'no-multiple-empty-lines': [ 'error', { 'max': 2, 'maxBOF': 0, 'maxEOF': 1 } ],

    // Srings: either '...' or `... ${...} ...`, and no 'ab' + 'cd'
    'no-template-curly-in-string': [ 'error' ],
    'quotes': [ 'error', 'single', { 'allowTemplateLiterals': false } ],
    'no-useless-concat': [ 'error' ],

    // One variable per declaration, no "const x, y, ..."
    'one-var': [ 'error', 'never' ],

    // No semicolons
    'semi': [ 'error', 'never' ],

    // Require a "use strict" at the top of JS files
    'strict': [ 'error', 'global' ],

    // Allow TypeScript triple-slash comments
    'spaced-comment': [ 'error', 'always', { 'markers': [ '/ <reference' ] } ],

    // No redeclare / unused vars for TypeScript
    '@typescript-eslint/no-redeclare': [ 'error' ], // TODO - re-enable this!!!
    '@typescript-eslint/no-unused-vars': [ 'error' ],
    '@typescript-eslint/no-dupe-class-members': [ 'error' ],
    '@typescript-eslint/no-invalid-this': [ 'error' ],
    '@typescript-eslint/no-floating-promises': [ 'error' ],

    // Works only with "@typescript-eslint/parser"!!!
    'deprecation/deprecation': [ 'warn' ],

    /* OFF RULES */
    '@typescript-eslint/camelcase': [ 'off' ], // do not require camelCase variables (TS)
    'camelcase': [ 'off' ], // do not require camelCase variables
    'guard-for-in': [ 'off' ], // allow unchecked for-in loops
    'no-undef': [ 'off' ], // it'll mark global types as undefs
    'require-jsdoc': [ 'off' ], // nope!
    'valid-jsdoc': [ 'off' ], // nope as well!

    'no-redeclare': [ 'off' ], // use @typescript/no-redeclare
    'no-unused-vars': [ 'off' ], // use @typescript/no-unused-vars
    'no-dupe-class-members': [ 'off' ], // use @typescript/no-dupe-class-members
    'no-invalid-this': [ 'off' ], // use @typescript/no-invalid-this
    'vue/prop-name-casing': [ 'off' ], // do not require camelCase variables
    'vue/no-v-html': [ 'off' ], // allow v-html
  },
  overrides: [ {
    files: [ '*.js' ],
    rules: {
      // Redeclare rules for JavaScript, removing the Typescript specific ones
      'no-redeclare': [ 'error' ],
      'no-unused-vars': [ 'error' ],
      'no-dupe-class-members': [ 'error' ],
      'no-invalid-this': [ 'error' ],

      '@typescript-eslint/no-redeclare': [ 'off' ],
      '@typescript-eslint/no-unused-vars': [ 'off' ],
      '@typescript-eslint/no-dupe-class-members': [ 'off' ],
      '@typescript-eslint/no-invalid-this': [ 'off' ],
      '@typescript-eslint/no-floating-promises': [ 'off' ],
    },
  }, {
    files: [ '*.vue' ],
    rules: {
      // Either 3 attributes on a single line, or all attributes on newlines!
      'vue/max-attributes-per-line': [ 'warn', { 'singleline': 3 } ],
      // NativeScript-VUE does not like hypenated attributes (e.g. colSpan)
      'vue/attribute-hyphenation': [ 'error', 'never' ],
      // Indent body of "<script ... />" like we normally should
      'vue/script-indent': [ 'error', 2, { 'baseIndent': 1, 'switchCase': 1 } ],

      /* OFF RULES */
      'indent': [ 'off' ], // use vue/script-indent instead

      // override/add rules settings here, such as:
      'vue/no-unused-vars': 'error',
    },
  } ],
}
