import {join, dirname} from 'path'
import {useState, useEffect, useContext} from 'react'

/** application */
import {bud as BudEngine} from '../../bud'
import {store} from '../store'

/**
 * Runner
 *
 * @prop {bool}   ready
 * @prop {object} data
 * @prop {object} sprout
 * @prop {string} module
 */
const Runner = ({ready, data, sprout, module, outDir}) => {
  const {dispatch} = useContext(store)

  /**
   * When the store ready boolean is flipped
   * then initialize the BudEngine and return
   * the observable to be subscribed to.
   */
  const [subscription, setSubscription] = useState()
  useEffect(() => {
    ready && setSubscription(
      BudEngine.init({
        sprout,
        data,
        outDir: outDir ? outDir : null,
        templateDir: join(
          dirname(module),
          'templates',
        ),
      })
      .actions()
    )
  }, [ready])

  /**
   * Once there is something to subscribe to
   * subscribe to it and use what it emits as component
   * state.
   */
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState(null)
  useEffect(() => {
    subscription?.subscribe({
      next: next => setStatus(next),
      error: error => setError(error),
      complete: () => setComplete(true),
    })
  }, [subscription])

  /**
   * Handle status emittences.
   */
  useEffect(() => {
    status && dispatch({
      type: 'SET_STATUS',
      status,
    })
  }, [status])

  /**
   * Handle error emittences.
   */
  useEffect(() => {
    error && dispatch({
      type: 'SET_ERROR',
      error,
    })
  }, [error])

  /**
   * Handle the completion emittence.
   */
  useEffect(() => {
    complete && dispatch({
      type: 'SET_COMPLETE',
      complete,
    })
  }, [complete])

  return null
}

export default Runner