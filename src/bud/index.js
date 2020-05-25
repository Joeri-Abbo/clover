import React, {useState, useEffect, useContext} from 'react'
import {Box} from 'ink'

/** application */
import {store} from './store'
import Runner from './containers/Runner'
import Prompts from './containers/Prompts'
import Error from './components/Error'

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
 * @prop {string} outDirectory
 */
const Bud = ({moduleReady, module, outDir}) => {
  const {state, dispatch} = useContext(store)

  /**
   * If the command specifies an output dir
   * stash it to the store.
   */
  useEffect(() => {
    outDir
      && dispatch({
        type: 'SET',
        key: 'writeDir',
        value: `${process.cwd()}/${outDir}`,
      })
  }, [outDir])

  /**
   * Load the "sprout" from the module file
   * if the search has concluded.
   */
  const [sprout, setSprout] = useState(null)
  useEffect(() => {
    moduleReady && module &&
      setSprout(require(module))
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
    sprout?.prompts
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
  return (
    <Box flexDirection="column">
      <Error message={state?.error} />

      <Prompts />

      <Runner
        sprout={sprout}
        data={state.data}
        module={module}
      />
    </Box>
  )
}

Bud.defaultProps = {
  outDir: null,
  moduleReady: false,
}

export default Bud
