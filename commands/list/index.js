import React from 'react'
import {Box} from 'ink'

/** application */
import {StateProvider} from '../../src/bud/store'
import Banner from '../../src/bud/components/Banner'
import List from '../../src/bud/containers/List'

const cwd = process.cwd()

/**
 * Scaffold candidate locations
 */
const globs = {
  project: `${cwd}/.bud/budfiles/**/*.bud.js`,
  plugins: `${cwd}/node_modules/**/bud-plugin-*/**/*.bud.js`,
  core: `${cwd}/node_modules/@roots/bud/src/budfiles/**/**.bud.js`,
}

/**
 * List
 *
 * @prop {string} request
 */
const ListView = () => {
  return (
    <Box flexDirection={'column'}>
      <Banner label={'bud list'} />
      <List glob={[globs.project, globs.plugins, globs.core]} />
    </Box>
  )
}

/** Command: bud list */
/// List generators
const ListCLI = ({request}) => (
  <StateProvider>
    <ListView request={request} />
  </StateProvider>
)

export default ListCLI
