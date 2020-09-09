import React from 'react'
import {Box} from 'ink'

import useGenerators from '../../hooks/useGenerators'
import App from '../../components/App'
import List from '../../components/List'

const ListCommand = () => {
  const [generators, complete] = useGenerators()

  return (
    <App isLoading={!complete}>
      {complete && (
        <Box flexDirection="column">
          <List label="Generators" items={generators} />
        </Box>
      )}
    </App>
  )
}

export {ListCommand as default}
