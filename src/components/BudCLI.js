import React, {useState, useEffect} from 'react'
import {Box, Static, Color, Text} from 'ink'
import useStdoutDimensions from 'ink-use-stdout-dimensions'
import Divider from 'ink-divider'
import Link from 'ink-link'
import {prompt} from 'enquirer'
import {bud as BudCore} from './../bud'

/**
 * Bud CLI
 *
 * @prop {array} children
 * @prop {bool}  final
 */
const BudCLI = ({title = '', budFile, outDir}) => {
  const [prompts, setPrompts] = useState(null)
  const [data, setData] = useState(null)
  const [message, setMessage] = useState(null)
  const [appDimensions, setAppDimensions] = useState({})
  const [stdOutColumns, stdOutRows] = useStdoutDimensions()

  useEffect(() => {
    const offset = 2
    setAppDimensions({
      width: stdOutColumns - offset,
      height: stdOutRows,
    })
  }, [stdOutColumns, stdOutRows])

  useEffect(() => {
    const {prompts: budFilePrompts} = require(budFile)
    budFilePrompts && setPrompts(budFilePrompts)
  }, [budFile])

  useEffect(() => {
    ;(async () => {
      if (!prompts || !setPrompts) return

      prompt(prompts).then(answers => {
        setPrompts(null)
        setData(answers)
      })
    })()
  })

  useEffect(() => {
    ;(async () => {
      if (!data) return

      await BudCore.init({data, budFile, outDir})
        .actions()
        .subscribe({
          next: message => setMessage(message),
          complete: message => setMessage(message),
        })
    })()
  }, [data])

  return (
    <>
      <ViewMast title={title} appDimensions={appDimensions} />
      <Box flexDirection="column" justifyContent="flex-start">
        {message && (
          <Box marginTop={1} marginBottom={1}>
            <Text>{message}</Text>
          </Box>
        )}
      </Box>
    </>
  )
}

/**
 * Application Mast
 */
const ViewMast = ({title, appDimensions}) => (
  <Static width={appDimensions.width}>
    <Box flexDirection="column">
      <Box
        width={50}
        marginTop={1}
        flexDirection="row"
        justifyContent="space-between">
        {title && (
          <Box>
            <Text>{title}</Text>
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
