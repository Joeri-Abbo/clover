import {resolve} from 'path'
import {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {prompt} from 'enquirer'
import {bud} from './../../src/bud'

/** Command: bud block */
/// Create a new block
const BudBlockNew = props => {
  const [data, setData] = useState(null)
  const budFile = resolve(
    __dirname,
    './../../../src/budfiles/block/block.bud.js',
  )

  const definition = require(budFile)

  useMemo(
    () =>
      !props.default
        ? prompt(definition.prompts).then(data => setData(data))
        : setData(definition.default),
    [],
  )

  return data
    ? [
        bud
          .init({
            data,
            budFile,
          })
          .actions(),
      ]
    : []
}

BudBlockNew.propTypes = {
  /// Block name
  name: PropTypes.string,
  /// Block namespace
  namespace: PropTypes.string,
  /// Skip prompts
  default: PropTypes.bool,
}

BudBlockNew.defaultProps = {
  name: 'block-name',
  namespace: 'block-plugin',
  default: null,
}

export default BudBlockNew
