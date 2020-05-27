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
  const config = join(cwd, '.bud/bud.config.json')
  const [configData] = useState(existsSync(config) ? require(config) : null)

  /**
   * Assemble data from various sources
   * - config file
   * - prompts (enquirer)
   */
  const [prompts, setPrompts] = useState(sprout.prompts ? sprout.prompts : null)
  const [data, setData] = useState(null)
  useEffect(() => {
    if (prompts) {
      prompt(prompts).then(data => {
        setPrompts(null)
        const projectConfig =
          configData && configData.project ? configData.project : []
        const devConfig = configData && configData.dev ? configData.dev : []

        setData({...projectConfig, ...devConfig, ...data})
      })
    } else {
      setPrompts(null)
      const projectConfig =
        configData && configData.project ? configData.project : []
      const devConfig = configData && configData.dev ? configData.dev : []

      setData({...projectConfig, ...devConfig})
    }
  }, [])

  /**
   * Observer subscribe
   */
  const [budSubscription, setBudSubscription] = useState(false)
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    data &&
      !budSubscription &&
      setBudSubscription(
        bud({
          configData,
          data: data ?? {},
          templateDir,
          sprout,
          projectDir: join(cwd, outDir),
        }).subscribe({
          next: next => setStatus(next),
          error: error => setError(error),
          complete: () => setComplete(true),
        }),
      )
  }, [data, status])

  /**
   * Observer unsubscribe.
   */
  const {exit} = useApp()
  useEffect(() => {
    complete &&
      (async () => {
        await budSubscription.unsubscribe()
        exit()
      })()
  }, [complete, budSubscription])

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
