import {join} from 'path'
import {existsSync} from 'fs-extra'

/**
 * Use config
 */
const useConfig = cwd => {
  const configFile = join(cwd, '.clover/clover.config.json')
  const config = existsSync(configFile) ? require(configFile) : null

  return {config}
}

export default useConfig
