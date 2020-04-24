const got = require('got');

/**
 * Templating utilities
 *
 * @param {string} package
 */
module.exports = {
  getLatest: async packageName => {
    try {
      const pkg = await got(packageName, {
        prefixUrl: `https://registry.npmjs.com`,
        resolveBodyOnly: true,
      }).json()

      return await pkg['dist-tags'].latest;
    } catch (err) {
      return err;
    }
  },
}
