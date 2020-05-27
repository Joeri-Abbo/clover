module.exports = {
  name: 'bud',
  description: 'Initialize a new project',
  prompts: [
    {
      type: 'input',
      name: 'namespace',
      message: 'Project namespace',
      initial: 'acme-co',
      required: true,
    },
    {
      type: 'input',
      name: 'name',
      message: 'Project name',
      initial: 'acme-project',
      required: true,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description',
      initial: 'Anvil drop-shipping application',
    },
    {
      type: 'input',
      name: 'website',
      message: 'Project website',
      initial: 'https://acme.co',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name',
      initial: 'Wiley C.',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Author email',
      initial: 'wiley@gmail.com',
    },
  ],
  tasks: [
    {
      action: 'compile',
      src: '.bud/bud.config.json.hbs',
      dest: '.bud/bud.config.json',
      parser: 'json',
    },
    {
      action: 'compile',
      src: 'package.json.hbs',
      dest: 'package.json',
      parser: 'json',
    },
    {
      action: 'copy',
      src: '.bud/budfiles/example/example.bud.js.hbs',
      dest: '.bud/budfiles/example/example.bud.js',
    },
    {
      action: 'copy',
      src: '.bud/budfiles/example/templates/Component.js.hbs',
      dest: '.bud/budfiles/example/templates/Component.js.hbs',
    },
    {
      action: 'install',
      repo: 'npm',
    },
  ],
}
