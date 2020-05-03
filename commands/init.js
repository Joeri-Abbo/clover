import {resolve} from 'path'
import {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {prompt} from 'enquirer'
import {bud} from './../src/bud'

/** Plugin budfile */
const budFile = './../../src/budfiles/plugin/plugin.bud.js'

/** Command: bud init */
/// Create a new project
const BudInit = props => {
  const [data, setData] = useState(null)

  useMemo(() => {
    const project = require(resolve(__dirname, budFile))
    prompt(project.prompts).then(data => setData(data))
  }, [])

  return data
    ? [
        bud
          .init({
            data,
            budFile: budFile,
            outDir: props.output,
          })
          .actions(),
      ]
    : []
}

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
