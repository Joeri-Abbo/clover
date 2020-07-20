import execa from 'execa'

/**
 * Task runner
 *
 * @param  {object} config
 * @return {Function}
 */
const command = config => {
  return cmd => execa.command(cmd, config.execa)
}

export {command}
