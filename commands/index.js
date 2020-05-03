import React from 'react'
import {Color, Text} from 'ink'
import BudCLI from './../src/components/BudCLI'

/** Command: bud */
/// General information
const Bud = () => (
  <BudCLI complete={true}>
    <Text>
      To get started run <Color green>bud init</Color> from the WP plugins
      directory.
    </Text>
  </BudCLI>
)

export default Bud
