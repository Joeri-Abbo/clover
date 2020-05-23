import React from 'react'
import propTypes from 'prop-types'
import {Box, Text, Color} from 'ink'
import Spinner from 'ink-spinner'

/**
 * Tasks
 */
const Tasks = ({status, complete}) => status ? (
  <Box>
    {complete
      ? <Color green>⚡️ All set.</Color>
      : (
        <Text>
          <Color green>
            <Spinner type="dots" />
          </Color>

          {` ${status}`}
        </Text>
      )
    }
  </Box>
) : []

Tasks.propTypes = {
  status: propTypes.string,
  complete: propTypes.bool,
}

Tasks.defaultProps = {
  status: '',
  complete: false,
}

export default Tasks