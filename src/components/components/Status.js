import React from 'react'
import propTypes from 'prop-types'
import {Box, Text, Color} from 'ink'
import Spinner from 'ink-spinner'

/**
 * Status
 *
 * @prop {string} status
 * @prop {bool}   comp
 */
const Status = ({status, complete}) =>
  <Box>
    {status && ! complete && (
      <Text>
        <Color green>
          <Spinner type="dots" />
        </Color>
        {` ${status}`}
      </Text>
    )}

    {complete && (
      <Text>
        <Color green>
          ⚡️ All set.
        </Color>
      </Text>
    )}
  </Box>

Status.propTypes = {
  complete: propTypes.bool,
}

Status.defaultProps = {
  status: '',
  complete: false,
}

export default Status
