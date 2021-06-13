import React from 'react'
import {Box, Text} from 'ink'

const List = ({label, items}) => (
  <Box flexDirection="column" marginBottom={1}>
    {label && (
      <Text color="black" backgroundColor="green">
        {label}
      </Text>
    )}

    {items?.map((item, id) => (
      <Box key={id} flexDirection="column">
        <Text>◦ {item.name}</Text>
      </Box>
    ))}
  </Box>
)

export {List as default}
