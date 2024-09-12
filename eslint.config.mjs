import kitql from "@kitql/eslint-config";

/** @type { import("eslint").Linter.Config } */
export default [
  ...kitql,
  {
    name: "APP:ignores",
    ignores: [
      "**/build/",
      "**/.svelte-kit/",
      "**/dist/",
      "**/$kitql/",
      "**/$houdini/",
    ],
  },
  {
    name: "APP:rules",
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      // 'no-unused-vars': 'off',
      // '@typescript-eslint/no-unused-vars': 'off',
      // 'unused-imports/no-unused-imports': 'error',
      // 'unused-imports/no-unused-vars': [
      // 	'warn',
      // 	{
      // 		vars: 'all',
      // 		varsIgnorePattern: '^_',
      // 		args: 'after-used',
      // 		argsIgnorePattern: '^_',
      // 	},
      // ],

      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
];
