import { resolve } from 'path'
import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'ink'
import { prompt } from 'enquirer'
import { bud } from './../bud'

/// bud
/// Create a new block starter
const Bud = props => {
  const [data, setData] = useState(null)
  const pluginDefinition = require(
    resolve(__dirname, './../../templates/plugin/plugin.bud.js')
  )

  useMemo(() => {
    props.default
      ? setData(pluginDefinition.default)
      : prompt(pluginDefinition.prompts).then(data => setData(data))
  }, [])

  return ! data ? (
    <Box minHeight={2}>
      <Text>Create new Block plugin</Text>
    </Box>
  ) : (
    [
      bud.init({ outDir: props.output, data, budFile: './../../templates/plugin/plugin.bud.js' }).actions(),
      bud.init({ outDir: props.output, data, budFile: './../../templates/block/block.bud.js' }).actions(),
    ]
  )
}

Bud.propTypes = {
  /// Output directory
  output: PropTypes.string,
  /// Skip prompts
  default: PropTypes.bool,
}

Bud.shortFlags = {
  output: 'o',
}

Bud.defaultProps = {
  output: './bud-plugin',
  default: null,
}

export default Bud
