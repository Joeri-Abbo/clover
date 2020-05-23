import React from 'react'
import propTypes from 'prop-types'
import {Box, Text, Color} from 'ink'
import Link from 'ink-link'

/**
 * Banner
 *
 * @prop {string} label
 */
const Banner = ({label}) => (
  <Box
    marginBottom={1}
    flexDirection="row"
    justifyContent="space-between">
    <Box flexDirection="column">
      <Text>{label}</Text>
    </Box>

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

Banner.propTypes = {
  label: propTypes.string,
}

export default Banner