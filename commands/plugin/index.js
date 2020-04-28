import { cwd } from 'process'
import { resolve, join } from 'path'
import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'ink'
import { prompt } from 'enquirer'
import { bud } from './../../bud'

/// bud plugin
/// Create a new plugin
const BudPluginNew = props => {
  const [data, setData] = useState(null)

  const budFile = props.definition ? join(cwd(), props.definition) : resolve(__dirname, './../../templates/plugin/plugin.bud.js')

  const definition = require(budFile)

  useMemo(() => (!props.default ? prompt(definition.prompts).then(data => setData(data)) : setData(definition.default)), [])

  return !data ? (
    <Box minHeight={2}>
      <Text>Create new Block plugin</Text>
    </Box>
  ) : (
    bud.init({ data, budFile }).actions()
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
