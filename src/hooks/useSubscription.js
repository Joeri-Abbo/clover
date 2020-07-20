import {useEffect, useState} from 'react'
import {useApp} from 'ink'
import clover from './../clover'

/**
 * useClover.
 *
 * Once there is a generator and data available it is passed to the clover
 * engine to be run. Clover will return an rxjs observable to be utilized
 * by components like Tasks to indicate to the user what is going on
 * with the scaffold process.
 *
 * @type   {function}
 * @param  {object} options
 * @param  {object.config} options.config
 * @return {object}
 */
const useClover = ({config, data, projectDir, generator}) => {
  const {exit} = useApp()

  const [subscription, setSubscription] = useState(false)
  const [status, setStatus] = useState(null)
  const [error] = useState(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (generator && data && !subscription) {
      setSubscription(
        clover({config, data, generator, projectDir}).subscribe({
          next: next => setStatus(next),
          complete: () => setComplete(true),
        }),
      )
    }
  }, [data])

  useEffect(() => {
    complete &&
      (() => {
        subscription.unsubscribe()
        exit()
      })()
  }, [complete])

  return {status, error, complete}
}

export default useClover
