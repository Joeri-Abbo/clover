import React from 'react'
import {Box, Color, Text} from 'ink'
import Banner from './../src/components/components/Banner'

/** Command: bud */
/// Bud information
const Bud = () => (
  <Box flexDirection="column" marginTop={1}>
    <Banner label="Bud: Modern WordPress Scaffolding" />

    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>
          To get started run
          <Color green> npx @roots/bud init {`[project-dir]`}</Color>
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text>The init command will install Bud as a project dependency.</Text>
      </Box>
      <Box marginBottom={1}>
        <Text>
          Afterward, you can run subsequent commands with
          <Color green> yarn generate [generator-name]</Color>.
        </Text>
      </Box>
    </Box>
  </Box>
)

export default Bud
