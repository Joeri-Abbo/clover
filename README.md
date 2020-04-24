# 🌱 @roots/bud

![License: undefined](https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square)
![GitHub Release](https://img.shields.io/github/release/roots/bud?color=%23525ddc&style=flat-square)
![Build Status](https://img.shields.io/circleci/project/github/roots/bud/master.svg?style=flat-square)
[![Follow Roots](https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2)](https://twitter.com/rootswp)

> ## A command-line interface (CLI) for the WordPress block editor.

Scaffold new Gutenberg features with the `bud` command.

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
