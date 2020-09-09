import React, {useEffect, useState} from 'react'
import {isEqual} from 'lodash'
import SelectInput from 'ink-select-input'

import App from '../../components/App'
import GeneratorMiddleware from '../../middleware/GeneratorMiddleware'
import useGenerators from '../../hooks/useGenerators'

const Generate = ({name, output}) => {
  const [generators, complete] = useGenerators()
  const [generatorMap, setGeneratorMap] = useState([])
  useEffect(() => {
    setGeneratorMap(
      Object.entries(generators).reduce(
        (generatorMap, [name, generator]: [string, any]) => [
          ...generatorMap,
          {
            label: name,
            value: [generator.file, generator.obj],
          },
        ],
        [],
      ),
    )
  }, [generators])

  /**
   * If the user passed a name as an argument, filter the generators
   * with that value.
   */
  const [selection, setSelection] = useState(null)
  useEffect(() => {
    const candidates = Object.entries(generators)
      ?.filter(generator => isEqual(generator[0], name))
      .pop()

    const isReady = name && generators && complete

    // eslint-disable-next-line
    isReady && setSelection([candidates?.[0], require(candidates?.[0])])
  }, [complete, generators, name])

  /**
   * Generators are considered loading when there are
   * no resolved generators and no selection
   */
  const isLoading = !generators && !selection

  /**
   * Display search when:
   *  - no particular generator was specified,
   *  - there are generators to display
   *  - no selection has yet been made.
   */
  const displaySearch = !name && generators && !selection

  /**
   * Display the search field, and once a selection has been made
   * run the generator middleware on the selected generator.
   */
  return (
    <App isLoading={isLoading}>
      {displaySearch && (
        <SelectInput
          items={generatorMap}
          onSelect={selection => setSelection(selection)}
        />
      )}

      {selection?.value && (
        <GeneratorMiddleware
          output={output}
          file={selection.value[0]}
          generator={selection.value[1]}
        />
      )}
    </App>
  )
}

export default Generate
