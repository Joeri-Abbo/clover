import handlebars from 'handlebars'
import makeHelpers from './helpers'
import handlebarsHelpers from 'handlebars-helpers'

/**
 * Compiler.
 *
 * @param {handlebars} handlebars
 */
const makeCompiler = ({generator, data}) => {
  handlebarsHelpers({handlebars})

  const helpers = makeHelpers(data)

  generator.registerHelpers &&
    generator.registerHelpers.forEach(helper => {
      helpers.push(helper)
    })

  helpers.forEach(({helper, fn}) => {
    handlebars.registerHelper(helper, fn)
  })

  return {
    compiler: handlebars,

    /**
     * Make template.
     *
     * @param {string} path
     */
    make: function (path) {
      return this.compiler.compile(path)
    },
  }
}

export default makeCompiler
