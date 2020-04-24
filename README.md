<p align="center">
  <img src="https://cdn.roots.io/app/uploads/logo-bud.svg" width="150">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">

  <img alt="devDependency Status" src="https://img.shields.io/david/dev/roots/bud.svg?style=flat-square">

  <img alt="Build Status" src="https://img.shields.io/circleci/project/github/roots/bud/master.svg?style=flat-square">

  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2" />
  </a>
</p>

<p align="center">
  <strong>Powerful Block Scaffolding for WordPress</strong>
  <br />
  Built with ❤️
</p>

<p align="center">
  <a href="https://roots.io">Official Website</a> | <a href="https://roots.io/docs/bud/master/usage">Documentation</a> | <a href="https://roots.io/docs/bud/master/changes">Change Log</a>
</p>

## Supporting

**Bud** is an open source project and completely free to use.

However, the amount of effort needed to maintain and develop new features and products within the Roots ecosystem is not sustainable without proper financial backing. If you have the capability, please consider donating using the links below:

<div align="center">

[![Donate via Patreon](https://img.shields.io/badge/donate-patreon-orange.svg?style=flat-square&logo=patreon")](https://www.patreon.com/rootsdev)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square&logo=paypal)](https://www.paypal.me/rootsdev)

</div>

## Overview

Bud is an extendable, zero configuration scaffolding CLI for WordPress editor blocks, also known as [Gutenberg](https://wordpress.org/gutenberg/).

## Requirements

| Requirement | Version |
| ----------- | ------- |
| PHP         | >=7.1   |
| Node        | >=10    |

## Usage

| Command | Description               |
| ------- | ------------------------- |
| `bud`   | Create a new block plugin |

## Generated files

A typical block that was created with Bud has the following structure:

```sh
bud-plugin
├── blocks
│   └── block
│       ├── styles
│       │   ├── public.css
│       │   ├── editor.css
│       │   └── common.css
│       └── scripts
│           ├── public
│           │   └── index.js
│           └── editor
│               ├── containers
│               │   ├── save.js
│               │   └── edit.js
│               ├── components
│               │   └── Media.js
│               ├── block.js
│               └── attributes.json
├── webpack.config.js
├── prettierrc.json
├── postcss.config.js
├── package.json
├── composer.json
├── block.php
├── README.md
├── .stylelintrc
├── .gitignore
├── .eslintrc.js
├── .eslintignore
├── .editorconfig
└── .babelrc.js

8 directories, 22 files
```

### Plugin Dependencies

- @prettier/plugin-php
- collect.js
- enquirer
- esm
- execa
- fs-extra
- got
- ink
- pastel
- prettier
- prop-types
- react

### Development dependencies

- babel-eslint
- eslint
- eslint-plugin-jsx-a11y
- eslint-plugin-react
- eslint-plugin-react-hooks
- globby
- husky
- markdownlint-cli
- npm-run-all

## Roadmap

- `HMR`
- `bud component`
- `bud extension`

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV"><img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150"></a> <a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"></a> <a href="https://nestify.io/?utm_source=roots&utm_medium=banner&utm_campaign=footer"><img src="https://cdn.roots.io/app/uploads/nestify.svg" alt="Nestify" width="200" height="150"></a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
