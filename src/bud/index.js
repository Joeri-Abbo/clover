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
  /**
   * Templating
   */
  engine: Handlebars,

  /**
   * CLI runner
   */
  runner: execa,

  /**
   * Format
   *
   * @param  {object|string} content
   * @param  {parser} string
   * @return {string}
   */
  format: function (content, parser) {
    return prettier.format(JSON.stringify(content), {
      ...basePrettierConfig,
      parser: parser || 'babel',
    })
  },

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
    this.sprout = sprout
    this.data = data
    this.projectDir = outDir
    this.runnerOptions = {cwd: this.projectDir}
    this.templateDir = `${templateDir}/templates`

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
    handlebarsHelpers({handlebars: this.engine})

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

    return new Observable(function (observer) {
      bud.sprout.actions.push({action: 'finalize'})

      from(bud.sprout.actions)
        .pipe(
          concatMap(function (task) {
            return new Observable(async function (observer) {
              return bud[task.action](task, observer)
            })
          }),
        )
        .subscribe(response => {
          observer.next(response)
        })
    })
  },

  /**
   * Finalize
   *
   * @return {Observable}
   */
  finalize: async function (task, observer) {
    const budConfigRaw = await fs.readFile(
      `${this.projectDir}/.bud/bud.config.json`,
    )
    const budConfig = JSON.parse(budConfigRaw, 'utf8')

    await fs.writeFile(
      `${this.projectDir}/.bud/bud.config.json`,
      this.format(
        {
          ...JSON.parse(budConfigRaw, 'utf8'),
          installed: [
            ...(!budConfig.installed.includes(this.sprout.name)
              ? [...budConfig.installed, this.sprout.name]
              : budConfig.installed),
          ],
        },
        'json',
      ),
      'utf8',
    )

    observer.next(`✨ All done`)
    observer.complete()
  },

  /**
   * Scaffold directories
   *
   * @param  {array} paths
   * @return {Observable}
   */
  scaffold: function ({paths}, observer) {
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
    const pathTemplate = this.engine.compile(path)
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
      this.engine.compile(path)(this.getData()),
    )
    const prettierConfig = {...basePrettierConfig, parser}

    const contents = fs.readFileSync(src, 'utf8')
    const compiled = this.engine.compile(contents)(this.getData())
    const outputContents = parser
      ? prettier.format(compiled, prettierConfig)
      : compiled

    await fs.outputFile(dest, outputContents).then(() => observer.complete())
  },

  /**
   * Action: Modules
   *
   * @param  {array} pkgs
   * @param  {bool}  dev
   * @return {Observable}
   */
  addDependencies: async function ({repo, pkgs, dev}, observer) {
    switch (repo) {
      case 'npm':
        await this.yarn({action: 'add', pkgs, dev}, observer)
        break
      case 'composer':
        await this.composer({action: 'require', pkgs, dev}, observer)
        break
    }
  },

  /**
   * Work with yarn
   */
  yarn: async function ({action, pkgs, dev}, observer) {
    observer.next('Installing node modules...')

    this.runner
      .command(
        `yarn ${action} ${dev ? `-D` : ``} ${pkgs.join(' ')}`,
        this.runnerOptions,
      )
      .then(() => {
        observer.next('Node modules installed.')
        observer.complete()
      })
  },

  composer: async function (task, observer) {
    console.log(task)
    observer.next('composer not quite implemented.')
    observer.complete()
  },

  /**
   * manipulate json obj
   */
  json: async function ({file, merge}, observer) {
    await fs.outputFile(
      `${this.projectDir}/${file}`,
      this.format(merge(require(`${this.projectDir}/${file}`)), 'json'),
    )

    observer.complete()
  },
}
