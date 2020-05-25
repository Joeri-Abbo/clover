/**
 * Handlebars helpers
 */
const helpers = data => [
  {
    helper: 'array',
    fn: function () {
      return Array.prototype.slice.call(arguments, 0, -1)
    },
  },
  {
    helper: 'has',
    fn: function (object, component, options) {
      if (data[object].indexOf(component) > -1) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
  },
  {
    helper: 'hasAny',
    fn: function (object, components, options) {
      let hasInstance = false

      if (components) {
        components.forEach(component => {
          if (data[object].indexOf(component) > -1) {
            hasInstance = true
          }
        })
      }

      return hasInstance ? options.fn(this) : options.inverse(this)
    },
  },
  {
    helper: 'raw',
    fn: function (options) {
      return options.fn()
    },
  },
]

export default helpers
