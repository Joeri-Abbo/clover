import React from 'react'
import {Box, Color} from 'ink'

/**
 * Error
 */
const Error = ({message}) => (
  <Box>
    <Color red>💥 {JSON.stringify(message)}</Color>
  </Box>
)

export default Error
