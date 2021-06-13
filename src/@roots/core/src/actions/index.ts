import {sh} from './sh'
import {compile} from './compile'
import {copy} from './copy'
import {ensureDir} from './ensureDir'
import {clone} from './clone'
import {json} from './json'
import {touch} from './touch'
import {register} from './register'
import {Clover} from '../Clover'
import {boundClass} from 'autobind-decorator'

interface Actions {
  [key: string]: any
  clone: typeof clone
  compile: typeof compile
  copy: typeof copy
  ensureDir: typeof ensureDir
  json: typeof json
  sh: typeof sh
  touch: typeof touch
  register: typeof register
}

@boundClass
class Actions {
  protected _clover: () => Clover

  public get clover(): Clover {
    return this._clover()
  }

  public constructor(clover: Clover) {
    this._clover = () => clover
  }

  public clone = clone

  public compile = compile

  public copy = copy

  public ensureDir = ensureDir

  public json = json

  public sh = sh

  public touch = touch

  public register = register
}

export {Actions}
