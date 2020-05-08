import {join, resolve, dirname} from 'path'
import React, {useState, useEffect} from 'react'
import {Text, Color} from 'ink'
import PropTypes from 'prop-types'
import BudCLI from '../../src/components/BudCLI'
import globby from 'globby'

/**
 * Resolvers for different budfile locations
 */
const getRootBudPath = name =>
  resolve(__dirname, `../../../src/**/${name}.bud.js`)

const getModuleBudPath = name =>
  join(process.cwd(), `node_modules/**/bud-plugin-*/**/${name}.bud.js`)

const getProjectBudPath = name =>
  join(process.cwd(), `.bud/**/${name}.bud.js`)

/** Command: bud generate new */
/// Generate code described by a budfile
const GenerateNew = props => {
  const [budName] = useState(props.budName)
  const [sprout, setSprout] = useState(false)
  const [checked, setChecked] = useState({
    project: false,
    modules: false,
    roots: false,
  })

  /**
   * Local budfiles
   */
  useEffect(() => {
    budName && !checked.project &&
      (async () => {
        const buds = await globby([getProjectBudPath(budName)])
        buds && buds.length > 0 && setSprout(buds[0])
        setChecked({...checked, project: true})
      })()
  }, [budName, checked])

  /**
   * Module budfiles
   */
  useEffect(() => {
    !sprout && checked.project &&
      (async () => {
        const buds = await globby([getModuleBudPath(budName)])
        buds && buds.length > 0 && setSprout(buds[0])
        setChecked({...checked, modules: true})
      })()
  }, [sprout, checked])

  /**
   * Core budfiles
   */
  useEffect(() => {
    !sprout && checked.modules &&
      (async () => {
        const buds = await globby([getRootBudPath(budName)])
        buds && buds.length > 0 && setSprout(buds[0])
        setChecked({...checked, roots: true})
      })()
  }, [sprout, checked])

  /**
   * Render
   */
  return sprout ? (
    <BudCLI
      label={require(sprout).description}
      outDir={process.cwd()}
      templateDir={`${dirname(sprout)}/templates`}
      sprout={require(sprout)}
    />
  ) : (
    <Text>
      <Color green>Searching...</Color>
    </Text>
  )
}

GenerateNew.propTypes = {
  // Generator name ([name].bud.js)
  budName: PropTypes.string,
}

GenerateNew.positionalArgs = ['budName']

export default GenerateNew
