import { Write, Read } from './IO'
import Prettier from './InkPrettier'
import React from 'react'
import { Text } from 'ink'
const collect = require('collect.js')

/**
 * Block
 *
 * @prop {collection} data
 * @prop {string}     templatePath
 * @prop {string}     outputPath
 * @prop {string}     strategy
 */
const Runner = ({ data, definition, templatePath, outputPath, strategy, parser }) => {
  !(async () => {
    return await (async () => {
      if (strategy == 'literals') {
        Write({
          path: outputPath,
          contents: Prettier({
            parser,
            contents: require(templatePath)(collect(data)),
          }),
        })
      }

      if (strategy == 'copy') {
        Write({
          path: outputPath,
          contents: Read({
            path: templatePath,
          }),
        })
      }

      if (strategy == 'json') {
        try {
          const contents = Prettier({
            parser: 'json',
            contents: JSON.stringify({
              ...require(templatePath),
              name: data.name,
              description: data.description,
              devDependencies: await definition.devDependencies(),
            }),
          })

          Write({ path: outputPath, contents })
        } catch (err) {
          console.error(err)
        }
      }
    })()
  })()

  return (
    <Text>{`[${data.name}]${outputPath.split('/').slice(outputPath.split('/').length - 1)}`}</Text>
  )
}

export default Runner
