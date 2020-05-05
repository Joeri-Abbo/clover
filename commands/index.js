{/* prettier-ignore */}

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
        <Text>🌱{'  '}<Color green>bud init bud-project</Color>{'                '}create a new plugin in ./bud-project</Text>
        <Text>🌱{'  '}<Color green>cd bud-project</Color>{'                      '}change directory to your bud project root</Text>
        <Text>🌱{'  '}<Color green>bud generate plugin</Color>{'                 '}generate a block-editor focused plugin scaffold</Text>
        <Text>🌱{'  '}<Color green>bud generate block</Color>{'                  '}generate a starter block</Text>
        <Text>🌱{'  '}<Color green>bud generate component-media-upload</Color>{' '}generate a reusable media upload component</Text>
        <Text>🌱{'  '}<Color green>yarn build</Color>{'                          '}build your new block</Text>
        <Text>🌱{'  '}<Color green>yarn dev</Color>{'                            '}code your block with HMR and live-reload</Text>
        <Text>✨{'  '}<Color yellow>template with blade</Color></Text>
        <Text>✨{'  '}<Color yellow>write a custom generator</Color></Text>
        <Text>✨{'  '}<Color yellow>extend bud with a bud-plugin</Color></Text>
        <Box>&nbsp;</Box>
        <Text>💅🏽{'  '}<Color magenta>get hype.</Color></Text>
      </Box>
    </Box>
  </BudCLI>
)

export default Bud
