import type Prettier from 'prettier'

export class Config {
  public projectDir: string

  public templateDir: string

  public prettier: Prettier.Options = {
    bracketSpacing: false,
    tabWidth: 2,
    printWidth: 70,
    singleQuote: true,
    jsxBracketSameLine: true,
    useTabs: false,
    semi: false,
  }

  public constructor(dir: string) {
    this.projectDir = dir
    this.templateDir = dir
  }

  public get execa() {
    return {
      cwd: this.projectDir,
    }
  }
}
