import React from 'react'
import {Box, Color} from 'ink'
import PropTypes from 'prop-types'

/**
 * Error
 */
const Error = ({message}) =>
  message ? (
    <Box>
      <Color red>💥 {JSON.stringify(message)}</Color>
    </Box>
  ) : (
    []
  )

Error.propTypes = {
  message: PropTypes.string,
}

export default Error
