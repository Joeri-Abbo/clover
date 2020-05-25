import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Box} from 'ink'
import Spinner from 'ink-spinner'

/** application */
import {store} from './store'
import Runner from './containers/Runner'
import Prompts from './containers/Prompts'

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
 * @prop {bool}   moduleReady
 * @prop {string} module
 * @prop {string} writeDir
 */
const Bud = ({moduleReady, module, writeDir}) => {
  const {state, dispatch} = useContext(store)

  /**
   * If the command specifies an output dir
   * stash it to the store.
   */
  useEffect(() => {
    writeDir &&
      dispatch({
        type: 'SET',
        key: 'writeDir',
        value: `${process.cwd()}/${writeDir}`,
      })
  }, [writeDir])

  /**
   * Load the "sprout" from the module file
   * if the search has concluded.
   */
  const [sprout, setSprout] = useState(null)
  useEffect(() => {
    moduleReady && module && setSprout(require(module))
  }, [moduleReady, module])

  /**
   * If the sprout has a description
   * then update the application banner.
   */
  useEffect(() => {
    sprout?.description &&
      dispatch({
        type: 'SET_LABEL',
        label: sprout.description,
      })
  }, [sprout])

  /**
   * If the generator has prompts then update the
   * store with those prompts.
   */
  useEffect(() => {
    state?.writeDir && sprout?.prompts
      ? dispatch({
          type: 'SET_PROMPTS',
          prompts: sprout.prompts,
        })
      : dispatch({
          type: 'SET_READY',
          ready: true,
        })
  }, [sprout])

  /**
   * Render the main app flow.
   */
  return state ? (
    <Box flexDirection="column">
      <Prompts />
      <Runner
        module={module}
        writeDir={state.writeDir}
        sprout={sprout}
        data={state.data}
      />
    </Box>
  ) : <Box flexDirection="row"><Spinner />{'  Loading'}</Box>
}

Bud.propTypes = {
  writeDir: PropTypes.string,
  moduleReady: PropTypes.bool,
}

Bud.defaultProps = {
  writeDir: null,
  module: null,
  moduleReady: false,
}

export default Bud
