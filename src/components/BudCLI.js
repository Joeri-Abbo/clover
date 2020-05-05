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
 * @prop {object} commandValues
 * @prop {object} children
 */
const BudCLI = ({
  label,
  budFile = DEFAULT_BUDFILE,
  outDir,
  commandValues = null,
  children,
}) => {
  /**
   * Parse values from .bud/bud.config.json
   */
  const config = join(process.cwd(), '.bud/bud.config.json')
  const configData = existsSync(config) ? require(config) : null
  const [project] = useState({
    ...configData.project,
    ...configData.dev,
  })

  /**
   * Parse values from prompt
   */
  const [prompts, setPrompts] = useState(
    !commandValues && budFile.prompts ? budFile.prompts : null,
  )

  const [data, setData] = useState(null)
  const [message, setMessage] = useState(null)

  /**
   * Assemble data from config files, prompt & cli args/flags.
   */
  useEffect(() => {
    !commandValues && prompts
      ? prompt(prompts).then(data => {
          setPrompts(null)
          setData({
            ...project,
            ...data,
          })
        })
      : (() => {
          setPrompts(null)
          setData({
            ...project,
            ...commandValues,
          })
        })()
  }, [])

  /**
   * Run the budfile actions
   */
  useEffect(() => {
    data &&
      BudCore.init({
        data,
        budFile,
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
