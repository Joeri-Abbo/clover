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
   * @param {object} sprout
   * @param {string} templateDir
   * @param {bool}   skipInstall
   */
  init: function ({outDir = './', data = {}, sprout, templateDir}) {
    this.outDir = outDir
    this.cwd = this.outDir
    this.runnerOptions = {cwd: this.cwd}
    ;(this.templateDir = `${templateDir}/templates`), (this.sprout = sprout)
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
      bud.sprout.actions.push({action: 'complete'})
      from(bud.sprout.actions)
        .pipe(concatMap(task => bud[task.action](task)))
        .subscribe(response => {
          observer.next(response)
        })
    })
  },

  /**
   * Make directories
   *
   * @param {array} paths
   * @return {Observable}
   */
  dirs: function ({paths}) {
    return new Observable(observer => {
      from(paths)
        .pipe(concatMap(path => this.dir({path})))
        .subscribe({
          next: next => observer.next(next),
          complete: () => observer.complete(),
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
      const src = join(this.templateDir, template)
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
   * packageFile
   */
  merge: function ({file, merge}) {
    return new Observable(observer => {
      const output = merge(require(`${this.outDir}/${file}`))
      fs.outputFile(`${this.outDir}/${file}`, prettier.format(
        JSON.stringify(output),
        {...basePrettierConfig, parser: 'json'}
      )).then(function () {
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
    const budConfig = JSON.parse(
      fs.readFileSync(`${this.outDir}/.bud/bud.config.json`),
      'utf8',
    )
    if (!budConfig.installed.includes(this.sprout.name)) {
      budConfig.installed.push(this.sprout.name)
      const output = prettier.format(JSON.stringify(budConfig), {
        ...basePrettierConfig,
        parser: 'json',
      })

      fs.writeFileSync(`${this.outDir}/.bud/bud.config.json`, output, 'utf8')
    }
    return new Observable(observer => {
      observer.next(`✨ All done`)
      observer.complete()
    })
  },
}
