import React from 'react'
import PropTypes from 'prop-types'
import Generate from './generate'

/** Command: clover */
/// Clover CLI
const Clover = ({inputArgs}) => <Generate inputArgs={inputArgs} />

Clover.propTypes = {
  inputArgs: PropTypes.array,
}

export default Clover
