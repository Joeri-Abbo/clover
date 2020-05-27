import execa from 'execa'

/**
 * Task runner
 *
 * @param  {object} config
 *
 * @return {func}
 */
const command = config => {
  return cmd => execa.command(cmd, config.execa)
}

export default command
