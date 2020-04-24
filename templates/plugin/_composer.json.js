module.exports = data => `\
{
  "name": "${data.get('namespace')}/${data.get('name')}",
  "type": "wordpress-plugin",
  "license": "MIT",
  "description": "${data.get('description')}",
  "homepage": "${data.get('website')}",
  "authors": [
    {
      "name": "${data.get('author')}",
      "email": "${data.get('email')}"
    }
  ],
  "keywords": [
    "wordpress",
    "wordpress-block"
  ],
  "require": {
    "php": "^7.1"
  }
}
`
