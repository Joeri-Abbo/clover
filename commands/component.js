import {resolve} from 'path'
import React from 'react'
import PropTypes from 'prop-types'
import BudCLI from '../src/components/BudCLI'

/** Command: bud component */
/// Create a new component
const Component = props => {
  const budFile = resolve(
    __dirname,
    `./../../src/budfiles/components/${props.componentName}/component.bud`,
  )

  return (
    <BudCLI
      label={require(budFile).label}
      budFile={require(budFile)}
      commandValues={props.skip ? props : null}
    />
  )
}

Component.propTypes = {
  /// Component name
  componentName: PropTypes.string,
  /// Use arguments and default values instead of prompt
  skip: PropTypes.bool,
}

Component.defaultProps = {
  skip: false,
}

Component.positionalArgs = ['componentName']

export default Component
