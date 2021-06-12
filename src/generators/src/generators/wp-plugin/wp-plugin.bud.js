module.exports = {
  name: 'wp-plugin',
  description: 'Generate a new plugin',
  prompts: [
    {
      type: 'input',
      name: 'proxyHost',
      message: 'Development URL',
      initial: 'acme.test',
      required: true,
    },
  ],
  tasks: [
    {
      task: 'ensureDirs',
      dirs: [
        'src/blocks',
        'src/components',
        'src/plugins',
        'resources/assets',
        'resources/languages',
      ],
    },
    {
      task: 'compile',
      src: 'README.md.hbs',
      dest: 'README.md',
      parser: 'markdown',
    },
    {
      task: 'compile',
      src: 'LICENSE.md.hbs',
      dest: 'LICENSE.md',
      parser: 'markdown',
    },
    {
      task: 'compile',
      src: 'plugin.php.hbs',
      dest: 'plugin.php',
    },
    {
      task: 'compile',
      src: 'composer.json.hbs',
      dest: 'composer.json',
      parser: 'json',
    },
    {
      task: 'compile',
      src: '.editorconfig',
      dest: '.editorconfig',
    },
    {
      task: 'compile',
      src: '.gitignore',
      dest: '.gitignore',
    },
    {
      task: 'compile',
      src: 'uninstall.php.hbs',
      dest: 'uninstall.php',
    },
    {
      task: 'compile',
      src: 'bud.config.js.hbs',
      dest: 'bud.config.js',
    },
    {
      task: 'copy',
      src: '.eslintrc.js.hbs',
      dest: '.eslintrc.js',
    },
    {
      task: 'copy',
      src: '.eslintignore',
      dest: '.eslintignore',
    },
    {
      task: 'compile',
      src: 'src/entry-editor.js.hbs',
      dest: 'src/entry-editor.js',
    },
    {
      task: 'compile',
      src: 'src/entry-public.js.hbs',
      dest: 'src/entry-public.js',
    },
    {
      task: 'compile',
      src: 'config/services.php.hbs',
      dest: 'config/services.php',
    },
    {
      task: 'compile',
      src: 'config/plugin.php.hbs',
      dest: 'config/plugin.php',
    },
    {
      task: 'compile',
      src: 'app/Plugin/Activate.php.hbs',
      dest: 'app/Plugin/Activate.php',
    },
    {
      task: 'compile',
      src: 'app/Plugin/Deactivate.php.hbs',
      dest: 'app/Plugin/Deactivate.php',
    },
    {
      task: 'compile',
      src: 'app/Services/Main.php.hbs',
      dest: 'app/Services/Main.php',
    },
    {
      task: 'compile',
      src: 'app/Services/Register.php.hbs',
      dest: 'app/Services/Register.php',
    },
    {
      task: 'json',
      file: 'package.json',
      merge: package => ({
        ...package,
        scripts: {
          ...package.scripts,
          dev: 'budpack --env development',
          build: 'budpack --env production',
        },
      }),
    },
    {
      task: 'addDependencies',
      repo: 'npm',
      dev: true,
      pkgs: ['@roots/budpack'],
    },
    {
      task: 'install',
      repo: 'packagist',
    },
  ],
}
