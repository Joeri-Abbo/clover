import { resolve } from 'path'
import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'ink'
import { prompt } from 'enquirer'
import { bud } from './../../bud'

/** Command: bud block */
/// Create a new block
const BudBlockNew = props => {
  const [data, setData] = useState(null)
  const [results, setResults] = useState(false)

  const budFile = resolve(__dirname, './../../../templates/block/block.bud.js')
  const definition = require(budFile)

  useMemo(() => (!props.default ? prompt(definition.prompts).then(data => setData(data)) : setData(definition.default)), [])

  useEffect(() => {
    if (data) {
      bud.init({ data, budFile }).actions() && setResults(true)
    }
  }, [data])

  return !results ? (
    <Box minHeight={2}>
      <Text>Bud: create block</Text>
    </Box>
  ) : (
    <Box minHeight={2}>
      <Text>All done</Text>
    </Box>
  )
}

BudBlockNew.propTypes = {
  /// Output directory
  output: PropTypes.string,
  /// Skip prompts; use defaults
  default: PropTypes.bool,
}

BudBlockNew.shortFlags = {
  output: 'o',
  definition: 'd',
}

BudBlockNew.defaultProps = {
  output: './block',
  default: false,
}

export default BudBlockNew
