const {resolve} = require('path')

/**
 * Template files
 */
const templates = resolve(__dirname, './templates')

/**
 * Bud generator
 * Block plugin base
 */
module.exports = {
  path: templates,
  default: {
    namespace: '{{BUD_NAMESPACE}}',
    name: '{{BUD_NAME}}',
    author: '{{BUD_AUTHOR_NAME}}',
    email: '{{BUD_AUTHOR_EMAIL}}',
    website: '{{BUD_WEBSITE}}',
    title: '{{BUD_TITLE}}',
    description: '{{BUD_DESCRIPTION}}',
  },
  prompts: [
    {
      type: 'input',
      name: 'namespace',
      message: 'Namespace',
      initial: 'acme-co',
      default: 'acme-co',
      required: true,
    },
    {
      type: 'input',
      name: 'name',
      message: 'Name',
      initial: 'acme-block',
      required: true,
    },
    {
      type: 'input',
      name: 'title',
      message: 'Title',
      initial: 'ACME Co. Block',
      required: true,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
      initial: 'Short description of acme-block',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name',
      initial: 'Wiley C.',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Author email',
      initial: 'wiley@gmail.com',
    },
    {
      type: 'input',
      name: 'website',
      message: 'Website',
      initial: 'https://acme.co',
    },
  ],
  actions: [
    {
      action: 'template',
      template: 'README.md.hbs',
      path: 'README.md',
      parser: 'markdown',
    },
    {
      action: 'template',
      template: 'block.php.hbs',
      path: 'block.php',
      parser: 'php',
    },
    {
      action: 'template',
      template: 'composer.json.hbs',
      path: 'composer.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: '.babelrc.js',
      path: '.babelrc.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: '.editorconfig',
      path: '.editorconfig',
    },
    {
      action: 'template',
      template: '.eslintrc.js',
      path: '.eslintrc.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: '.eslintignore',
      path: '.eslintignore',
    },
    {
      action: 'template',
      template: '.gitignore',
      path: '.gitignore',
    },
    {
      action: 'template',
      template: '.postcss.config.js',
      path: 'postcss.config.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: '.prettierrc.json',
      path: 'prettierrc.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: '.stylelintrc',
      path: '.stylelintrc',
    },
    {
      action: 'template',
      template: 'webpack.config.js.hbs',
      path: 'webpack.config.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'package.json.hbs',
      path: 'package.json',
      parser: 'json',
    },
    {
      action: 'dir',
      path: 'src',
    },
    {
      action: 'dir',
      path: 'src/blocks',
    },
    {
      action: 'dir',
      path: 'src/components',
    },
    {
      action: 'dir',
      path: 'src/extensions',
    },
    {
      action: 'npm',
      dev: true,
      pkgs: [
        '@babel/cli',
        '@babel/core',
        '@babel/preset-env',
        '@babel/preset-react',
        '@prettier/plugin-php',
        '@wordpress/browserslist-config',
        '@wordpress/dependency-extraction-webpack-plugin',
        'autoprefixer',
        'babel-eslint',
        'babel-loader',
        'css-loader',
        'eslint',
        'eslint-loader',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'file-loader',
        'friendly-errors-webpack-plugin',
        'npm-run-all',
        'postcss-import',
        'postcss-loader',
        'postcss-preset-env',
        'prettier',
        'prop-types',
        'react',
        'react-dom',
        'style-loader',
        'uglifyjs-webpack-plugin',
        'url-loader',
        'webpack',
        'webpack-cli',
        'webpack-dev-server',
        'webpackbar',
      ],
    },
  ],
}
