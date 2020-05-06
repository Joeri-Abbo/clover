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
        <Text>🌱{'  '}<Color green>cd bud-project</Color>{'                      '}change directory to your bud project root</Text>
        {/* prettier-ignore */}
        <Text>🌱{'  '}<Color green>bud generate plugin</Color>{'                 '}generate a block-editor focused plugin scaffold</Text>
        {/* prettier-ignore */}
        <Text>🌱{'  '}<Color green>bud generate block</Color>{'                  '}generate a starter block</Text>
        {/* prettier-ignore */}
        <Text>🌱{'  '}<Color green>bud generate component-media-upload</Color>{' '}generate a reusable media upload component</Text>
        {/* prettier-ignore */}
        <Text>🌱{'  '}<Color green>yarn build</Color>{'                          '}build your new block</Text>
        {/* prettier-ignore */}
        <Text>🌱{'  '}<Color green>yarn dev</Color>{'                            '}code your block with HMR and live-reload</Text>
        {/* prettier-ignore */}
        <Text>✨{'  '}<Color yellow>template with blade</Color></Text>
        {/* prettier-ignore */}
        <Text>✨{'  '}<Color yellow>write a custom generator</Color></Text>
        {/* prettier-ignore */}
        <Text>✨{'  '}<Color yellow>extend bud with a bud-plugin</Color></Text>
        {/* prettier-ignore */}
        <Box>&nbsp;</Box>
        {/* prettier-ignore */}
        <Text>💅🏽{'  '}<Color magenta>get hype.</Color></Text>
      </Box>
    </Box>
  </BudCLI>
)

export default Bud
