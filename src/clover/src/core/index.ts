import makeCompiler from './compiler'
import makeConfig from './config'
import makeData from './data'
import {makeUtil} from './util'
import actions from './actions'
import prettier from './prettier'

interface Loose {
  [key: string]: any
}

class Clover {
  public actions

  public config

  public data

  public util

  public compiler

  public generator

  public projectDir

  public constructor({config, generator, projectDir, data}: Loose) {
    this.generator = generator
    this.projectDir = projectDir

    this.config = makeConfig({config, projectDir})
    this.data = makeData({config, data, generator})
    this.util = makeUtil({config})
    this.compiler = makeCompiler({generator, data})
  }

  public generate(): void {
    this.generator.registerActions &&
      this.generator.registerActions.forEach(action => {
        actions.register({action})
      })

    const props = {
      config: this.config,
      data: this.data,
      actions: this.actions,
      compiler: this.compiler,
      prettier,
      util: this.util,
      generator: this.generator,
      projectDir: this.projectDir,
    }

    console.log(props)
  }
}

export {Clover}
