import type {HelperDelegate} from 'handlebars'

const helpers: (data: any) => [string, HelperDelegate][] = data => [
  [
    'array',
    function () {
      return Array.prototype.slice.call(data, 0, -1)
    },
  ],
  [
    'has',
    function (object, component, options) {
      if (data[object].indexOf(component) > -1) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
  ],
  [
    'hasAny',
    function (object, components, options) {
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
  ],
  [
    'raw',
    function (options) {
      return options.fn()
    },
  ],
]

export {helpers}
