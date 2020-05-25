import React from 'react'
import {Box} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

/** application */
import {StateProvider} from '../../src/bud/store'
import Banner from '../../src/bud/components/Banner'
import List from '../../src/bud/containers/List'

/**
 * Scaffold candidate locations
 */
const globs = {
  project: `${process.cwd()}/.bud/budfiles/**/*.bud.js`,
  plugins: `${process.cwd()}/node_modules/**/bud-plugin-*/**/*.bud.js`,
  core: `${process.cwd()}/node_modules/@roots/bud/src/budfiles/**/**.bud.js`,
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
      <List glob={[
        globs.project,
        globs.plugins,
        globs.core,
      ]} />
    </Box>
  )
}

/** Command: bud list */
/// List generators
const ListCLI = ({request}) => {
  const [width, height] = useStdOutDimensions()

  return (
    <StateProvider>
      <Box width={width} height={height-5}>
        <ListView request={request} />
      </Box>
    </StateProvider>
  )
}

export default ListCLI
