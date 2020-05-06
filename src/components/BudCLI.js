import {join} from 'path'
import {existsSync} from 'fs'
import React, {useState, useEffect} from 'react'
import {Box, Static, Color, Text} from 'ink'
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

  const [data, setData] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  /**
   * Eject early if bud dependencies have been declared
   * but are not met.
   */
  useEffect(() => {
    if (!sprout.dependsOn || configData.installed) {
      return
    }

    sprout.dependsOn &&
      sprout.dependsOn.forEach(dep => {
        configData.installed &&
          !configData.installed.includes(dep) &&
          setError({
            message: `Dependency not met.`,
            details: `Run \`bud generate ${dep}\` in your project then re-run this command.`,
          })
      })
  }, [sprout, configData])

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
      BudCore.init({
        data,
        templateDir,
        sprout,
        outDir,
      })
        .actions()
        .subscribe({
          next: message => setMessage(message),
          complete: message => setMessage(message),
        })
  }, [data])

  /**
   * Render TTY
   */
  return (
    <Box flexDirection="column" justifyContent="flex-start">
      <ViewMast label={label} />
      {error && (
        <Box marginTop={1} marginBottom={1}>
          <Text>{error.message}</Text>
          <Text>{error.details}</Text>
        </Box>
      )}
      {message && (
        <Box marginTop={1} marginBottom={1}>
          <Text>{message}</Text>
        </Box>
      )}
      {children && children}
    </Box>
  )
}

/**
 * Application Mast
 *
 * @prop {string} label
 */
const ViewMast = ({label}) => (
  <Static>
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
  </Static>
)

export default BudCLI
