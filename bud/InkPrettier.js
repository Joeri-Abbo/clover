import prettier from 'prettier'
import bud from './../bud.config'

/**
 * Prettier
 *
 * @prop {string} language  language to prettify
 * @prop {bool}   stringify should stringify
 * @prop {fn}     children  react children
 */
const Prettier = ({ parser, contents }) => prettier.format(contents, { ...bud.prettier, parser })

export default Prettier
