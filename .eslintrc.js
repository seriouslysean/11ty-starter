module.exports = {
    extends: 'airbnb-base',
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'tools/**',
                ],
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
        indent: ['error', 4],
    },
};
