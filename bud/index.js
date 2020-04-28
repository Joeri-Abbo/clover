const {join, resolve} = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const Handlebars = require('handlebars')
const prettier = require('prettier')
const prettierConfig = require('./../prettierrc.json')

/**
 * Bud Core
 */
export const bud = {
  /**
   * Templating engine
   */
  engine: Handlebars,

  /**
   * Command runner
   */
  runner: execa,

  /**
   * Output
   */
  log: [],

  /**
   * Helpers
   */
  helpers: data => {
    return [
      {
        helper: 'array',
        fn: function() {
          return Array.prototype.slice.call(arguments, 0, -1);
        },
      },
      {
        helper: 'ifIn',
        fn: function(elem, list, options) {
          if (list.indexOf(elem) > -1) {
            return options.fn(this);
          }

          return options.inverse(this);
        },
      },
      {
        helper: 'has',
        fn: function(object, component, options) {
          if (data[object].indexOf(component) > -1) {
            return options.fn(this);
          }

          return options.inverse(this);
        },
      },
      {
        helper: 'hasAny',
        fn: function(object, components, options) {
          let uses = false;

          if (components) {
            components.forEach(component => {
              if (data[object].indexOf(component) > -1) {
                uses = true;
              }
            })
          } else {
            console.log('components not defined')
          }

          return uses ? options.fn(this) : options.inverse(this);
        },
      },
    ]
  },

  /**
   * Initialize
   *
   * @param {string} path
   */
  init: function ({outDir, data, budFile}) {
    this.data = data
    this.outDir = outDir
    this.budFile = require(budFile)

    this.helpers(this.data).forEach(({ helper, fn }) => {
      this.engine.registerHelper(helper, fn);
    })

    return this;
  },

  /**
   * Actions
   */
  actions: function () {
    this.budFile.actions.forEach(task => {
      this.log.push(this[task.action](task))
    })

    return this.log
  },

  /**
   * Action: template
   *
   * @param {string} path
   * @param {string} template
   */
  template: function({parser, path, template}) {
    const templateContents = fs.readFileSync(join(this.budFile.path, template), 'utf8')

    const raw = this.engine.compile(templateContents)(this.data)
    const output = {
      content: parser ? prettier.format(raw, { ...prettierConfig, parser }) : raw,
      path: resolve(process.cwd(), `${this.outDir}/${this.engine.compile(path)(this.data)}`),
    }

    fs.outputFileSync(output.path, output.content)
  },

  /**
   * Action: NPM
   *
   * @param {array} pkgs
   * @param {bool}  dev
   */
  npm: function({pkgs, dev}) {
    pkgs.forEach(pkg => {
      const command = dev
        ? `yarn add -D ${pkg}`
        : `yarn add ${pkg}`

      this.runner.commandSync(command, process.cwd())
    })
  },

  /**
   * Install
   *
   * @param {bool} npm
   * @param {bool} composer
   */
  install: function ({npm, composer}) {
    npm && this.runner.commandSync(`yarn`)
    composer && this.runner.commandSync(`composer install`)
  },
}
