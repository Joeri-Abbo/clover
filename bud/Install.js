import execa from 'execa'

const Install = cwd => execa.commandSync('yarn', cwd).stdout

export default Install
