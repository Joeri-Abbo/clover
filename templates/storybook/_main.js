/**
 * Storybook config
 */
module.exports = {
  stories: [
    '../resources/assets/scripts/blocks/**/*.stories.js',
  ],
  addons: [
		'@storybook/addon-knobs',
		'@storybook/addon-storysource',
		'@storybook/addon-viewport',
		'@storybook/addon-a11y',
  ],
  webpackFinal: async config => config,
}
