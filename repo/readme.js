#!/usr/bin/env node

const { resolve } = require('path')
const { writeFileSync } = require('fs')
const { format } = require('prettier')

/** Util */
const { block, listKeys, pluginTree, commands } = require('./components/helpers')

/** Data */
const { name, license, dependencies, devDependencies, engines } = require('./../package.json')

/** Target */
const readme = resolve(__dirname, '../README.md')

/**
 * README contents.
 */
writeFileSync(
  readme,
  format(
    `
# 🌱 ${name}

![License: ${license}](https://img.shields.io/github/license/${name}?color=%23525ddc&style=flat-square)
![GitHub release](https://img.shields.io/github/release/${name}?color=%23525ddc&style=flat-square)

> ## A command-line interface (CLI) for the WordPress block editor.

Scaffold new Gutenberg features with the \`bud\` command.

## Requirements

| Requirement | Version |
| ---- | --- |
| PHP  | >=7.1 |
| Node | ${engines.node} |

## Usage

| Command | Description |
| --- | --- |
${commands()}

## Generated files

A typical block that was created with Bud has the following structure:

${block('sh', pluginTree())}

### Plugin Dependencies

${listKeys(dependencies)}

### Development dependencies

${listKeys(devDependencies)}

## Roadmap

- \`HMR\`
- \`bud component\`
- \`bud extension\`

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV"><img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150"></a> <a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"></a> <a href="https://nestify.io/?utm_source=roots&utm_medium=banner&utm_campaign=footer"><img src="https://cdn.roots.io/app/uploads/nestify.svg" alt="Nestify" width="200" height="150"></a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)

`,
    { parser: 'markdown' },
  ),
  'utf8',
)
