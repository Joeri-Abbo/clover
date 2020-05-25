import React from 'react'
import {Box, Color} from 'ink'

/**
 * Error
 */
const Error = ({message}) =>
  message ? (
    <Box>
      <Color red>💥 {message && message.code ? message.code : message}</Color>
    </Box>
  ) : []

export default Error
