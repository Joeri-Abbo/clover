import {join} from 'path'
import {existsSync} from 'fs'
import React, {useState, useEffect} from 'react'
import {Box, Static, Color, Text, useApp} from 'ink'
import Divider from 'ink-divider'
import Link from 'ink-link'
import {prompt} from 'enquirer'
import {bud as BudCore} from './../bud'

const DEFAULT_BUDFILE = {
  actions: [],
  label: 'Budfile',
  prompts: [],
}

/**
 * Bud CLI
 *
 * @prop {string} label
 * @prop {string} budFile
 * @prop {string} outDir
 * @prop {object} values
 * @prop {object} children
 */
const BudCLI = ({
  label,
  templateDir,
  sprout = DEFAULT_BUDFILE,
  outDir,
  values = null,
  inert = false,
  children,
}) => {
  /**
   * Parse values from .bud/bud.config.json
   */
  const config = join(process.cwd(), '.bud/bud.config.json')
  const [configData] = useState(existsSync(config) ? require(config) : null)

  /**
   * Parse values from prompt
   */
  const [prompts, setPrompts] = useState(
    !values && sprout.prompts ? sprout.prompts : null,
  )

  const {exit} = useApp()
  const [data, setData] = useState(null)
  const [message, setMessage] = useState(null)
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
    data && !inert && !budSubscription &&
    setBudSubscription(
      BudCore.init({
        data,
        templateDir,
        sprout,
        outDir,
      })
      .actions()
      .subscribe({
        next: message => setMessage(message),
        error: error => setError(error),
        complete: () => setComplete(true),
      })
    )
  }, [data])

  useEffect(() => {
    complete && (async () => {
      await budSubscription.unsubscribe()
      exit()
    })()
  }, [complete, budSubscription])

  /**
   * Render TTY
   */
  return (
    <Box flexDirection="column" justifyContent="flex-start">
      <Static>
        <ViewMast label={label} />
      </Static>
      {error && (
        <Box marginTop={1} marginBottom={1}>
          <Text>{error.message}</Text>
          <Text>{error.details}</Text>
        </Box>
      )}
      {children && children}
      {message && (
        <Box marginTop={1} marginBottom={1}>
          <Text>{message}</Text>
        </Box>
      )}
    </Box>
  )
}

/**
 * Application Mast
 *
 * @prop {string} label
 */
const ViewMast = ({label}) => (
  <Box flexDirection="column">
    <Box
      width={50}
      marginTop={1}
      flexDirection="row"
      justifyContent="space-between">
      {label && (
        <Box>
          <Text>{label}</Text>
        </Box>
      )}
      <Box flexDirection="row">
        <Box>
          <Text>{`🌱`}</Text>
        </Box>

        <Box marginLeft={1}>
          <Text bold>
            <Link url="https://roots.io/bud">
              <Color green>{'Bud'}</Color>
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
    <Divider padding={0} />
  </Box>
)

export default BudCLI
