import React, {useState, useEffect} from 'react'
import {Box} from 'ink'
import globby from 'globby'
import Divider from 'ink-divider'

const cwd = process.cwd()

/** Command: generate list */
/// List available budfiles
const List = () => {
  /**
   * Budfile glob paths
   */
  const rootsBudsGlob = `${cwd}/node_modules/@roots/bud/src/budfiles/**/*.bud.js`
  const moduleBudsGlob = `${cwd}/node_modules/**/bud-plugin-*/*.bud.js`
  const projectBudsGlob = `${cwd}/.bud/**/*.bud.js`

  /**
   * Project buds
   */
  const [projectBuds, setProjectBuds] = useState([])
  useEffect(() => {
    projectBuds.length == 0 &&
      (async () => {
        const buds = await globby(projectBudsGlob)

        buds &&
          setProjectBuds(
            buds
              .map(bud => {
                const src = require(bud)
                return {
                  command: `yarn generate ${src.name}`,
                  source: 'project',
                  name: src.name,
                  description: src.description,
                }
              })
              .filter(bud => bud.name),
          )
      })()
  }, [])

  /**
   * Module buds
   */
  const [moduleBuds, setModuleBuds] = useState([])
  useEffect(() => {
    ;(async () => {
      const buds = await globby(moduleBudsGlob)

      buds &&
        setModuleBuds(
          buds
            .map(bud => {
              const src = require(bud)

              return {
                command: `yarn generate ${src.name}`,
                source: src.source ? src.source : null,
                name: src.name,
                description: src.description,
              }
            })
            .filter(bud => bud.name),
        )
    })()
  }, [])

  /**
   * Module buds
   */
  const [rootsBuds, setRootsBuds] = useState([])
  useEffect(() => {
    rootsBuds.length == 0 &&
      (async () => {
        const buds = await globby(rootsBudsGlob)

        buds &&
          setRootsBuds(
            buds
              .map(bud => {
                const src = require(bud)
                return src.name !== 'bud' && src.name !== 'init'
                  ? {
                      command: `yarn generate ${src.name}`,
                      source: '@roots/bud',
                      name: src.name,
                      description: src.description,
                    }
                  : {}
              })
              .filter(bud => bud.name),
          )
      })()
  }, [])

  const buds = [...projectBuds, ...rootsBuds, ...moduleBuds]

  /**
   * Render
   */
  return (
    <Box flexDirection="column" marginTop={1} marginBottom={1}>
      <Box flexDirection="row" flexGrow={1} justifyContent="flex-start">
        <Box width={40}>Command</Box>
        <Box width={40} marginLeft={1}>
          Source
        </Box>
        <Box width={20} marginLeft={1}>
          Name
        </Box>
      </Box>
      <Divider padding={0} width={100} />
      {buds.map((bud, id) => (
        <Box key={id} flexDirection="row" flexGrow={1} justifyContent="flex-start">
          <Box width={40}>{bud.command}</Box>
          <Box width={40} marginLeft={1}>
            {bud.source}
          </Box>
          <Box width={20} marginLeft={1}>
            {bud.name}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default List
