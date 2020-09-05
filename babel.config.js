module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        components: './components',
                        hocs: './hocs',
                        modals: './modals',
                        store: './store',
                        screens: './screens',
                        types: './types',
                        assets: './assets',
                    },
                },
            ],
        ],
    }
}
