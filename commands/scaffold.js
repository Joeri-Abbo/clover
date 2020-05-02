import {join} from 'path'
import React, {useState, useMemo} from 'react'
import {Box, Text} from 'ink'
import {prompt} from 'enquirer'
import {bud} from './../bud'

/** Command: bud scaffold */
/// Create a new component
const BudScaffold = ({src, ...props}) => {
  const [data, setData] = useState(null)
  const budFile = join(process.cwd(), `.bud/${src}.budfile.js`)
  const definition = require(budFile)

  useMemo(
    () =>
      !props.default
        ? prompt(definition.prompts).then(data => setData(data))
        : setData(definition.default),
    [],
  )

  return !data ? (
    <Box minHeight={2}>
      <Text>Bud: Create new Component</Text>
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

export default BudScaffold
