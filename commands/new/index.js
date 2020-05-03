import {join} from 'path'
import React, {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Box, Text} from 'ink'
import {prompt} from 'enquirer'
import {bud} from './../../src/bud'

/** Command: bud new */
/// Scaffold functionality from a budfile
const New = props => {
  const budFile = join(process.cwd(), `.bud/${props.budFile}.budfile.js`)
  const definition = require(budFile)

  const [data, setData] = useState(null)
  useMemo(
    () =>
      !definition.data
        ? prompt(definition.prompts).then(data => setData(data))
        : setData(definition.data),
    [],
  )

  const name = budFile.split('/')[budFile.split('/').length - 1]

  return !data ? (
    <Box>
      <Text>{`
        Make new ${name}
      `}</Text>
    </Box>
  ) : (
    [
      bud
        .init({
          data,
          budFile,
          skipInstall: props.skipInstall,
        })
        .actions(),
    ]
  )
}

New.propTypes = {
  /// budfile
  budFile: PropTypes.string,
  /// Skip package installation
  skipInstall: PropTypes.bool,
}

New.positionalArgs = ['budFile']

New.defaultProps = {
  skipInstall: false,
}

export default New
