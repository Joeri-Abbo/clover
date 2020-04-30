/**
 * Handlebars helpers
 */
module.exports = data => {
  return [
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
        let uses = false

        if (components) {
          components.forEach(component => {
            if (data[object].indexOf(component) > -1) {
              uses = true
            }
          })
        }

        return uses ? options.fn(this) : options.inverse(this)
      },
    },
  ]
}
