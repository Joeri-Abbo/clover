import {useState, useEffect, useContext} from 'react'
import {useStdout} from 'ink'
import {prompt} from 'enquirer'

/** application */
import {store} from './../store'

/**
 * Prompts
 */
const Prompts = () => {
  /** @see ink docs */
  const {stdout} = useStdout()
  const {state, dispatch} = useContext(store)

  /**
   * State tracking prompts listed in the
   * generator file.
   */
  const [prompts, setPrompts] = useState(null)
  useEffect(() => {
    const prompts = state?.prompts
    setPrompts(prompts ? prompts : null)
  }, [state])

  /**
   * If there are prompts to run then do so
   * and dispatch the results to the global store.
   */
  useEffect(() => {
    prompts?.length > 0
      && prompt(prompts).then(data => {
        /**
         * Since enquirer is not
         * ink-specific it causes duplication of the
         * application components in stdout.
         *
         * This clears the console to mask that issue.
         *
         * @todo rewrite enquirer prompts with ink-specific
         * componentry.
         */
        stdout.write('\x1B[2J\x1B[0f')

        /**
         * Dispatch resultant data to the global store,
         * to be merged with whatever is already there.
         */
        dispatch({
          type: 'SET_DATA',
          data,
        })

        /**
         * Finally, tell the application that the prompts
         * are finished and we're ready to build the
         * requested component.
         */
        dispatch({
          type: 'SET_READY',
          ready: true,
        })
      })
  }, [prompts])

  return null
}

export default Prompts
