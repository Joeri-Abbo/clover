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

  const budFiles = {
    plugin: './../../templates/plugin/plugin.bud.js',
    block: './../../templates/block/block.bud.js',
    mediaUpload: './../../templates/component-media-upload/component.bud.js',
  }

  useMemo(() => {
    const buds = {
      plugin: require(resolve(__dirname, budFiles.plugin)),
      block: require(resolve(__dirname, budFiles.block)),
    }

    props.default || props.name || props.namespace
      ? setData({
          ...buds.plugin.default,
          ...buds.block.default,
          name: props.name ? props.name : buds.plugin.default.name,
          namespace: props.namespace ? props.namespace : buds.plugin.default.namespace,
        })
      : prompt(...[
        ...buds.plugin.prompts,
        ...buds.block.prompts,
      ]).then(data => setData(data))
  }, [])

  return ! data ? (
    <Box minHeight={2}>
      <Text>Create new Block plugin</Text>
    </Box>
  ) : (
    [
      bud
        .init({
          data,
          budFile: budFiles.plugin,
          skipInstall: props.skipInstall,
          outDir: props.output,
        })
        .actions(),

      bud
        .init({
          data,
          budFile: budFiles.mediaUpload,
          skipInstall: props.skipInstall,
          outDir: props.output,
        })
        .actions(),

      bud
        .init({
          data,
          budFile: budFiles.block,
          skipInstall: props.skipInstall,
          outDir: props.output,
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

Bud.defaultProps = {
  name: 'block-name',
  namespace: 'block-plugin',
  author: 'block-author',
  email: 'author@google.com',
  skipInstall: false,
  output: './bud-plugin',
  default: null,
}

export default Bud
