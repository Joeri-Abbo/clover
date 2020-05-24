import React, {useState, useEffect, useContext} from 'react'
import {Box} from 'ink'

/** application */
import {store} from './store'
import Prompts from './containers/Prompts'
import Runner from './containers/Runner'
import Status from './components/Status'
import Error from './components/Error'
const budConfig = require(`${process.cwd()}/.bud/bud.config.json`)

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
   * Load the "sprout" from the module file
   * if the search has concluded.
   */
  const [sprout, setSprout] = useState(null)
  useEffect(() => {
    moduleReady
      && module
      && setSprout(require(module))
  }, [moduleReady, module])

  /**
   * If the sprout has a description
   * then update the application banner.
   */
  useEffect(() => {
    sprout?.description && dispatch({
      type: 'SET_LABEL',
      label: sprout.description,
    })
  }, [sprout])

  /**
   * Load the config's project key into the store
   * so that generators can use it as a fallback.
   */
  useEffect(() => {
    budConfig && dispatch({
      type: 'SET_DATA',
      data: budConfig.project,
    })
  }, [budConfig])

  /**
   * If the generator has prompts then update the
   * store with those prompts.
   */
  useEffect(() => {
    sprout && (() => {
      sprout.prompts
      && sprout.prompts.length > 0
        ? dispatch({
          type: 'SET_PROMPTS',
          prompts: sprout.prompts,
        })
        : dispatch({
          type: 'SET_READY',
          ready: true,
        })
    })()
  }, [sprout])

  /**
   * Render the main app flow.
   */
  return (
    <Box flexDirection="column">
      <Error message={state?.error} />

      <Status
        status={state?.status}
        complete={state?.complete}
      />

      <Prompts />

      <Runner
        ready={state?.ready}
        data={state?.data}
        module={module}
        sprout={sprout}
        outDir={outDir}
      />
    </Box>
  )
}

Bud.defaultProps = {
  outDir: null,
  ready: false,
}

export default Bud
