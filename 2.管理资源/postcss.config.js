module.exports = {
    parse: 'sugarss',
    plugins: {
        'postcss-preset-env': {},
        'cssnano': {},
        'autoprefixer': {
            flex: true,
            overrideBrowserslist: [
                ">0.1%",
                "not dead",
                "not op_mini all"]
        }
    }
};
