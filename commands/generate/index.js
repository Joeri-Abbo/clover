import React, {useContext, useState, useEffect} from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'

/** application */
import {store, StateProvider} from '../../src/bud/store'
import Bud from '../../src/bud'
import Banner from '../../src/bud/components/Banner'
import Search from '../../src/bud/containers/Search'

const cwd = process.cwd()

/**
 * Scaffold candidate locations
 */
const globs = {
  project: search => `${cwd}/.bud/budfiles/${search}/*.bud.js`,
  plugins: search => `${cwd}/node_modules/**/bud-plugin-*/${search}/*.bud.js`,
  core: search => `${cwd}/node_modules/@roots/bud/src/budfiles/**/${search}.bud.js`,
}

/**
 * Generate
 *
 * @prop {string} request
 */
const Generate = ({request}) => {
  const {dispatch, state} = useContext(store)
  const [budfile, setBudfile] = useState(null)
  useEffect(() => {
    state && setBudfile(
      state?.search?.project?.complete && state.search.project.results.length > 0 ? state.search.project.results[0] :
      state?.search?.plugins?.complete && state.search.plugins.results.length > 0 ? state.search.plugins.results[0] :
      state?.search?.core?.complete    && state.search.core.results.length > 0 ? state.search.core.results[0] :
      null
    )
  }, [state])

  useEffect(() => {
    dispatch({
      type: 'SET_DATA',
      data: require(`${cwd}/.bud/bud.config.json`).project,
    })

    budfile && dispatch({
      type: 'SET',
      key: 'budfile',
      value: budfile,
    })
  }, [budfile])

  useEffect(() => {
    dispatch({
      type: 'SET',
      key: 'writeDir',
      value: cwd,
    })
  }, [cwd])


  const [sprout, setSprout] = useState(null)
  useEffect(() => {
    budfile && setSprout(require(budfile))
  }, [budfile])

  useEffect(() => {
    sprout && dispatch({
      type: 'SET',
      key: 'sprout',
      value: sprout,
    })

    sprout?.description && dispatch({
      type: 'SET',
      key: 'label',
      value: sprout.description,
    })

    sprout && !sprout.prompts && dispatch({
      type: 'SET',
      key: 'ready',
      value: true,
    })
  }, [sprout])

  return (
    <Box flexDirection={'column'}>
      <Banner label={`bud generate ${request}`} />
      <Search label="project" glob={[globs.project(request)]} />
      <Search label="plugins" glob={[globs.plugins(request)]} />
      <Search label="core" glob={[globs.core(request)]} />
      <Bud {...state} />
    </Box>
  )
}

/** Command: bud generate */
/// Generate project functionality
const GenerateCLI = props => (
  <StateProvider>
    <Box>
      <Generate {...props} />
    </Box>
  </StateProvider>
)

GenerateCLI.propTypes = {
  // Requested generator
  request: PropTypes.string,
}

GenerateCLI.positionalArgs = ['request']

export default GenerateCLI
