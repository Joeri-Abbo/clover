import {resolve} from 'path'
import React from 'react'
import BudCLI from '../src/components/BudCLI'

/** Command: bud plugin */
/// Create a new plugin
const Plugin = props => (
  <BudCLI
    label={require(props.budFile).label}
    budFile={require(props.budFile)}
  />
)

Plugin.defaultProps = {
  budFile: resolve(__dirname, './../../src/budfiles/plugin/plugin.bud'),
}

export default Plugin
