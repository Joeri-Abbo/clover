import {resolve} from 'path'
import React from 'react'
import PropTypes from 'prop-types'
import BudCLI from '../src/components/BudCLI'

/** Command: bud plugin */
/// Create a new plugin
const Plugin = props => (
  <BudCLI
    label={require(props.budFile).label}
    budFile={require(props.budFile)}
    outDir={props.output}
    commandValues={props.skip ? props : null}
  />
)

Plugin.propTypes = {
  /// Plugin name
  name: PropTypes.string,
  /// Plugin namespace
  namespace: PropTypes.string,
  /// Plugin description
  description: PropTypes.string,
  /// Plugin author name
  author: PropTypes.string,
  /// Plugin author email
  email: PropTypes.string,
  /// Plugin website
  website: PropTypes.string,
  /// Output directory
  output: PropTypes.string,
  /// Use arguments and default values instead of prompt
  skip: PropTypes.bool,
}

Plugin.defaultProps = {
  name: 'Bud Plugin',
  namespace: 'bud-namespace',
  description: 'bud-description',
  author: 'bud-author',
  email: 'bud-email@roots.io',
  website: 'https://roots.io/bud',
  skip: false,
  budFile: resolve(__dirname, './../../src/budfiles/plugin/plugin.bud'),
}

Plugin.positionalArgs = ['output']

export default Plugin
