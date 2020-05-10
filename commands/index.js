import React from 'react'
import {Box, Color, Text} from 'ink'
import BudCLI from './../src/components/BudCLI'

/** Command: bud */
/// Bud information
const Bud = () => (
  <BudCLI label={'Bud: Modern WordPress Scaffolding'} inert={true}>
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>
          To get started run <Color green>bud init {`{project-dir}`}</Color>
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text bold>Now you can run some generators ⚡️</Text>
      </Box>

      <Box marginBottom={1}>
        <Text bold>Swiftness-quick block plugin recipe:</Text>
      </Box>

      <Box flexDirection="column" marginLeft={2}>
        {/* prettier-ignore */}
        <Text>🌱{'  '}<Color green>bud init bud-project</Color>{'                 '}create a new plugin in ./bud-project</Text>
        {/* prettier-ignore */}
        <Text>🌱{'  '}<Color green>bud generate plugin</Color>{'                 '}generate a block-editor focused plugin scaffold</Text>
        {/* prettier-ignore */}
        <Text>🌱{'  '}<Color green>bud generate block</Color>{'                  '}generate a starter block</Text>
        {/* prettier-ignore */}
        <Text>🌱{'  '}<Color green>bud generate component-media-upload</Color>{' '}generate a reusable media upload component</Text>
      </Box>
    </Box>
  </BudCLI>
)

export default Bud
