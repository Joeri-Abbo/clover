import {resolve} from 'path'
import React, {useState, useMemo} from 'react'
import {Box, Text} from 'ink'
import {prompt} from 'enquirer'
import {bud} from './../../bud'

/** Command: bud component */
/// Create a new component
const BudComponentNew = props => {
  const [data, setData] = useState(null)

  const budFile = resolve(__dirname, './../../../templates/component-media-upload/component.bud.js')
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

export default BudComponentNew
