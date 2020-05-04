const {join} = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const {Observable, from} = require('rxjs')
const {concatMap} = require('rxjs/operators')
const Handlebars = require('handlebars')
const prettier = require('prettier')
const basePrettierConfig = require('./../../prettier.config.js')
const handlebarsHelpers = require('handlebars-helpers')
const helpers = require('./helpers')

const DEFAULT_BUDFILE = {actions: [], label: 'Budfile', prompts: []}

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
  init: function ({outDir = './', data = {}, budFile = DEFAULT_BUDFILE}) {
    this.outDir = outDir
    this.cwd = join(process.cwd(), this.outDir)
    this.runnerOptions = {cwd: this.cwd}

    this.budFile = budFile
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
    handlebarsHelpers({
      handlebars: this.engine,
    })

    helpers(this.getData()).forEach(({helper, fn}) => {
      this.engine.registerHelper(helper, fn)
    })
  },

  /**
   * Actions
   *
   * @return {Observable}
   */
  actions: function () {
    const bud = {...this}
    return new Observable(observer => {
      observer.next('Templating..')
      bud.budFile.actions.push({action: 'complete'})
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
   * @param  {string} path
   * @return {Observable}
   */
  dir: function ({path}) {
    return new Observable(observer => {
      const pathTemplate = this.engine.compile(path)
      const dirPath = join(this.cwd, pathTemplate(this.getData()))

      fs.ensureDir(dirPath).then(() => {
        observer.complete()
      })
    })
  },

  /**
   * Action: template
   *
   * @param  {string} parser
   * @param  {string} path
   * @param  {string} template
   * @return {Observable}
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
   * @param  {array} pkgs
   * @param  {bool}  dev
   * @return {Observable}
   */
  npm: function ({pkgs, dev}) {
    return new Observable(observer => {
      if (this.skipInstall) {
        return
      }

      observer.next('Installing node modules...')

      this.runner
        .command(
          dev ? `yarn add -D ${pkgs.join(' ')}` : `yarn add ${pkgs.join(' ')}`,
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
   * @param  {bool} npm
   * @param  {bool} composer
   * @param  {bool} build
   * @return {Observable}
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

  /**
   * Tasks complete emitter
   *
   * @return {Observable}
   */
  complete: function () {
    return new Observable(observer => {
      observer.next(`✨ All done`)
      observer.complete()
    })
  },
}