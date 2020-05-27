import {join} from 'path'
import {existsSync} from 'fs'
import React, {useState, useEffect} from 'react'
import {Box, useApp} from 'ink'
import PropTypes from 'prop-types'
import {prompt} from 'enquirer'
import bud from '../bud'

import Banner from './Banner'
import Tasks from './Tasks'
import Error from './Error'

const cwd = process.cwd()

/**
 * App
 *
 * @prop {string} label
 * @prop {string} templateDir
 * @prop {object} sprout
 * @prop {string} outDir
 * @prop {object} values
 * @prop {object} children
 * @prop {bool}   noClear
 */
const App = ({label, templateDir, sprout, outDir, noClear}) => {
  /**
   * source bud.config.json
   */
  const configFile = join(cwd, '.bud/bud.config.json')
  const [config] = useState(existsSync(configFile) ? require(configFile) : null)

  /**
   * Assemble data from prompts
   */
  const [data, setData] = useState(null)
  const [prompts, setPrompts] = useState(sprout.prompts ? sprout.prompts : null)
  useEffect(() => {
    if (prompts) {
      prompt(prompts).then(data => {
        setPrompts(null)
        setData(data)
      })
    } else {
      setPrompts(null)
      setData({})
    }
  }, [])

  /**
   * Observer subscribe
   */
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState(false)
  const [subscription, setSubscription] = useState(false)
  useEffect(() => {
    data &&
      !subscription &&
      setSubscription(
        bud({
          sprout,
          data,
          config,
          templateDir,
          projectDir: join(cwd, outDir),
        }).subscribe({
          next: next => setStatus(next),
          error: error => setError(error),
          complete: () => setComplete(true),
        }),
      )
  }, [config, data, status])

  /**
   * Observer unsubscribe.
   */
  const {exit} = useApp()
  useEffect(() => {
    const unsubscribe = async () => {
      await subscription.unsubscribe()
      exit()
    }

    complete && unsubscribe()
  }, [complete, subscription])

  /**
   * Render observable updates and errors
   */
  return (
    <Box flexDirection="column" justifyContent="flex-start" padding={1}>
      <Banner label={label} />
      <Tasks
        data={data}
        status={status}
        complete={complete}
        noClear={noClear}
      />
      {error && <Error message={error} />}
    </Box>
  )
}

App.propTypes = {
  label: PropTypes.string,
  sprout: PropTypes.object,
  noClear: PropTypes.bool,
}

App.defaultProps = {
  sprout: {
    actions: [],
    label: 'Bud',
    prompts: [],
  },
  noClear: false,
}

export default App
