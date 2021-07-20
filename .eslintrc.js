module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'flowtype',
        'import',
        'jsx-a11y',
        'react',
        'react-hooks',
        'prettier',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:flowtype/recommended',
        'plugin:import/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'airbnb',
        'airbnb/hooks',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    rules: {
        'no-console': 1,
        'react-hooks/exhaustive-deps': 1,
        'react/prop-types': 0,
        'prettier/prettier': 2,
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
};
