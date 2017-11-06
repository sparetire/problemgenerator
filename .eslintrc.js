module.exports = {
	parser: 'esprima',
	env: {
		node: true,
		es6: true
	},
	extends: 'eslint:recommended',
	globals: {
		console: false
	},
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'indent': ['warn', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'semi': ['error', 'always'],
		'semi-spacing': ['error', {before: false, after: true}],
		'quotes': ['warn', 'single'],
		'init-declarations': ['warn', 'always'],
		'no-unused-vars': ['error', {vars: 'local', args: 'none'}],
		'camelcase': ['error', {properties: 'always'}],
		'brace-style': ['warn', '1tbs', {allowSingleLine: true}],
		'comma-dangle': ['warn', 'never'],
		'comma-style': ['warn', 'last'],
		'comma-spacing': ['error', {before: false, after: true}],
		'require-await': 'off',
		'require-yield': 'off',
		'radix': 'warn',
		'no-extra-boolean-cast': 'off'
	}
};