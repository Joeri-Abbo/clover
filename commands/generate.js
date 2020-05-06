import {join, resolve, dirname} from 'path'
import {exists} from 'fs'
import React, {useState, useEffect} from 'react'
import {Text, Color} from 'ink'
import PropTypes from 'prop-types'
import BudCLI from '../src/components/BudCLI'
import globby from 'globby'

/**
 * Resolvers for different budfile locations
 */
const getRootBudPath = name =>
  resolve(__dirname, `../../src/budfiles/**/${name}.bud.js`)

const getModuleBudPath = name =>
  join(process.cwd(), `node_modules/**/bud-plugin-*/**/${name}.bud.js`)

const getProjectBudPath = name =>
  join(process.cwd(), `.bud/budfiles/${name}/${name}.bud.js`)

/** Command: bud generate */
/// Generate code described by a budfile
const Generate = props => {
  const [budName] = useState(props.budName)
  const [projectBud, setProjectBud] = useState(null)
  const [projectBudPath, setProjectBudPath] = useState(null)
  useEffect(() => {
    budName && setProjectBudPath(getProjectBudPath(budName))
  }, [budName])

  /**
   * Local budfiles
   */
  useEffect(() => {
    projectBudPath &&
      (async () => {
        exists(projectBudPath, res => {
          res && setProjectBud(projectBudPath)
        })
      })()
  }, [projectBudPath])

  /**
   * Module budfiles
   */
  const [budModules, setBudModules] = useState(null)
  useEffect(() => {
    !projectBud &&
      (async () => {
        const modules = await globby([getModuleBudPath(budName)])
        modules && modules.length > 0 && setBudModules(modules[0])
      })()
  }, [projectBud])

  /**
   * Core budfiles
   */
  const [rootBud, setRootBud] = useState(null)
  useEffect(() => {
    !projectBud &&
      !budModules &&
      (async () => {
        const coreBuds = await globby([getRootBudPath(budName)])
        coreBuds && setRootBud(coreBuds[0])
      })()
  }, [projectBud, budModules])

  /**
   * Set final budfile
   */
  const [budFile, setBudFile] = useState(null)
  useEffect(() => {
    projectBud && setBudFile(projectBud)
    !projectBud && budModules && setBudFile(budModules)
    !projectBud && !budModules && rootBud && setBudFile(rootBud)
  }, [projectBud, budModules, rootBud])

  /**
   * Render
   */
  return budFile ? (
    <BudCLI
      label={require(budFile).label}
      outDir={process.cwd()}
      templateDir={dirname(budFile)}
      sprout={require(budFile)}
    />
  ) : (
    <Text>
      <Color green>Searching...</Color>
    </Text>
  )
}

Generate.propTypes = {
  // Bud file name ([name].bud.js)
  budName: PropTypes.string,
}

Generate.positionalArgs = ['budName']

export default Generate
