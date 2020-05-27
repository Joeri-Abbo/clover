/**
 * Make data
 *
 * @type   {func}
 * @param  {object} data
 * @return {object}
 */
const makeData = data => ({
  ...data,
  setData: function ({key, value}) {
    this[`${key}`] = value
  },
})

export default makeData
