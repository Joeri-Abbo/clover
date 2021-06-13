import {Container} from '@roots/container'
import {Actions} from './actions'
import {Compiler} from './Compiler'
import {Config} from './Config'
import {Prettier} from './Prettier'

interface Clover {
  actions: Actions
  config: Config
  compiler: Compiler
  data: Container
  prettier: Prettier
}

class Clover {
  public actions: Actions

  public data: Container

  public compiler: Compiler

  public config: Config

  public prettier: Prettier

  public constructor() {
    this.actions = new Actions(this)
    this.config = new Config(process.cwd())
    this.prettier = new Prettier(this.config.prettier)
    this.data = new Container({})
    this.compiler = new Compiler()
  }

  public async generate(generator): Promise<void> {
    const src = await this.getGeneratorSrc(generator)

    src.register?.actions &&
      src.register.actions.forEach(action => {
        this.actions.register(action)
      })
  }

  public async getGeneratorSrc(
    generator: string,
  ): Promise<{[key: string]: any}> {
    return await import(generator)
  }
}

export {Clover}
