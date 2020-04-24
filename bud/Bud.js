const { join } = require('path')
import React from 'react'
import Runner from './Runner'

/**
 * Block Runner
 *
 * @prop {collection} data         template data
 * @prop {string}     templatePath file path of template
 * @prop {string}     outputPath   file path of output file
 * @prop {string}     strategy     one of: 'literals'
 */
const Bud = ({ data, definition, output }) =>
  definition.files.map((file, id) =>
    <Runner
      key={id}
      data={data}
      definition={definition}
      templatePath={join(definition.path, file.readFrom)}
      outputPath={join(output, file.writeTo)}
      strategy={file.strategy}
      parser={file.parser}
    />
  )

export default Bud
