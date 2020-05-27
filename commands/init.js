import {resolve} from 'path'
import React, {useState, useEffect} from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'
import Spinner from 'ink-spinner'

import BudCLI from './../src/components/BudCLI'

/** Constants */
const budfileDir = resolve(__dirname, './../../src/budfiles/init')

/** Command: bud init */
/// Create a new project
const Init = props => {
  const [projectDir] = useState(props.projectDir)
  const [budfile, setBudfile] = useState(null)
  const [templateDir, setTemplateDir] = useState(null)
  useEffect(() => {
    if (budfileDir) {
      setBudfile(`${budfileDir}/init.bud`)
      setTemplateDir(`${budfileDir}/templates`)
    }
  }, [budfileDir])

  const [sprout, setSprout] = useState(null)
  useEffect(() => {
    budfile && setSprout(require(budfile))
  }, [budfile])

  const [label, setLabel] = useState('Bud CLI')
  useEffect(() => {
    sprout && setLabel(sprout.label)
  }, [sprout])

  return sprout ? (
    <BudCLI
      label={label}
      outDir={projectDir || ''}
      sprout={sprout}
      templateDir={templateDir}
    />
  ) : (
    <Box>
      <Spinner /> Loading
    </Box>
  )
}

Init.propTypes = {
  /// Output directory
  projectDir: PropTypes.string,
}

Init.defaultProps = {
  budfileDir: budfileDir,
}

Init.positionalArgs = ['projectDir']

export default Init
