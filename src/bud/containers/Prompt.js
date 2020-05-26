import {useEffect, useContext} from 'react'
import {prompt} from 'enquirer'

/** application */
import {store} from '../store'

/**
 * Prompts
 */
const Prompt = ({prompts}) => {
  const {state, dispatch} = useContext(store)

  /**
   * If there are prompts to run then do so
   * and dispatch the results to the global store.
   */
  useEffect(() => {
    if (prompts && !state.ready) {
      dispatch({
        type: 'SET',
        key: 'status',
        value: 'questions',
      })
      prompt(prompts).then(data => {
          /**
           * Dispatch resultant data to the global store,
           * to be merged with whatever is already there.
           */
          dispatch({
            type: 'SET_DATA',
            data,
          })

          dispatch({
            type: 'SET',
            key: 'ready',
            value: true,
          })
        })
    }
  }, [prompts])

  return null
}

export default Prompt
