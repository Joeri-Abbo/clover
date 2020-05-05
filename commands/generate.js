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
  const [projectBudExists, setProjectBudExists] = useState(null)
  useEffect(() => {
    budName && setProjectBudPath(getProjectBudPath(budName))
  }, [budName])

  useEffect(() => {
    projectBudPath &&
      (async () => {
        exists(projectBudPath, res => {
          res
            ? (() => {
                setProjectBudExists(true)
                setProjectBud(projectBudPath)
              })()
            : setProjectBudExists(false)
        })
      })()
  }, [projectBudPath])

  const [budModules, setBudModules] = useState([])
  const [budModulesExist, setBudModulesExist] = useState(null)
  useEffect(() => {
    projectBudPath &&
      projectBudExists === false &&
      (async () => {
        const modules = await globby([getModuleBudPath(budName)])
        modules && modules.length > 0
          ? (() => {
              setBudModules(modules)
              setBudModulesExist(true)
            })()
          : setBudModulesExist(false)
      })()
  }, [projectBudPath, projectBudExists])

  const [rootBud, setRootBud] = useState([])
  const [rootBudExists, setRootBudExists] = useState(null)
  useEffect(() => {
    projectBudPath &&
      projectBudExists === false &&
      budModulesExist === false &&
      (async () => {
        const coreBuds = await globby([getRootBudPath(budName)])
        coreBuds
          ? (() => {
              setRootBud(coreBuds)
              setRootBudExists(true)
            })()
          : setRootBudExists(false)
      })()
  }, [projectBudPath, projectBudExists, budModulesExist, budModules])

  const [budFile, setBudFile] = useState()
  useEffect(() => {
    if (projectBudExists) {
      setBudFile(projectBud)
    }

    if (!projectBudExists && budModulesExist && budModules[0]) {
      setBudFile(budModules[0])
    }

    if (!projectBudExists && !budModulesExist && rootBudExists && rootBud[0]) {
      setBudFile(rootBud[0])
    }
  }, [
    projectBudExists,
    projectBud,
    budModulesExist,
    budModules,
    rootBud,
    rootBudExists,
  ])

  return budFile ? (
    <BudCLI
      label={require(budFile.replace('.js','')).label}
      outDir={process.cwd()}
      templateDir={dirname(budFile)}
      sprout={require(`${budFile.replace('.js','')}`)}
    />
  ):[]
}

Generate.propTypes = {
  // Bud file name ([name].bud.js)
  budName: PropTypes.string,
}

Generate.positionalArgs = ['budName']

export default Generate
