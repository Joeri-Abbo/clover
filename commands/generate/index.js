import {join, resolve} from 'path'
import React, {useState, useEffect} from 'react'
import {Text, Color, Box} from 'ink'
import Table from 'ink-table'
import BudCLI from '../../src/components/BudCLI'
import globby from 'globby'

/**
 * Budfile glob paths
 */
const rootsBudsGlob = resolve(__dirname, `../../../src/budfiles/**/*.bud.js`)

const moduleBudsGlob = join(
  process.cwd(),
  `node_modules/**/bud-plugin-*/**/*.bud.js`,
)
const projectBudsGlob = join(process.cwd(), `.bud/budfiles/**/*.bud.js`)

/** Command: bud generate */
/// List available budfiles
const GenerateIndex = () => {
  /**
   * Project buds
   */
  const [projectBuds, setProjectBuds] = useState([])
  useEffect(() => {
    ;(async () => {
      const buds = await globby([projectBudsGlob])

      buds &&
        setProjectBuds(
          buds.map(bud => {
            const src = require(bud)
            return {
              command: `bud generate ${src.name}`,
              source: 'project',
              name: src.name,
              description: src.description,
            }
          }),
        )
    })()
  }, [])

  /**
   * Module buds
   */
  const [moduleBuds, setModuleBuds] = useState([])
  useEffect(() => {
    ;(async () => {
      const buds = await globby([moduleBudsGlob])

      buds &&
        setModuleBuds(
          buds.map(bud => {
            const src = require(bud)
            return {
              command: `bud generate ${src.name}`,
              source: 'plugin',
              name: src.name,
              description: src.description,
            }
          }),
        )
    })()
  }, [])

  /**
   * Module buds
   */
  const [rootsBuds, setRootsBuds] = useState([])
  useEffect(() => {
    ;(async () => {
      const buds = await globby([rootsBudsGlob])

      buds &&
        setRootsBuds(
          buds
            .map(bud => {
              const src = require(bud)
              return src.name !== 'bud' && src.name !== 'init'
                ? {
                    command: `bud generate ${src.name}`,
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

  /**
   * Render
   */
  return (
    <BudCLI label={'bud generate'} inert={true}>
      <Box flexDirection="column" marginTop={1} marginBottom={1}>
        <Box marginBottom={1}>
          <Text>
            <Color green>Budfiles available:</Color>
          </Text>
        </Box>
        <Box
          width={200}
          flexDirection="column"
          flexGrow={1}
          justifyContent="space-between">
          <Table
            width={200}
            data={[...projectBuds, ...rootsBuds, ...moduleBuds]}
          />
        </Box>
      </Box>
    </BudCLI>
  )
}

export default GenerateIndex
