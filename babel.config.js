// babel.config.js
// Need in order for jest to support async
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                  node: 'current',
                },
            },
        ],
    ],
};
