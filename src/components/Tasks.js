import React, {useEffect} from 'react'
import {Box, Color, Text, useStdout} from 'ink'
import Spinner from 'ink-spinner'

/**
 * Tasks
 *
 * @prop {object} data
 * @prop {object} status
 * @prop {bool}   complete
 * @prop {bool}   noClear
 */
const Tasks = ({data, status, complete, noClear}) => {
  const {stdout} = useStdout()
  useEffect(() => {
    data && !noClear && stdout.write('\x1B[2J\x1B[0f')
  }, [data])

  return status ? (
    <Box>
      {complete ? (
        <Color green>⚡️ All set.</Color>
      ) : (
        <Text>
          <Color green>
            <Spinner type="dots" />
          </Color>
          {` ${status}`}
        </Text>
      )}
    </Box>
  ) : null
}

export default Tasks
