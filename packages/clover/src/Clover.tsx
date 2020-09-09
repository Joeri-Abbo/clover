import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'

import useRouter from './hooks/useRouter'
import Generate from './commands/generate'

const Clover: FunctionComponent = () => {
  const {active} = useRouter({
    generator: true,
  })

  return active == 'generator' ? (
    <Generate name={null} output={process.cwd()} />
  ) : (
    <Box>
      <Text>404</Text>
    </Box>
  )
}

export {Clover as default}
