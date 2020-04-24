const execa = require('execa')
const globby = require('globby')
const fs = require('fs')
const path = require('path')

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
    execa.commandSync('bud plugin new --default')
    const tree = execa.commandSync('tree --dirsfirst -a -r bud-plugin').stdout

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
      const name = path.basename(file, '.js')

      return {
        dir: path.basename(path.dirname(file)),
        description: [...command.matchAll(/\/\/\/ (.*)\n/)][0][1],
      }
    })

    let output = ``
    signatures.forEach(sig => {
      output += `| \`bud\` | ${sig.description} |\n`
    })

    return output
  },
}
