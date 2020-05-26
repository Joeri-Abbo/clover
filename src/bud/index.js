import React from 'react'
import PropTypes from 'prop-types'
import {Box} from 'ink'
import Spinner from 'ink-spinner'

/** application */
import Runner from './containers/Runner'
import Prompt from './containers/Prompt'

/**
 * Bud Application
 *
 * This container represents the main Bud application.
 *
 * It does not handle the initial command invocation or
 * routing. Rather, the  moduleReady and module props are supplied
 * by a command component, which are housed in the commands dir.
 *
 * @see ink (react cli framework)
 * @see pastel (ink project framework)
 *
 * @todo all of these props are actually just destructured context.
 *       it's a pain to maintain all of these props and so they
 *       should really be derived directly from useContext.
 *
 *       but it's been helpful in development when trying to pinpoint
 *       issues to know if a fail is the result of botched props
 *       or shit state.
 */
const Bud = ({writeDir, sprout, budfile, data, ready}) => {
  /**
   * Render the main app flow.
   */
  return sprout ? (
    <Box flexDirection="column">
      <Prompt prompts={sprout.prompts} />
      <Runner ready={ready} budfile={budfile} writeDir={writeDir} sprout={sprout} data={data} />
    </Box>
  ) : (
    <Box>
      <Spinner /> Loading...
    </Box>
  )
}

Bud.propTypes = {
  writeDir: PropTypes.string,
}

Bud.defaultProps = {
  writeDir: null,
  ready: false,
}

export default Bud
