import {useEffect, useState} from 'react'
import {useApp} from 'ink'
import clover from './../core'

interface Config {
  [key: string]: string | string[]
}

interface HookProps {
  config: Config
  data: any
  projectDir: string
  generator: any
  file: string
}

const useClover = ({
  config,
  data,
  projectDir,
  file,
  generator,
}: HookProps): {
  status: any
  error: string | null
  complete: boolean
} => {
  const {exit} = useApp()

  const [subscription, setSubscription] = useState(null)
  const [status, setStatus] = useState(null)
  const [error] = useState(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (generator && data && !subscription) {
      setSubscription(
        clover({config, file, data, generator, projectDir}).subscribe(
          {
            next: next => setStatus(next),
            complete: () => setComplete(true),
          },
        ),
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
