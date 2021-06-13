import React from 'react'
import {Box, Text} from 'ink'

const Error = ({message}) => (
  <Box>
    <Text color="red">💥 {JSON.stringify(message)}</Text>
  </Box>
)

export {Error as default}
