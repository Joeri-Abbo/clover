import path from 'path'
import {useState, useEffect} from 'react'
import globby from 'globby'

const cwd = process.cwd()

const fromMatches = (matches: string[]) =>
  matches.reduce((aggregate, generator) => {
    const name = generator.replace('.js', '').split('/').pop()
    // eslint-disable-next-line
    const obj = require(generator)

    return {
      ...aggregate,
      [name]: {obj, file: generator},
    }
  }, {})

const useGenerators = (): [any, boolean] => {
  const [generators, setGenerators] = useState({})
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    ;(async () => {
      setChecked(false)

      const matches = await globby([
        path.resolve(cwd, '.clover/generators/**/*.clover.js'),
      ])

      const generators = fromMatches(matches)

      setGenerators(generators)
      setChecked(true)
    })()
  }, [])

  return [generators, checked]
}

export {useGenerators as default}
