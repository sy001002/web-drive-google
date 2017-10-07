module.exports = {
	"rules": {
		"strict": [
			0,
			"global"
		],
		"indent": [
			1,
			"tab"
		],
		"quotes": [
			2,
			"single"
		],
		"linebreak-style": [
			2,
			"unix"
		],
		"semi": [
			2,
			"never"
		],
		"comma-dangle": [
			0,
			"always-multiline"
		],
		"no-console": 0,
		"no-var": [
			2
		],
		"no-empty": [
			1,
			{
				"allowEmptyCatch": true,
			}
		],
		"no-unused-vars": 1,
		"no-constant-condition": 0,
	},
	"env": {
		"es6": true,
		"node": true
	},
	"extends": ["eslint:recommended"],
	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module",
		"ecmaFeatures": {
			"impliedStrict": true,
			"experimentalObjectRestSpread": true
		},
	}
};
