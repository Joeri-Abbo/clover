import {join, resolve, dirname} from 'path'
import {exists} from 'fs'
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import BudCLI from '../src/components/BudCLI'
import globby from 'globby'

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
        modules && modules.length > 0 && setBudModules(modules)
      })()
  }, [projectBud])

  /**
   * Core budfiles
   */
  const [rootBud, setRootBud] = useState([])
  useEffect(() => {
    !projectBud && !budModules &&
      (async () => {
        const coreBuds = await globby([getRootBudPath(budName)])
        coreBuds && setRootBud(coreBuds)
      })()
  }, [projectBud, budModules])

  /**
   * Set final budfile
   */
  const [budFile, setBudFile] = useState()
  useEffect(() => {
    if (projectBud) setBudFile(projectBud)
    if (budModules && budModules[0]) setBudFile(budModules[0])
    if (rootBud && rootBud[0]) setBudFile(rootBud[0])
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
  ) : []
}

Generate.propTypes = {
  // Bud file name ([name].bud.js)
  budName: PropTypes.string,
}

Generate.positionalArgs = ['budName']

export default Generate
