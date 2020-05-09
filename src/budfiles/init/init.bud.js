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
    {
      type: 'input',
      name: 'proxy',
      message: 'Proxy hostname',
      initial: 'sage-app.test',
    },
    {
      type: 'select',
      name: 'protocol',
      message: 'What protocol are you using in development?',
      initial: 'https',
      choices: ['https', 'http'],
    },
    {
      type: 'input',
      name: 'port',
      message: 'Live reload port',
      initial: 3000,
    },
  ],
  registerActions: [
    {
      handle: 'env',
      callback: async (task, observer, {fs, fetch, format, projectDir, data}) => {
        const config = {
          path: `${process.cwd()}/${projectDir}/.bud/bud.config.json`,
          obj: require(`${process.cwd()}/${projectDir}/.bud/bud.config.json`),
        }
        const wordPress = require('path').resolve(process.cwd(), '../../')

        const isWordPress =
          await fs.exists(`${wordPress}/index.php`)
            && fs.exists(`${wordPress}/wp-config.php`)

        isWordPress && (async () => {
          await fs.copyFile(`${wordPress}/index.php`, `${wordPress}/index.bak`)
          await fs.writeFile(`${wordPress}/index.php`, `\
  <?php
  require __DIR__ . '/wp/wp-blog-header.php';
  print json_encode((object) [
    'bud' => true,
    'path' => str_replace(__DIR__ . '/', '', WP_PLUGIN_DIR),
  ]);
  die();
  `)
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
          await fetch(`${data.protocol}://${data.proxy}`)
            .then(res => res.json())
            .then(async function(json) {
              if (json.bud == true && json.path) {
                config.obj.dev.dir = json.path
                this.projectUriIdentified = true
                await fs.writeFile(config.path, format(config, 'json'))
              }
            })

          await fs.copyFile(`${wordPress}/index.bak`, `${wordPress}/index.php`)
          await fs.remove(`${wordPress}/index.bak`)
        })()

        observer.next(`Config file updated.`)
        observer.complete()
      },
    },
  ],
  actions: [
    {
      action: 'scaffold',
      paths: [
        '.bud',
        '.bud/budfiles',
        '.bud/budfiles/example',
        '.bud/budfiles/example/templates',
      ],
    },
    {
      action: 'template',
      template: 'bud.config.json.hbs',
      path: '.bud/bud.config.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: 'package.json.hbs',
      path: 'package.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: 'budfiles/example/example.bud.js.hbs',
      path: '.bud/budfiles/example/example.bud.js',
    },
    {
      action: 'template',
      template: 'budfiles/example/templates/Component.js.hbs',
      path: '.bud/budfiles/example/templates/Component.js.hbs',
    },
    {
      action: 'env',
    },
  ],
}
