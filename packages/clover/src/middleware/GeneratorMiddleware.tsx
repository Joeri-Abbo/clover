import React, {FunctionComponent} from 'react'

import useConfig from '../hooks/useConfig'
import useData from '../hooks/useData'
import useSubscription from '../hooks/useSubscription'

import Task from '../components/Task'

interface Props {
  generator: any
  file: string
  output: string
}

type GeneratorMiddlewareLayer = FunctionComponent<Props>
const GeneratorMiddleware: GeneratorMiddlewareLayer = ({
  generator,
  file,
  output,
}) => {
  const {config} = useConfig()
  const {data} = useData(generator)
  const {status, complete} = useSubscription({
    config,
    data,
    generator,
    file,
    projectDir: output,
  })

  return <Task status={status} complete={complete} />
}

export default GeneratorMiddleware
