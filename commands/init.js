import {resolve} from 'path'
import React from 'react'
import PropTypes from 'prop-types'
import BudCLI from './../src/components/BudCLI'

/** Command: bud init */
/// Create a new project
const Init = props => (
  <BudCLI
    label={require(props.budFile).label}
    budFile={require(props.budFile)}
    outDir={props.output}
    commandValues={props.skip ? props : null}
  />
)

Init.propTypes = {
  /// Project name
  name: PropTypes.string,
  /// Project namespace
  namespace: PropTypes.string,
  /// Project description
  description: PropTypes.string,
  /// Project author name
  author: PropTypes.string,
  /// Project author email
  email: PropTypes.string,
  /// Project website
  website: PropTypes.string,
  /// Project development URL
  devUrl: PropTypes.string,
  /// Plugins URI
  pluginsUri: PropTypes.string,
  /// Output directory
  output: PropTypes.string,
  /// Use arguments and default values instead of prompt
  skip: PropTypes.bool,
}

Init.defaultProps = {
  name: 'Bud Plugin',
  namespace: 'bud-namespace',
  description: 'bud-description',
  author: 'bud-author',
  email: 'bud-email@roots.io',
  website: 'https://roots.io/bud',
  devUrl: 'http://acme.test',
  pluginsUri: 'app/plugins',
  skip: false,
  budFile: resolve(__dirname, './../../src/budfiles/plugin/plugin.bud'),
}

Init.positionalArgs = ['output']

export default Init
