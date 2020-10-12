module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/eslint-recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				vars: "all",
				args: "after-used",
				varsIgnorePattern: "^_",
				argsIgnorePattern: "^_",
			},
		],
	},
};
