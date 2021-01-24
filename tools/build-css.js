/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('postcss');
const sass = require('sass');

const ROOT_DIR = path.dirname(__filename);
const SCSS_FILE = path.join(ROOT_DIR, '..', 'src', '_scss', 'styles.scss');
const CSS_FILE = path.join(ROOT_DIR, '..', 'dist', 'css', 'styles.css');

function createDirectory(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return;
    }

    createDirectory(dirname);
    fs.mkdirSync(dirname);
}

async function applyPostCss(css) {
    try {
        const adaptedCss = await postcss([
            autoprefixer({
                add: true,
            }),
            cssnano({
                preset: 'default',
            }),
        ]).process(css, {
            from: CSS_FILE,
        });
        fs.writeFileSync(CSS_FILE, adaptedCss);
    } catch (error) {
        console.error('Unable to compile PostCSS', error);
    }
}

function compileSassFromCss() {
    try {
        const result = sass.renderSync({
            file: SCSS_FILE,
        });
        createDirectory(CSS_FILE);
        fs.writeFileSync(CSS_FILE, result.css);
        applyPostCss(result.css);
    } catch (error) {
        throw new Error('Unable to compile SCSS', error);
    }
}

function buildCss() {
    try {
        compileSassFromCss();
        console.log('CSS compiled successfully');
    } catch (error) {
        console.error('buildCss:', error);
    }
}

buildCss();
