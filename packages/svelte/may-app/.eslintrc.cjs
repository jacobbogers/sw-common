module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
        'typescript-eslint/explicit-module-boundary-types': 0 /*["error", {
			allowArgumentsExplicitlyTypedAsAny: true,
			allowDirectConstAssertionInArrowFunctions: true,
			allowedNames: [],
			allowHigherOrderFunctions: true,
			allowTypedFunctionExpressions: true,
		  }]*/
    },

};
