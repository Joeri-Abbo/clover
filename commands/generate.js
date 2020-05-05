import {join, resolve} from 'path'
import {exists} from 'fs'
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Color, Text} from 'ink'
import BudCLI from '../src/components/BudCLI'
import globby from 'globby'

const getRootBudPath = budFile => resolve(__dirname, `./../../src/budfiles/**/${budFile}.bud.js`)
const getModuleBudPath = budFile => join(process.cwd(), `node_modules/**/bud-plugin-*/**/${budFile}.bud.js`)
const getProjectBudPath = budFile => join(process.cwd(), `.bud/budfiles/${budFile}/${budFile}.bud.js`)

/** Command: bud generate */
/// Generate code described by a budfile
const Generate = props => {
  const [budName] = useState(props.budFileName)
  const [projectBud, setProjectBud] = useState(null)
  const [projectBudPath, setProjectBudPath] = useState(null)
  const [projectBudExists, setProjectBudExists] = useState(null)
  useEffect(() => {
    budName && setProjectBudPath(getProjectBudPath(props.budFileName))
  }, [budName])

  useEffect(() => {
    projectBudPath && (async () => {
      exists(projectBudPath, res => {
        res ? (() => {
          setProjectBudExists(true)
          setProjectBud(require(projectBudPath))
        })()
        : setProjectBudExists(false)
      })
    })()
  }, [projectBudPath])

  const [budModules, setBudModules] = useState([])
  const [budModulesExist, setBudModulesExist] = useState(null)
  useEffect(() => {
    projectBudPath && projectBudExists === false && (async () => {
      const modules = await globby([getModuleBudPath(budName)])
      modules && modules.length > 0
        ? (() => {
          setBudModules(modules.map(module => require(module)))
          setBudModulesExist(true)
        })()
        : setBudModulesExist(false)
    })()
  }, [projectBudPath, projectBudExists])

  const [rootBud, setRootBud] = useState([])
  const [rootBudExists, setRootBudExists] = useState(null)
  useEffect(() => {
    projectBudPath
      && projectBudExists === false
      && budModulesExist === false
      && (async () => {
      const coreBuds = await globby([getRootBudPath(budName)])
      coreBuds
        ? (() => {
          setRootBud(coreBuds.map(bud => require(bud)))
          setRootBudExists(true)
        })()
        : setRootBudExists(false)
    })()
  }, [projectBudPath, projectBudExists, budModulesExist, budModules])

  const [budFile, setBudFile] = useState(false)
  useEffect(() => {
    if (projectBudExists) {
      setBudFile(projectBud)
    }

    if (! projectBudExists && budModulesExist && budModules[0]) {
      setBudFile(budModules[0])
    }

    if (! projectBudExists && ! budModulesExist && rootBudExists && rootBud[0]) {
      setBudFile(rootBud[0])
    }
  }, [projectBudExists, projectBud, budModulesExist, budModules, rootBud, rootBudExists])

  return budFile ? (
    <BudCLI label={budFile.label} budFile={budFile} />
  ) : (
    <Text>
      <Color yellow>Loading..</Color>
    </Text>
  )
}

Generate.propTypes = {
  // Bud file name ([name].bud.js)
  budFileName: PropTypes.string,
}

Generate.positionalArgs = ['budFileName']

export default Generate
