/**
 * Config
 *
 * @param {string} projectDir
 */
const makeConfig = ({projectDir, templateDir, config}) => ({
  projectDir,
  templateDir,
  ...config,
  execa: {
    cwd: projectDir,
  },
})

export default makeConfig
