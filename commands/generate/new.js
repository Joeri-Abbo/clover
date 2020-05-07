import {join, resolve, dirname} from 'path'
import {exists} from 'fs'
import React, {useState, useEffect} from 'react'
import {Text, Color} from 'ink'
import PropTypes from 'prop-types'
import BudCLI from '../../src/components/BudCLI'
import globby from 'globby'

/**
 * Resolvers for different budfile locations
 */
const getRootBudPath = name =>
  resolve(__dirname, `../../../src/budfiles/**/${name}.bud.js`)

const getModuleBudPath = name =>
  join(process.cwd(), `node_modules/**/bud-plugin-*/**/${name}.bud.js`)

const getProjectBudPath = name =>
  join(process.cwd(), `.bud/budfiles/${name}/${name}.bud.js`)

/** Command: bud generate new */
/// Generate code described by a budfile
const GenerateNew = props => {
  const [budName] = useState(props.budName)
  const [sprout, setSprout] = useState(null)

  /**
   * Local budfiles
   */
  useEffect(() => {
    console.log(budName)
    budName &&
      (async () => {
        const budPath = getProjectBudPath(budName)
        exists(budPath, res => {
          res && setSprout(budPath)
        })
      })()
  }, [budName])

  /**
   * Module budfiles
   */
  useEffect(() => {
    !sprout &&
      (async () => {
        const modules = await globby([getModuleBudPath(budName)])
        modules && modules.length > 0 && setSprout(modules[0])
      })()
  }, [sprout])

  /**
   * Core budfiles
   */
  useEffect(() => {
    !sprout &&
      (async () => {
        const coreBuds = await globby([getRootBudPath(budName)])
        coreBuds && setSprout(coreBuds[0])
      })()
  }, [sprout])

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
