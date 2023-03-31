module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    rules: {
        'jsx-a11y/no-static-element-interactions': 0,
        'react/require-default-props': 0,
        'import/prefer-default-export': 0,
        'no-restricted-syntax': 0,
        'react/jsx-props-no-spreading': 0,
        'max-len': ['error', { code: 120 }],
        'no-nested-ternary': 0,
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-void': 0, // void is used to disable floating promises
        '@typescript-eslint/unbound-method': 0,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],

        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/default-param-last': 'warn',

        'import/no-extraneous-dependencies': [
            'off',
            {
                'devDependencies': false,
                'optionalDependencies': false,
                'peerDependencies': false
            },
        ],
        'import/extensions': [
            'off',
            'ignorePackages',
            {
                'js': 'never',
                'jsx': 'never',
                'ts': 'never',
                'tsx': 'never',
            }
        ],
        'react/jsx-filename-extension': 'off',

    },
    globals: {
        window: true,
        fetch: true,
        document: true,
    },
    settings: {
        'import/resolver': {
            'node': {
                'extensions': [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx'
                ]
            }
        },
    },

};
