import {resolve} from 'path'
import React, {useState, useMemo, useEffect} from 'react'
import PropTypes from 'prop-types'
import {prompt} from 'enquirer'
import BudCLI from './../src/components/BudCLI'
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

  useEffect(() => {
    const observableTemplates = async () => {
      if (!data) {
        return
      }

      console.log('')

      await bud
        .init({
          data,
          budFile: resolve(__dirname, budFile),
          outDir: props.output,
        })
        .actions()
        .subscribe({
          next(x) {
            console.log(x)
          },
          complete(x) {
            console.log(x)
          },
        })
    }

    observableTemplates()
  }, [data])

  return <BudCLI title={'Initialize new project'} />
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
