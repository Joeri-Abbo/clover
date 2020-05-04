import {resolve, join} from 'path'
import {existsSync} from 'fs'
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Color, Text} from 'ink'
import BudCLI from '../src/components/BudCLI'

/** Command: bud generate */
/// Generate code described by a budfile
const Generate = props => {
  if (!props.budFileName) {
    return (
      <Text>
        <Color red>You must specify a valid budfile.</Color>
      </Text>
    )
  }

  const budDir = join(process.cwd(), '.bud')
  const projectFilePath = join(budDir, `${props.budFileName}.budfile.js`)
  const budFilePath = join(budDir, `${props.budFileName}.budfile.js`)

  if (!existsSync(projectFilePath)) {
    return (
      <Box flexDirection="column" width={50}>
        <Text>
          <Color red>{`Budfile not found.`}</Color>
        </Text>
        <Text textWrap="truncate-end">{`${
          budFilePath.split('/')[budFilePath.split('/').length]
        } doesn't appear to be valid`}</Text>
      </Box>
    )
  }

  const budFile = resolve(budFilePath)

  return <BudCLI label={require(budFile).label} budFile={require(budFile)} />
}

Generate.propTypes = {
  // Bud file name ([name].bud.js)
  budFileName: PropTypes.string,
}

Generate.positionalArgs = ['budFileName']

export default Generate
