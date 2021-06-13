import type {Actions} from './'

export function register(this: Actions, [handle, callback]) {
  this[handle] = callback
}
