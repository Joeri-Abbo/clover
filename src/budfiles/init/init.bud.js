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
      callback: async (task, observer, bud) => {
        observer.next('Gathering WP info.')
        const config = bud.getConfig()

        const wordPress = require('path').resolve(process.cwd(), '../../')
        const isWordPress =
          (await bud.fs.exists(`${wordPress}/index.php`)) &&
          (await bud.fs.exists(`${wordPress}/wp-config.php`))

        !isWordPress
          ? observer.next('WordPress not detected.. moving on.')
          : (async () => {
              /** Backup index.php */
              await bud.fs.copyFile(
                `${wordPress}/index.php`,
                `${wordPress}/index.bak`,
              )

              /** Write tmp replacement for index.php */
              const {contents} = await bud.getTemplate('index.php.hbs')
              await bud.fs.writeFile(`${wordPress}/index.php`, contents)

              /** Request it */
              process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
              await bud
                .fetch(`${bud.data.protocol}://${bud.data.proxy}`)
                .then(res => res.json())
                .then(async function (json) {
                  if (json.bud == true && json.path) {
                    config.data.dev.path = json.path

                    await bud.fs.writeFile(
                      config.path,
                      bud.format(config.data, 'json'),
                    )
                  }
                })

              /** Restore original */
              await bud.fs.copyFile(
                `${wordPress}/index.bak`,
                `${wordPress}/index.php`,
              )

              /** Delete backup */
              await bud.fs.remove(`${wordPress}/index.bak`)
              observer.next(`Config file updated.`)
            })()

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
