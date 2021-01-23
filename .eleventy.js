const htmlMinifier = require('html-minifier');

const isProduction = process.env.ELEVENTY_ENV === 'production';

async function minifyHtml(content, outputPath) {
    if (!outputPath.endsWith('.html')) {
        return content;
    }

    return htmlMinifier.minify(
        content,
        {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
        },
    );
}

module.exports = function configureEleventy(eleventyConfig) {
    // Watch the CSS folder for changes when SASS is compiled
    // .gitignore usage needs to be disabled to add the dist folder
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addWatchTarget('./src/_scss/');

    if (isProduction) {
        eleventyConfig.addTransform('minify-html', minifyHtml);
    }

    eleventyConfig.addPassthroughCopy('./src/img');
    eleventyConfig.addPassthroughCopy({ './src/.css': 'css' });

    return {
        dir: {
            input: './src',
            layouts: '_layouts',
            output: './dist',
        },
    };
};
