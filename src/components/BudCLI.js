import {join} from 'path'
import {existsSync} from 'fs'
import React, {useState, useEffect} from 'react'
import propTypes from 'prop-types'
import {Box, useApp, useStdout} from 'ink'
import {prompt} from 'enquirer'
import {bud as BudCore} from './../bud'

/** Components */
import Banner from './components/Banner'
import Error from './components/Error'
import Tasks from './components/Tasks'

/**
 * Bud CLI
 *
 * @prop {string} label
 * @prop {string} budFile
 * @prop {string} outDir
 * @prop {object} values
 * @prop {object} children
 * @prop {bool}   noClear
 */
const BudCLI = ({
  label,
  templateDir,
  sprout,
  outDir,
  values,
  inert,
  children,
  noClear,
}) => {
  const {stdout} = useStdout()

  /**
   * Parse values from .bud/bud.config.json
   */
  const config = join(process.cwd(), '.bud/bud.config.json')
  const [configData] = useState(existsSync(config) ? require(config) : null)

  /**
   * Parse values from prompt
   */
  const [prompts, setPrompts] = useState(!values && sprout.prompts ? sprout.prompts : null)

  const {exit} = useApp()
  const [data, setData] = useState(null)
  useEffect(() => {
    data && !noClear && stdout.write('\x1B[2J\x1B[0f')
  }, [data])

  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [complete, setComplete] = useState(false)
  const [budSubscription, setBudSubscription] = useState(false)

  /**
   * Assemble data from config files, prompt & cli args/flags.
   */
  useEffect(() => {
    prompts
      ? prompt(prompts).then(data => {
          setPrompts(null)
          setData({
            ...(configData && configData.project ? configData.project : []),
            ...(configData && configData.dev ? configData.dev : []),
            ...data,
            ...(values ? values : []),
          })
        })
      : (() => {
          setPrompts(null)
          setData({
            ...(configData && configData.project ? configData.project : []),
            ...(configData && configData.dev ? configData.dev : []),
            ...(values ? values : []),
          })
        })()
  }, [])

  /**
   * Run the budfile actions
   */
  useEffect(() => {
    data &&
      !inert &&
      !budSubscription &&
      setBudSubscription(
        BudCore.init({
          data,
          templateDir,
          sprout,
          outDir,
        })
          .actions()
          .subscribe({
            next: next => setStatus(next),
            error: error => setError(error),
            complete: () => setComplete(true),
          }),
      )
  }, [data, status])

  /**
   * Exit if a completion or error is emitted.
   */
  useEffect(() => {
    (complete || error) &&
      (async () => {
        await budSubscription.unsubscribe()

        exit()
      })()
  }, [error, complete, budSubscription])

  /**
   * Render TTY
   */
  return (
    <Box
      flexDirection="column"
      justifyContent="flex-start"
      padding={1}>
      <Banner label={label} />

      {! error && <Tasks status={status} complete={complete} />}
      {error && <Error message={error} />}
      {children && children}
    </Box>
  )
}

/**
 * Sprout fallback
 */
const DEFAULT_SPROUT = {
  actions: [],
  label: 'Budfile',
  prompts: [],
}

BudCLI.propTypes = {
  label: propTypes.string,
  templateDir: propTypes.string,
  sprout: propTypes.shape({
    actions: propTypes.array,
    label: propTypes.string,
    prompts: propTypes.array,
  }).isRequired,
  outDir: propTypes.string,
  values: propTypes.object,
  inert: propTypes.bool,
  children: propTypes.object,
  noClear: propTypes.bool,
}

BudCLI.defaultProps = {
  label: '',
  sprout: DEFAULT_SPROUT,
  values: {},
  inert: false,
  noClear: false,
}

export default BudCLI
