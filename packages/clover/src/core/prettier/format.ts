import prettier from 'prettier'
import config from './config'

const format = (content, parser) => {
  content =
    typeof content !== 'string' ? JSON.stringify(content) : content

  return prettier.format(content, {
    ...config,
    parser: parser || 'babel',
  })
}

export default format
