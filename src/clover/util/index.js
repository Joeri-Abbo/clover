import {command} from './command'

/**
 * Make util
 *
 * @prop   {object} config
 * @return {object}
 */
const makeUtil = ({config}) => ({
  command: command(config),
})

export {makeUtil}
