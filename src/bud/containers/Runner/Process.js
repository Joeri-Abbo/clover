/**
 * Handlebars
 */
import handlebars from 'handlebars'
import handlebarsHelpers from 'handlebars-helpers'
import helpers from './helpers'

/**
 * Process Handlebars template
 *
 * @param {string} string
 * @param {object} sprout
 */
const Process = async ({observer, string, sprout, data}) => {
  handlebarsHelpers({handlebars})
  helpers(data).forEach(({helper, fn}) => {
    handlebars.registerHelper(helper, fn)
  })

  sprout?.registerHelpers?.forEach(({helper, fn}) => {
    handlebars.registerHelper(helper, fn)
  })

  observer.next({status: `Compiling template`})
  return await handlebars.compile(string)(data)
}

export default Process
