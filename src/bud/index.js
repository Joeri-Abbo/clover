const {join} = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const Handlebars = require('handlebars')
const prettier = require('prettier')
const basePrettierConfig = require('./../../prettier.config.js')
const helpers = require('./helpers')

/**
 * Bud Core
 */
export const bud = {
  /** Templating Engine */
  engine: Handlebars,

  /** Command runner */
  runner: execa,

  /**
   * Initialize
   *
   * @param {string} outDir
   * @param {object} data
   * @param {string} budFile
   * @param {bool}   skipInstall
   */
  init: function ({outDir = './', data, budFile, skipInstall = false}) {
    this.outDir = outDir
    this.cwd = join(process.cwd(), this.outDir)
    this.runnerOptions = {cwd: this.cwd}

    this.budFile = require(budFile)
    this.skipInstall = skipInstall
    this.data = data

    this.registerHelpers()

    return this
  },

  /**
   * Register helpers
   */
  registerHelpers: function () {
    helpers(this.data).forEach(({helper, fn}) => {
      this.engine.registerHelper(helper, fn)
    })
  },

  /**
   * Actions
   */
  actions: function () {
    this.budFile.actions.forEach(task => {
      this[task.action](task)
    })
  },

  /**
   * Make directory
   *
   * @param {string} path
   */
  dir: function ({path}) {
    const dirPath = join(this.cwd, this.engine.compile(path)(this.data))

    fs.ensureDirSync(dirPath)
  },

  /**
   * Action: template
   *
   * @param {string} parser
   * @param {string} path
   * @param {string} template
   */
  template: function ({parser, path, template}) {
    const src = join(this.budFile.path, template)
    const dest = join(this.cwd, this.engine.compile(path)(this.data))
    const prettierConfig = {...basePrettierConfig, parser}

    const contents = fs.readFileSync(src, 'utf8')
    const compiled = this.engine.compile(contents)(this.data)
    const outputContents = parser
      ? prettier.format(compiled, prettierConfig)
      : compiled

    fs.outputFileSync(dest, outputContents)
  },

  /**
   * Action: NPM
   *
   * @param {array} pkgs
   * @param {bool}  dev
   */
  npm: function ({pkgs, dev}) {
    if (this.skipInstall) {
      return
    }

    pkgs.forEach(pkg => {
      const command = dev ? `yarn add -D ${pkg}` : `yarn add ${pkg}`

      this.runner.commandSync(command, this.runnerOptions)
    })
  },

  /**
   * Install
   *
   * @param {bool} npm
   * @param {bool} composer
   * @param {bool} build
   */
  install: async function ({npm, composer, build}) {
    npm && this.runner.commandSync(`yarn`, this.runnerOptions)
    composer && this.runner.commandSync(`composer install`, this.runnerOptions)
    build && this.runner.commandSync(`yarn build`, this.runnerOptions)
  },
}
