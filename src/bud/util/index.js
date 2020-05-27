import command from './command'

/**
 * Make util
 *
 * @param  {object} config
 * @return {object}
 */
const makeUtil = config => ({
  command: command(config),
})

export default makeUtil
