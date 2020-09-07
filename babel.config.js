const plugins = []

const pathAliases = {
    components: './components',
    hocs: './hocs',
    modals: './components/modals',
    store: './store',
    screens: './screens',
    types: './types',
    assets: './assets',
    constants: './constants',
    ui: './components/ui',
    themes: './themes',
}

plugins.push('module-resolver')
plugins.push({
    alias: pathAliases,
})

if (process.env.NODE_ENV !== 'production') {
    /**
     * @repository https://github.com/milesj/babel-plugin-typescript-to-proptypes
     */
    plugins.push('babel-plugin-typescript-to-proptypes')
}

module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins,
    }
}
