import React, {useContext, useEffect, useState} from 'react'
import {Box, Color, Text} from 'ink'
import PropTypes from 'prop-types'

/** application */
import Bud from '../../src/components/Bud'
import {StateProvider, store} from '../../src/components/store'
import Banner from '../../src/components/components/Banner'
import Search from '../../src/components/containers/Search'

/**
 * Constants
 */
const strings = {
  title: 'Bud: WordPress CLI generator tooling',
  searchText: '🔎  Searching..',
  noResults: '💢  No results found.',
  searchSuccess: '🎉  Generator found',
}

/**
 * Scaffold candidate locations
 */
const globs = {
  project: search => `${process.cwd()}/.bud/budfiles/${search}/*.bud.js`,
  plugins: search => `${process.cwd()}/node_modules/**/bud-plugin-*/${search}/*.bud.js`,
  core: search => `${process.cwd()}/node_modules/@roots/bud/src/budfiles/**/${search}.bud.js`,
}

/**
 * Generate
 *
 * @prop {string} request
 */
const Generate = ({request}) => {
  const {state} = useContext(store)
  /**
   * Update the generator label.
   */
  const [label, setLabel] = useState(strings.title)
  useEffect(() => {
    state?.label && setLabel(state.label)
  }, [state?.label])

  /**
   * Determine if generator is ready for next step.
   */
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    const complete =
      state?.search?.project?.complete &&
      state?.search?.plugins?.complete &&
      state?.search?.core?.complete
    setComplete(complete ? complete : false)
  }, [state])

  /**
   * Update the module to be utilized.
   */
  const [module, setModule] = useState(false)
  useEffect(() => {
    const module =
      state?.search?.project?.results ||
      state?.search?.plugins?.results ||
      state?.search?.core?.results

    setModule(module ? module : false)
  }, [state])

  return (
    <Box marginTop={1} flexDirection={'column'}>
      <Banner label={label} />
      <Box flexDirection={'column'} marginBottom={1}>
        {module && <Text>{strings.searchSuccess}</Text>}

        {!complete && !module && (
          <Text>
            <Color yellow>{strings.searchText}</Color>
          </Text>
        )}

        {complete && !module && (
          <Text>
            <Color red>{strings.noResults}</Color>
          </Text>
        )}
      </Box>

      <Search label="project" glob={[globs.project(request)]} />

      <Search label="plugins" glob={[globs.plugins(request)]} />

      <Search label="core" glob={[globs.core(request)]} />

      <Bud module={module} moduleReady={complete} />
    </Box>
  )
}

/** Command: bud generate */
/// Generate project functionality
const GenerateCLI = ({request}) => {
  return (
    <StateProvider>
      <Generate request={request} />
    </StateProvider>
  )
}

GenerateCLI.propTypes = {
  // Requested generator
  request: PropTypes.string,
}

GenerateCLI.positionalArgs = ['request']

export default GenerateCLI
