const {join} = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const {Observable, from} = require('rxjs')
const {concatMap} = require('rxjs/operators')
const Handlebars = require('handlebars')
const prettier = require('prettier')
const fetch = require('node-fetch')
const basePrettierConfig = require('./../../prettier.config.js')
const handlebarsHelpers = require('handlebars-helpers')
const helpers = require('./helpers')

/**
 * Bud Core
 */
export const bud = {
  fs,
  fetch,
  runner: execa,
  templater: Handlebars,
  formatter: prettier,

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
    this.data = data
    this.sprout = sprout
    this.projectDir = outDir
    this.runnerOptions = {cwd: this.projectDir}
    this.templateDir = templateDir

    this.registerActions()
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
   * Register actions
   */
  registerActions: function () {
    this.sprout.registerActions
      && this.sprout.registerActions.forEach(action => {
        this[`${action.handle}`] = action.callback
      })
  },

  /**
   * Register helpers
   */
  registerHelpers: function () {
    // lib helpers
    handlebarsHelpers({handlebars: this.templater})

    // plugin registered helpers
    this.sprout.registerHelpers &&
      this.sprout.registerHelpers.length > 0 &&
      this.sprout.registerHelpers.forEach(helper => {
        helpers.push(helper)
      })

    // roots/bud helpers
    helpers(this.getData()).forEach(({helper, fn}) => {
      this.templater.registerHelper(helper, fn)
    })
  },

  /**
   * Format
   *
   * @param  {object|string} content
   * @param  {parser} string
   * @return {string}
   */
  format: function (content, parser) {
    return prettier.format(
      typeof content !== 'string' ? JSON.stringify(content) : content,
      {
        ...basePrettierConfig,
        parser: parser || 'babel',
      },
    )
  },

  /**
   * Actions
   *
   * @return {Observable}
   */
  actions: function () {
    const bud = {...this}

    return new Observable(function (observer) {
      from(bud.sprout.actions)
        .pipe(
          concatMap(function (task) {
            return new Observable(async function (observer) {
              return bud[task.action](task, observer, bud)
            })
          }),
        )
        .subscribe({
          next: next => observer.next(next),
          error: error => observer.error(error),
          complete: complete => observer.complete(complete),
        })
    })
  },

  /**
   * Scaffold directories
   *
   * @param  {array} paths
   * @return {Observable}
   */
  scaffold: function ({paths}, observer) {
    observer.next(`Creating directories`)

    from(paths)
      .pipe(
        concatMap(path => {
          return new Observable(async observer => {
            await this.mkDir({path}, observer)
          })
        }),
      )
      .subscribe({
        next: next => observer.next(next),
        complete: () => observer.complete(),
      })
  },

  /**
   * Make directory
   *
   * @param  {string}     path
   * @param  {Observable} observer
   * @return {Observable}
   */
  mkDir: async function ({path}, observer) {
    const pathTemplate = this.templater.compile(path)
    const dirPath = join(this.projectDir, pathTemplate(this.getData()))

    await fs.ensureDir(dirPath).then(() => {
      observer.complete()
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
  template: async function ({parser, path, template}, observer) {
    const src = join(this.templateDir, template)
    const dest = join(
      this.projectDir,
      this.templater.compile(path)(this.getData()),
    )

    observer.next(`Writing ${dest.split('/')[dest.split('/').length - 1]}`)

    const contents = await fs.readFile(src, 'utf8')
    const compiled = this.templater.compile(contents)(this.getData())
    const outputContents = parser ? this.format(compiled, parser) : compiled

    fs.outputFile(dest, outputContents).then(() => observer.complete())
  },

  /**
   * Action: Modules
   *
   * @param  {array} pkgs
   * @param  {bool}  dev
   * @return {Observable}
   */
  addDependencies: async function ({pkgs, dev}, observer) {
    observer.next(`Installing packages...`)

    const installation = this.runner.command(
      `yarn add ${dev ? `-D` : ``} ${pkgs.join(' ')}`,
      this.runnerOptions,
    )

    installation.stdout.on('data', status => {
      observer.next(status)
    })

    installation.then(() => observer.complete())
  },

  /**
   * Expose project JSON
   */
  json: async function ({file, merge}, observer) {
    const json = require(`${this.projectDir}/${file}`)
    observer.next(`Writing JSON to ${file}`)

    try {
      const output = merge(json)

      await fs.outputFile(
        `${this.projectDir}/${file}`,
        this.format(output, 'json'),
      )

      observer.complete()
    } catch (err) {
      observer.error(`There was a problem writing to ${file}`)
    }
  },
}
