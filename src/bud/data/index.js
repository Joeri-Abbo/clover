/**
 * Make data
 *
 * @type   {func}
 * @prop   {object} data
 * @return {object}
 */
const makeData = ({config, data}) => {
  const setData = ({key, value}) => {
    data[`${key}`] = value
  }

  return {
    ...(config ? config.project : []),
    ...data,
    setData,
  }
}

export default makeData
