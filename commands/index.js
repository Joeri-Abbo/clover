import {join, resolve} from 'path'
import React, {useContext, useState, useEffect} from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'

/** application */
import Bud from '../src/bud'
import {StateProvider, store} from '../src/bud/store'
import Banner from '../src/bud/components/Banner'

const cwd = process.cwd()
const budfile = resolve(__dirname, './../../src/budfiles/init/init.bud')
const strings = {
  title: 'Bud: WordPress CLI generator tooling',
}

/** Command: bud init */
/// Create a new project
const Init = ({projectDir}) => {
  const {state, dispatch} = useContext(store)

  useEffect(() => {
    projectDir &&
      dispatch({
        type: 'SET',
        key: 'writeDir',
        value: join(cwd, projectDir),
      })
  }, [projectDir])

  useEffect(() => {
    budfile &&
      dispatch({
        type: 'SET',
        key: 'budfile',
        value: budfile,
      })
  }, [budfile])

  const [sprout, setSprout] = useState(null)
  useEffect(() => {
    budfile && setSprout(require(budfile))
  }, [budfile])

  useEffect(() => {
    sprout &&
      dispatch({
        type: 'SET',
        key: 'sprout',
        value: sprout,
      })

    sprout &&
      sprout.description &&
      dispatch({
        type: 'SET',
        key: 'label',
        value: sprout.description,
      })
  }, [sprout])

  return (
    <Box marginTop={1} flexDirection={'column'}>
      <Banner label={state?.label || strings.title} />
      <Bud {...state} />
    </Box>
  )
}

/** Command: bud init */
/// Initialize a Bud project
const InitCLI = props => {
  return (
    <StateProvider>
      <Init {...props} />
    </StateProvider>
  )
}

InitCLI.propTypes = {
  /// Output directory
  projectDir: PropTypes.string,
}

InitCLI.positionalArgs = ['projectDir']

export default InitCLI
