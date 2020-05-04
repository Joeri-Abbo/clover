import {resolve} from 'path'
import React from 'react'
import PropTypes from 'prop-types'
import BudCLI from '../src/components/BudCLI'

/** Command: bud block */
/// Create a new block
const Block = props => (
  <BudCLI
    label={require(props.budFile).label}
    budFile={require(props.budFile)}
    commandValues={props.skip ? props : null}
  />
)

Block.propTypes = {
  /// Block name
  name: PropTypes.string,
  /// Block namespace
  namespace: PropTypes.string,
  /// Block title
  title: PropTypes.string,
  /// Block description
  description: PropTypes.string,
  /// Block category
  category: PropTypes.string,
  /// Block supports
  supports: PropTypes.array,
  /// Block components
  components: PropTypes.array,
  /// Use arguments and default values instead of prompt
  skip: PropTypes.bool,
}

Block.defaultProps = {
  namespace: 'bud-plugin',
  name: 'block-name',
  title: 'Block Name',
  description: 'A newly scaffolded block',
  components: ['RichText', 'InnerBlocks'],
  category: 'common',
  supports: ['align', 'alignWide', 'inserter', 'multiple', 'reusable'],
  budFile: resolve(__dirname, './../../src/budfiles/block/block.bud'),
  skip: false,
}

export default Block
