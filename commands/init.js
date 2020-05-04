import {resolve} from 'path'
import React from 'react'
import PropTypes from 'prop-types'
import BudCLI from './../src/components/BudCLI'

/** Command: bud init */
/// Create a new project
const BudInit = props => (
  <BudCLI
    title={'Initialize new project'}
    budFile={resolve(__dirname, './../../src/budfiles/plugin/plugin.bud.js')}
    outDir={props.outDir}
  />
)

BudInit.propTypes = {
  /// Project name
  name: PropTypes.string,
  /// Block/plugin namespace
  namespace: PropTypes.string,
  /// Author name
  author: PropTypes.string,
  /// Author email
  email: PropTypes.string,
  /// Output directory
  output: PropTypes.string,
  /// Skip prompts
  default: PropTypes.bool,
}

BudInit.defaultProps = {
  name: 'block-name',
  namespace: 'block-plugin',
  author: 'block-author',
  email: 'author@google.com',
  output: './bud-plugin',
  default: false,
}

BudInit.positionalArgs = ['output']

export default BudInit
