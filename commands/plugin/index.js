import {cwd} from 'process'
import {resolve, join} from 'path'
import React, {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Box, Text} from 'ink'
import {prompt} from 'enquirer'
import {bud} from './../../bud'

/** Command: bud plugin */
/// Create a new plugin
const BudPluginNew = props => {
  const [data, setData] = useState(null)

  const budFile = props.definition
    ? join(cwd(), props.definition)
    : resolve(__dirname, './../../templates/plugin/plugin.bud.js')

  const definition = require(budFile)

  useMemo(
    () =>
      !props.default
        ? prompt(definition.prompts).then(data => setData(data))
        : setData(definition.default),
    [],
  )

  return !data ? (
    <Box minHeight={2}>
      <Text>Bud: Create new Plugin</Text>
    </Box>
  ) : (
    [
      bud
        .init({
          data,
          budFile,
          skipInstall: props.skipInstall,
          outDir: props.output,
        })
        .actions(),
    ]
  )
}

BudPluginNew.propTypes = {
  /// Plugin name
  name: PropTypes.string,
  /// Plugin namespace
  namespace: PropTypes.string,
  /// Author name
  author: PropTypes.string,
  /// Author email
  email: PropTypes.string,
  /// Skip install
  skipInstall: PropTypes.bool,
  /// Output directory
  output: PropTypes.string,
  /// Skip prompts
  default: PropTypes.bool,
}

BudPluginNew.defaultProps = {
  name: 'block-name',
  namespace: 'block-plugin',
  author: 'block-author',
  email: 'author@google.com',
  skipInstall: false,
  output: './bud-plugin',
  default: null,
}

export default BudPluginNew
