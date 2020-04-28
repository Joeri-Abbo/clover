import {resolve} from 'path'
import React, {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Box, Text} from 'ink'
import {prompt} from 'enquirer'
import {bud} from './../bud'

/** Command: bud */
/// Create a new block starter
const Bud = props => {
  const [data, setData] = useState(null)
  const pluginDefinition = require(resolve(__dirname, './../../templates/plugin/plugin.bud.js'))

  useMemo(() => {
    props.default || props.name || props.namespace
      ? setData({
          ...pluginDefinition.default,
          name: props.name ? props.name : pluginDefinition.default.name,
          namespace: props.namespace ? props.namespace : pluginDefinition.default.namespace,
        })
      : prompt(pluginDefinition.prompts).then(data => setData(data))
  }, [])

  return !data ? (
    <Box minHeight={2}>
      <Text>Create new Block plugin</Text>
    </Box>
  ) : (
    [
      bud
        .init({
          data,
          budFile: './../../templates/plugin/plugin.bud.js',
          skipInstall: props.skipInstall,
          outDir: props.output,
        })
        .actions(),

      bud
        .init({
          data,
          budFile: './../../templates/block/block.bud.js',
          outDir: props.output,
          skipInstall: props.skipInstall,
        })
        .actions(),
    ]
  )
}

Bud.propTypes = {
  /// Block/plugin name
  name: PropTypes.string,
  /// Block/plugin namespace
  namespace: PropTypes.string,
  /// Skip install
  skipInstall: PropTypes.bool,
  /// Output directory
  output: PropTypes.string,
  /// Skip prompts
  default: PropTypes.bool,
}

Bud.defaultProps = {
  name: '{{BUD_NAME}}',
  namespace: '{{BUD_NAMESPACE}}',
  skipInstall: false,
  output: './bud-plugin',
  default: null,
}

export default Bud
