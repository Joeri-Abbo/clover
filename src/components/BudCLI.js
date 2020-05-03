import React, {useEffect, useState} from 'react'
import {Box, Color, Text, useApp, useInput, useStdout} from 'ink'
import useStdoutDimensions from 'ink-use-stdout-dimensions'
import Divider from 'ink-divider'
import Link from 'ink-link'

/**
 * Bud CLI
 *
 * @prop {array} children
 * @prop {bool}  final
 */
const BudCLI = ({children, complete = false, fullHeight = false}) => {
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
      padding={globalPadding}
      width={appDimensions.width}
      minHeight={fullHeight ? appDimensions.height : 1}>
      <ViewMast />
      <ViewMain width={appDimensions.width} content={children} />
      {complete && (
        <ViewFooter width={appDimensions.width} complete={complete} />
      )}
    </Box>
  )
}

/**
 * Application Mast
 */
const ViewMast = () => (
  <Box flexDirection="row" marginTop={1}>
    <Box>{`🌱`}</Box>
    <Box marginLeft={1}>
      <Text bold>
        <Link url="https://roots.io/bud">
          <Color green>Bud</Color> Modern WordPress scaffolding
        </Link>
      </Text>
    </Box>
  </Box>
)

export {ViewMast}

/**
 * View Main
 */
const ViewMain = ({content, width}) => (
  <>
    <ViewDivider width={width} />
    <Box>{content}</Box>
    <ViewDivider width={width} />
  </>
)

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

/**
 * Application footer
 *
 * @prop {number} width
 * @prop {bool}   complete
 */
const ViewFooter = ({width, complete}) => {
  const {exit} = useApp()

  useInput((input, key) => {
    if ((key.ctrl && input == 'c') || key.escape) {
      exit()
    }

    if (complete) {
      key.return && exit()
    }
  })

  return (
    <Box
      flexDirection={width > 50 ? 'row' : 'column'}
      marginTop={1}
      justifyContent="space-between">
      <Box>
        <Text>
          <Color red>esc</Color> or <Color red>ctrl+c</Color> to exit
        </Text>
      </Box>

      {complete && (
        <Box>
          <Text>
            <Color green>return</Color> to continue
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default BudCLI
