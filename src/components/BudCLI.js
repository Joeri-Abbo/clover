import React, {useEffect, useState} from 'react'
import {Box, Static, Color, Text, useStdout} from 'ink'
import useStdoutDimensions from 'ink-use-stdout-dimensions'
import Divider from 'ink-divider'
import Link from 'ink-link'

/**
 * Bud CLI
 *
 * @prop {array} children
 * @prop {bool}  final
 */
const BudCLI = ({title = ''}) => {
  const [appDimensions, setAppDimensions] = useState({})
  const [globalPadding] = useState(1)
  const [stdOutColumns, stdOutRows] = useStdoutDimensions()

  useEffect(() => {
    const offset = globalPadding * 2
    setAppDimensions({
      width: stdOutColumns - offset,
      height: stdOutRows,
    })
  }, [stdOutColumns, stdOutRows])

  useStdout(stdout => {
    stdout.clearLine()
  }, [])

  return (
    <Box
      flexDirection="column"
      justifyContent="flex-start"
      paddingTop={globalPadding}
      paddingBottom={0}
      paddingLeft={globalPadding}
      paddingRight={globalPadding}
      width={appDimensions.width}>
      <ViewMast title={title} width={appDimensions.width} />
    </Box>
  )
}

/**
 * Application Mast
 */
const ViewMast = ({width, title}) => (
  <Static flexDirection="column" marginTop={1}>
    <Box flexDirection="row">
      <Box>{`🌱`}</Box>
      <Box marginLeft={1}>
        <Text bold>
          <Link url="https://roots.io/bud">
            <Color green>Bud</Color>
          </Link>
        </Text>
      </Box>
    </Box>
    <Box marginTop={1}>{title}</Box>
    <ViewDivider width={width} />
  </Static>
)

export {ViewMast}

/**
 * Application Divider
 *
 * @prop {number} width
 */
const ViewDivider = ({width}) => (
  <Box width={width} marginTop={1} marginBottom={1}>
    <Divider padding={0} width={width} />
  </Box>
)

export default BudCLI
