import React from 'react'
import {Box, Color, Text} from 'ink'
import BudCLI from './../src/components/BudCLI'

/** Command: bud */
/// Bud information
const Bud = () => (
  <BudCLI label={'Bud: Modern WordPress Scaffolding'}>
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>
          To get started run <Color green>bud init</Color> from the WP plugins
          directory.
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text bold>Additional commands:</Text>
      </Box>

      <Box flexDirection="column" marginLeft={2}>
        <Text>
          🌱{'   '}
          <Color green>bud plugin</Color>
          {'   '}create a new plugin
        </Text>
        <Text>
          🌱{'   '}
          <Color green>bud block</Color>
          {'    '}create a new block
        </Text>
        <Text>
          🌱{'   '}
          <Color green>bud generate</Color> run a custom budfile
        </Text>
      </Box>
    </Box>
  </BudCLI>
)

export default Bud
