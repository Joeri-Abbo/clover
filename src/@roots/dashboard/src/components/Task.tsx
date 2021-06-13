import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'

interface TaskProps {
  status: string
  complete: boolean
}

type TaskComponent = FunctionComponent<TaskProps>

const Task: TaskComponent = ({status, complete}) => {
  if (complete) {
    return <Text color="green">🏁{'  '}Done</Text>
  }

  if (!status || complete) {
    return <></>
  }

  return (
    <Box>
      {status && (
        <Text color="green">
          <Spinner /> {status}
        </Text>
      )}
    </Box>
  )
}

export {Task as default}
