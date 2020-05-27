/**
 * Config
 *
 * @param {string} projectDir
 */
const makeConfig = ({projectDir, templateDir, configData}) => ({
  projectDir,
  templateDir,
  ...configData,
  execa: {
    cwd: projectDir,
  },
})

export default makeConfig
