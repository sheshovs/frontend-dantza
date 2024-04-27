{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended", // React rules
    "plugin:react-hooks/recommended", // React hooks rules
    "plugin:prettier/recommended" //Prettier plugin,
  ],
  "rules": {
    //General rules
    "object-curly-newline": "off",
    "semi": [
      "error",
      "never"
    ],
    "max-len": [
      "error",
      100,
      2,
      {
        "ignoreUrls": true,
        "ignoreRegExpLiterals": true,
        "ignoreTemplateLiterals": true
      }
    ],
    "no-console": "warn",
    "radix": 1,
    "prefer-destructuring": "off",
    "no-useless-concat": "error",
    "no-negated-condition": 0,
    "quotes": [
      "error",
      "backtick"
    ],
    "no-multi-spaces": 2,
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1
      }
    ],
    "no-irregular-whitespace": 2,
    "camelcase": [
      2,
      {
        "properties": "always"
      }
    ],
    "no-trailing-spaces": [
      2,
      {
        "skipBlankLines": true
      }
    ],
    "prettier/prettier": [
      "warn"
    ],
    "no-unused-vars": [
      "error",
      {
        "ignoreRestSiblings": true,
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_"
      }
    ],
    "no-debugger": "error",
    "no-nested-ternary": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/prop-types": "off"
  },
  "overrides": [
    {
      "files": [
        "**/*.ts",
        "**/*.tsx",
        "**/*.test.js"
      ],
      "parser": "@typescript-eslint/parser",
      "extends": [
        "plugin:@typescript-eslint/recommended" // TypeScript rules
      ],
      "plugins": [
        "@typescript-eslint"
      ],
      "rules": {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": [
          "error"
        ],
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            "allowExpressions": true,
            "allowConciseArrowFunctionExpressionsStartingWithVoid": true
          }
        ]
      }
    }
  ]
}