import React from 'react'
import {Text} from 'ink'

const Loading = ({message, spinnerColor = 'white'}) => (
  <Text color={spinnerColor}>{message}</Text>
)

export {Loading as default}
