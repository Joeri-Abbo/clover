import Base from '@oclif/command'
import {Clover} from '@roots/clover-core'

abstract class Command extends Base {
  public features: {
    [key: string]: any
  }

  public clover: Clover

  public async init() {
    this.clover = new Clover()
  }
}

export default Command
