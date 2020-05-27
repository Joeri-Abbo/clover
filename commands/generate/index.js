import {dirname} from 'path'
import React, {useState, useEffect} from 'react'
import {Text, Color} from 'ink'
import PropTypes from 'prop-types'
import BudCLI from '../../src/components/BudCLI'
import globby from 'globby'

const cwd = process.cwd()

/** Command: bud generate */
/// Generate code from a budfile
const Generate = props => {
  const [budName] = useState(props.budName)

  /**
   * Search helpers
   */
  const getRootBudPath = name =>
    `${cwd}/node_modules/@roots/bud/src/budfiles/**/${name}.bud.js`
  const getModuleBudPath = name => `${cwd}/node_modules/**/bud-plugin-*/${name}.bud.js`
  const getProjectBudPath = name => `${cwd}/.bud/budfiles/**/${name}.bud.js`

  /**
   * Budfile state.
   */
  const [budfile, setBudfile] = useState(false)
  const [checked, setChecked] = useState({
    project: false,
    modules: false,
    roots: false,
  })

  /**
   * Local budfiles
   */
  useEffect(() => {
    budName &&
      !checked.project &&
      (async () => {
        const buds = await globby([getProjectBudPath(budName)])
        buds && buds.length > 0 && setBudfile(buds[0])

        setChecked({...checked, project: true})
      })()
  }, [budName, checked.project])

  /**
   * Module budfiles
   */
  useEffect(() => {
    !budfile &&
      checked.project &&
      (async () => {
        const buds = await globby([getModuleBudPath(budName)])
        buds && buds.length > 0 && setBudfile(buds[0])

        setChecked({...checked, modules: true})
      })()
  }, [budfile, checked.project])

  /**
   * Core budfiles
   */
  useEffect(() => {
    !budfile &&
      checked.modules &&
      (async () => {
        const buds = await globby([getRootBudPath(budName)])
        buds && buds.length > 0 && setBudfile(buds[0])

        setChecked({...checked, roots: true})
      })()
  }, [budfile, checked.modules])

  /**
   * Sprout state.
   */
  const [sprout, setSprout] = useState(false)
  const [templateDir, setTemplateDir] = useState(false)
  useEffect(() => {
    budfile && setSprout(require(budfile))
    budfile && setTemplateDir(`${dirname(budfile)}/templates`)
  }, [budfile])

  /**
   * Render
   */
  return sprout && templateDir ? (
    <BudCLI
      sprout={sprout}
      label={sprout.description ?? 'Bud'}
      outDir={''}
      noClear={true}
      templateDir={templateDir ?? ''}
    />
  ) : (
    <Text>
      <Color green>Searching...</Color>
    </Text>
  )
}

Generate.propTypes = {
  // Generator name ([name].bud.js)
  budName: PropTypes.string,
}

Generate.positionalArgs = ['budName']

export default Generate
