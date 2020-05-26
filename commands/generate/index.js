import React, {useContext, useState, useEffect} from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'

/** application */
import {store, StateProvider} from '../../src/bud/store'
import Bud from '../../src/bud'
import Banner from '../../src/bud/components/Banner'
import Search from '../../src/bud/containers/Search'

/**
 * Current working dir needs to be set outside of React.
 */
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
 * Generate command
 *
 * bud generate [budfile]
 *
 * @prop {string} request
 */
const Generate = ({request}) => {
  const {dispatch, state} = useContext(store)

  /**
   * Once we have state we start looking for budfiles being stashed
   * from the Search component.
   *
   * We'll select a budfile from matches in order of domain-specificity.
   *
   * 1. Project ('./.bud/budfiles/..)
   * 2. Plugins ('./node_modules/..)
   * 3. Core budfiles.
   */
  const [budfile, setBudfile] = useState(null)
  useEffect(() => {
    state &&
      setBudfile(
        state?.search?.project?.complete && state.search.project.results.length > 0
          ? state.search.project.results[0]
          : state?.search?.plugins?.complete && state.search.plugins.results.length > 0
          ? state.search.plugins.results[0]
          : state?.search?.core?.complete && state.search.core.results.length > 0
          ? state.search.core.results[0]
          : null,
      )
  }, [state])

  useEffect(() => {
    /**
     * Prepopulate data with the contents of the bud.config.js project
     * key. This prevents people from having
     * to answer the same boilerplate questions repeatedly.
     */
    dispatch({
      type: 'SET_DATA',
      data: require(`${cwd}/.bud/bud.config.json`).project,
    })

    /**
     * Set the budfile to the store as soon as we have some sort of resolution
     * from search.
     */
    budfile &&
      dispatch({
        type: 'SET',
        key: 'budfile',
        value: budfile,
      })
  }, [budfile])

  /**
   * Set the write directory to
   * the package root.
   */
  useEffect(() => {
    dispatch({
      type: 'SET',
      key: 'writeDir',
      value: cwd,
    })
  }, [cwd])

  /**
   * Handle sprouts (budfile objects)
   */
  const [sprout, setSprout] = useState(null)
  useEffect(() => {
    budfile && setSprout(require(budfile))
  }, [budfile])

  useEffect(() => {
    /**
     * Once we have a sprout, stash it in the store.
     */
    sprout &&
      dispatch({
        type: 'SET',
        key: 'sprout',
        value: sprout,
      })

    /**
     * Set the CLI label to the
     * value set in the Budfile.
     */
    sprout?.description &&
      dispatch({
        type: 'SET',
        key: 'label',
        value: sprout.description,
      })

    /**
     * Normally, enquirer marks a sprout as ready
     * for scaffolding once all the prompts have
     * been answered. But, if there is a sprout
     * but no apparent prompts then we'll need to do
     * this or else it'll hang forever waiting for a
     * ready state which will never arrive.
     */
    sprout &&
      !sprout.prompts &&
      dispatch({
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
