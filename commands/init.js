import {resolve} from 'path'
import React, {useContext, useEffect, useState} from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'

/** application */
import Bud from '../src/bud'
import {StateProvider, store} from '../src/bud/store'
import Banner from '../src/bud/components/Banner'

const initModule = resolve(__dirname, './../../src/budfiles/init/init.bud')

const strings = {
  title: 'Bud: WordPress CLI generator tooling',
}

/** Command: bud init */
/// Create a new project
const Init = ({projectDir}) => {
  const {state} = useContext(store)
  /**
   * Update the generator label.
   */
  const [label, setLabel] = useState(strings.title)
  useEffect(() => {
    state?.label && setLabel(state.label)
  }, [state?.label])

  return (
    <Box marginTop={1} flexDirection={'column'}>
      <Banner label={label} />
      <Box flexDirection={'column'} marginBottom={1}>
        <Bud
          outDir={projectDir}
          module={initModule}
          moduleReady={true}
        />
      </Box>
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
