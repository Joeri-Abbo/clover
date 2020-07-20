import path from 'path'
import {useState, useEffect} from 'react'
import findPlugins from 'find-plugins'
import globby from 'globby'

const cwd = process.cwd()

/**
 * Process globby matches into expected object
 */
const fromMatches = matches =>
  matches.map(generator => ({
    name: path.basename(generator).replace('.clover.js', ''),
    path: generator,
  }))

/**
 * Generators sourced from project .clover dir
 */
const useProjectGenerators = () => {
  const [generators, setGenerators] = useState([])
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    ;(async () => {
      setChecked(false)

      const matches = await globby([
        `${cwd}/.clover/generators/**/*.clover.js`,
      ])

      setGenerators(fromMatches(matches))
      setChecked(true)
    })()
  }, [])

  return [generators, checked]
}

/**
 * Generators sourced from node_modules
 *
 * @param {string} keyword package.json keywords match
 */
const useModuleGenerators = keyword => {
  const [generators, setGenerators] = useState([])
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    ;(async () => {
      setChecked(false)

      const packages = findPlugins({
        dir: path.resolve(path.join(cwd, 'node_modules')),
        scanAllDirs: true,
        keyword,
      }).map(plugin =>
        path.join(plugin.dir, '/generators/**/*.clover.js'),
      )

      const matches = await globby([
        ...packages,
        '!/**/*.preset.clover.js',
      ])

      setGenerators(fromMatches(matches))
      setChecked(true)
    })()
  }, [keyword])

  return [generators, checked]
}

/**
 * useGenerators hook
 */
const useGeneratorIndex = () => {
  const [project, checkedProject] = useProjectGenerators()
  const [core, checkedCore] = useModuleGenerators(
    'clover-core-generators',
  )
  const [plugin, checkedPlugin] = useModuleGenerators('clover-generator')

  return {
    project,
    plugin,
    core,
    status: {
      project: checkedProject,
      plugin: checkedPlugin,
      core: checkedCore,
    },
    complete: checkedCore && checkedProject && checkedPlugin,
  }
}

export default useGeneratorIndex
export {useProjectGenerators, useModuleGenerators}
