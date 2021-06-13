import handlebars from 'handlebars'
import {helpers} from './helpers'

import type {HelperDelegate} from 'handlebars'

interface Compiler {
  instance: typeof handlebars

  getHelpers(data): [string, HelperDelegate][]

  compile(
    template: string,
    data: Handlebars.RuntimeOptions['data'],
  ): string
}

class Compiler {
  public instance: typeof handlebars

  public constructor() {
    this.instance = handlebars
  }

  public getHelpers(data): [string, HelperDelegate][] {
    return helpers(data)
  }

  public compile(
    template: string,
    options: Handlebars.RuntimeOptions,
  ): string {
    this.getHelpers(options.data).forEach(h =>
      this.instance.registerHelper(...h),
    )

    this.instance = this.instance.create()

    return this.instance.compile(template)(options.data)
  }
}

export {Compiler}
