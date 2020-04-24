import { cwd } from 'process'
import { resolve, join } from 'path'
import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Static, Text } from 'ink'
import { prompt } from 'enquirer'
import Bud from './../bud/Bud'

const DEFAULT_TEMPLATE = resolve(__dirname, './../../templates/plugin.js')

/**
 * Plugin New
 */
/// Create a new block plugin
const BudPluginNew = props => {
  const [data, setData] = useState(null)

  const output = props.inputArgs[2] ? join(cwd(), props.inputArgs[2]) : join(cwd(), props.output)

  const definition = props.definition
    ? require(join(cwd(), props.definition))
    : require(DEFAULT_TEMPLATE)

  useMemo(() => {
    !props.default
      ? prompt(definition.fields).then(data => setData(data))
      : setData(definition.default)
  }, [])

  return (
    <Box>
      {!data ? (
        <Box minHeight={2}>
          <Text>Create new Block plugin</Text>
        </Box>
      ) : (
        <Static>
          <Box marginBottom={1}>
            <Text>Creating {data.name}</Text>
          </Box>

          <Bud data={data} definition={definition} output={output} />
        </Static>
      )}
    </Box>
  )
}

BudPluginNew.propTypes = {
  /// Output directory
  output: PropTypes.string,
  /// Path to bud template definition
  definition: PropTypes.string,
  /// Skip prompts; use defaults
  default: PropTypes.bool,
}

BudPluginNew.shortFlags = {
  output: 'o',
  definition: 'd',
}

BudPluginNew.defaultProps = {
  output: './bud-plugin',
  default: false,
}

export default BudPluginNew
