import React from 'react'
import {Box, Color, Text} from 'ink'
import Link from 'ink-link'

/**
 * Banner component.
 *
 * @prop {string} label
 */
const Banner = ({label}) => (
  <Box marginBottom={1} flexDirection="row" justifyContent="space-between">
    {label && <Text>{label}</Text>}
    <Box flexDirection="row">
      <Text>{`🌱`}</Text>
      <Text bold>
        <Link url="https://roots.io/bud">
          <Color green>{'  Bud'}</Color>
        </Link>
      </Text>
    </Box>
  </Box>
)

export default Banner
