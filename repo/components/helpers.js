const execa = require('execa')
const globby = require('globby')
const fs = require('fs')
const path = require('path')
const nodeTree = require('tree-node-cli')

/**
 * Readme helpers
 */
module.exports = {
  /**
   * Convert an object's keys into a github-flavor list.
   *
   * @param {object} obj
   */
  listKeys: obj => {
    let list = ''

    Object.keys(obj).forEach(item => {
      list = item ? `${list}\n- ${item}` : list
    })

    return list
  },

  /**
   * Format a string as a github-flavor code block.
   *
   * @param {string} lang
   * @param {string} code
   */
  block: (lang, code) => `\`\`\`${lang}\n${code}\n\`\`\``,

  /**
   * Example plugin tree
   */
  pluginTree: () => {
    execa.commandSync('node ./build/cli --default --name=block --skip-install')

    const tree = nodeTree('bud-plugin', {
      allFiles: true,
      dirsFirst: true,
      reverse: true,
      exclude: [/node_modules/, /.\.lock/],
    })

    execa.commandSync('rm -rf ./bud-plugin')

    return tree
  },

  /**
   * Bud commands
   */
  commands: () => {
    const files = globby.sync(path.resolve(__dirname, '../../commands'), {
      expandDirectories: { extensions: ['js'] },
    })

    const signatures = files.map(file => {
      const command = fs.readFileSync(file, 'utf-8')
      return {
        dir: path.basename(path.dirname(file)),
        command: [...command.matchAll(/\/\*\* Command: (.*) \*\/\n/)][0][1],
        description: [...command.matchAll(/\/\/\/ (.*)\n/)][0][1],
      }
    })

    let output = ``
    signatures.forEach(sig => {
      output += `| \`${sig.command}\` | ${sig.description} |\n`
    })

    return output
  },
}
