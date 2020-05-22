module.exports = {
  name: 'docker',
  description: 'A containerized Bedrock instance',
  prompts: [],
  actions: [
    {
      action: 'template',
      template: 'docker-compose.yml.hbs',
      path: 'docker-compose.yml',
      parser: 'yaml',
    },
    {
      action: 'template',
      template: '.bud/docker/build/php-fpm/Dockerfile',
      path: '.bud/docker/build/php-fpm/Dockerfile',
    },
    {
      action: 'template',
      template: '.bud/docker/build/php-fpm/scripts/composer.sh',
      path: '.bud/docker/build/php-fpm/scripts/composer.sh',
    },
    {
      action: 'template',
      template: '.bud/docker/build/php-fpm/scripts/wp-cli.sh',
      path: '.bud/docker/build/php-fpm/scripts/wp-cli.sh',
    },
    {
      action: 'template',
      template: '.bud/docker/build/nginx/conf.d/site.nginx.conf',
      path: '.bud/docker/build/nginx/conf.d/site.nginx.conf',
    },
  ],
}
