import {join} from 'path'
import {existsSync} from 'fs-extra'

const useConfig = (): any => {
  const configFile = join(process.cwd(), '.clover/clover.config.json')
  const config = existsSync(configFile) ? require(configFile) : null

  return {config}
}

export default useConfig
