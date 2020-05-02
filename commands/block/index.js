import {resolve} from 'path'
import React, {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Box, Text} from 'ink'
import {prompt} from 'enquirer'
import {bud} from './../../bud'

/** Command: bud block */
/// Create a new block
const BudBlockNew = props => {
  const [data, setData] = useState(null)

  const budFile = resolve(__dirname, './../../../templates/block/block.bud.js')
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
      <Text>Bud: Create new Block</Text>
    </Box>
  ) : (
    [
      bud
        .init({
          data,
          budFile,
          skipInstall: props.skipInstall,
        })
        .actions(),
    ]
  )
}

BudBlockNew.propTypes = {
  /// Block name
  name: PropTypes.string,
  /// Block namespace
  namespace: PropTypes.string,
  /// Skip install
  skipInstall: PropTypes.bool,
  /// Skip prompts
  default: PropTypes.bool,
}

BudBlockNew.defaultProps = {
  name: 'block-name',
  namespace: 'block-plugin',
  skipInstall: false,
  default: null,
}

export default BudBlockNew
