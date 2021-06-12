/**
 * Inspector Panel: Color Overlay
 */
module.exports = {
  name: 'wp-editor-panel-color-overlay',
  description: 'Inspector Panel: Color Overlay',
  tasks: [
    {
      action: 'compile',
      src: 'PanelColorOverlay.js.hbs',
      dest: 'src/components/PanelColorOverlay.js',
      parser: 'babel',
    },
    {
      action: 'addDependencies',
      repo: 'npm',
      pkgs: ['chroma-js'],
    },
  ],
}
