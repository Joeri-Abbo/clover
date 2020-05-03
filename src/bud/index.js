const {join} = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const {Observable, from} = require('rxjs')
const {concatMap} = require('rxjs/operators')
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
  init: function ({outDir = './', data = {}, budFile, skipInstall = false}) {
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
   * Get data.
   *
   * @return {object}
   */
  getData: function () {
    return this.data
  },

  /**
   * Set data.
   *
   * @param  {object} data
   * @return {void}
   */
  setData: function (data) {
    this.data = data
  },

  /**
   * Register helpers
   */
  registerHelpers: function () {
    helpers(this.getData()).forEach(({helper, fn}) => {
      this.engine.registerHelper(helper, fn)
    })
  },

  /**
   * Actions
   */
  actions: function () {
    const bud = {...this}
    return new Observable(observer => {
      observer.next('Templating..')
      from(bud.budFile.actions)
        .pipe(concatMap(task => bud[task.action](task)))
        .subscribe(response => {
          observer.next(response)
        })
    })
  },

  /**
   * Make directory
   *
   * @param {string} path
   */
  dir: function ({path}) {
    return new Observable(observer => {
      const dirPath = join(this.cwd, this.engine.compile(path)(this.getData()))

      fs.ensureDir(dirPath).then(() => {
        observer.complete()
      })
    })
  },

  /**
   * Action: template
   *
   * @param {string} parser
   * @param {string} path
   * @param {string} template
   */
  template: function ({parser, path, template}) {
    return new Observable(async observer => {
      const src = join(this.budFile.path, template)
      const dest = join(this.cwd, this.engine.compile(path)(this.getData()))
      const prettierConfig = {...basePrettierConfig, parser}

      const contents = fs.readFileSync(src, 'utf8')
      const compiled = this.engine.compile(contents)(this.getData())
      const outputContents = parser
        ? prettier.format(compiled, prettierConfig)
        : compiled

      await fs.outputFile(dest, outputContents).then(function () {
        observer.complete()
      })
    })
  },

  /**
   * Action: NPM
   *
   * @param {array} pkgs
   * @param {bool}  dev
   */
  npm: function ({pkgs, dev}) {
    return new Observable(observer => {
      if (this.skipInstall) {
        return
      }

      observer.next('Installing node modules...')
      const toInstall = pkgs.join(' ')
      this.runner
        .command(
          dev ? `yarn add -D ${toInstall}` : `yarn add ${toInstall}`,
          this.runnerOptions,
        )
        .then(() => {
          observer.next('Node modules installed.')
          observer.complete()
        })
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
    return new Observable(observer => {
      npm &&
        this.runner.command(`yarn`, this.runnerOptions).then(() => {
          observer.next(observer)
          observer.complete()
        })

      composer &&
        this.runner.command(`composer install`, this.runnerOptions).then(() => {
          observer.next(observer)
          observer.complete()
        })

      build &&
        this.runner.command(`yarn build`, this.runnerOptions).then(() => {
          observer.next(observer)
          observer.complete()
        })
    })
  },
}
