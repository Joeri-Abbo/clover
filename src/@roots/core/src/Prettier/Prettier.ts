import {parsers, Parser} from './parsers'
import prettier from 'prettier'

export class Prettier {
  public parsers = parsers

  public config: prettier.Options

  public constructor(config: prettier.Options) {
    this.config = config
  }
  public async infer(file: string): Promise<Parser> {
    const ext = file.split('.')[file.split('.').length - 1]

    return parsers[ext] ?? null
  }

  public format(content: any, parser: Parser) {
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }

    return prettier.format(content, {
      ...this.config,
      parser: this.parsers[parser] || 'babel',
    })
  }
}
