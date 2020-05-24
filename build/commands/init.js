// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/components/store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateProvider = exports.store = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const store = (0, _react.createContext)({
  label: 'Bud: a modern WordPress scaffolding utility',
  prompts: [],
  data: null,
  status: null,
  error: null,
  complete: false,
  ready: false,
  search: {
    core: {
      results: null,
      status: null,
      complete: false
    },
    plugins: {
      results: null,
      status: null,
      complete: false
    },
    project: {
      results: null,
      status: null,
      complete: false
    }
  }
});
exports.store = store;
const {
  Provider
} = store;

const StateProvider = ({
  children
}) => {
  const [state, dispatch] = (0, _react.useReducer)((state, action) => {
    switch (action.type) {
      case 'SET_LABEL':
        {
          const {
            label
          } = action;
          return { ...state,
            label
          };
        }

      case 'SET_PROMPTS':
        {
          const {
            prompts
          } = action;
          return { ...state,
            prompts
          };
        }

      case 'SET_DATA':
        {
          const {
            data
          } = action;
          return { ...state,
            data: { ...state.data,
              ...data
            }
          };
        }

      case 'SET_READY':
        {
          const {
            ready
          } = action;
          return { ...state,
            ready
          };
        }

      case 'SET_STATUS':
        {
          const {
            status
          } = action;
          return { ...state,
            status
          };
        }

      case 'SET_ERROR':
        {
          const {
            error
          } = action;
          return { ...state,
            error
          };
        }

      case 'SET_COMPLETE':
        {
          const {
            complete
          } = action;
          return { ...state,
            complete
          };
        }

      case 'SEARCH_RESULTS':
        {
          const {
            results,
            status,
            complete
          } = action;
          return { ...state,
            search: { ...state.search,
              [`${action.label}`]: {
                results,
                status,
                complete
              }
            }
          };
        }
    }
  }, store);
  return /*#__PURE__*/_react.default.createElement(Provider, {
    value: {
      state,
      dispatch
    }
  }, children);
};

exports.StateProvider = StateProvider;
},{}],"../src/components/containers/Prompts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _ink = require("ink");

var _enquirer = require("enquirer");

var _store = require("./../store");

/** application */

/**
 * Prompts
 */
const Prompts = () => {
  /** @see ink docs */
  const {
    stdout
  } = (0, _ink.useStdout)();
  const {
    state,
    dispatch
  } = (0, _react.useContext)(_store.store);
  /**
   * State tracking prompts listed in the
   * generator file.
   */

  const [prompts, setPrompts] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const prompts = state === null || state === void 0 ? void 0 : state.prompts;
    setPrompts(prompts ? prompts : null);
  }, [state]);
  /**
   * If there are prompts to run then do so
   * and dispatch the results to the global store.
   */

  (0, _react.useEffect)(() => {
    (prompts === null || prompts === void 0 ? void 0 : prompts.length) > 0 && (0, _enquirer.prompt)(prompts).then(data => {
      /**
       * Since enquirer is not
       * ink-specific it causes duplication of the
       * application components in stdout.
       *
       * This clears the console to mask that issue.
       *
       * @todo rewrite enquirer prompts with ink-specific
       * componentry.
       */
      stdout.write('\x1B[2J\x1B[0f');
      /**
       * Dispatch resultant data to the global store,
       * to be merged with whatever is already there.
       */

      dispatch({
        type: 'SET_DATA',
        data
      });
      /**
       * Finally, tell the application that the prompts
       * are finished and we're ready to build the
       * requested component.
       */

      dispatch({
        type: 'SET_READY',
        ready: true
      });
    });
  }, [prompts]);
  return null;
};

var _default = Prompts;
exports.default = _default;
},{"./../store":"../src/components/store.js"}],"../prettier.config.js":[function(require,module,exports) {
module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxBracketSameLine: true,
  useTabs: false,
  trailingComma: 'all',
  semi: false,
  overrides: [{
    files: ['*.md'],
    options: {
      parser: 'markdown'
    }
  }, {
    files: ['*.json'],
    options: {
      parser: 'json'
    }
  }]
};
},{}],"../src/bud/helpers.js":[function(require,module,exports) {
/**
 * Handlebars helpers
 */
module.exports = data => {
  return [{
    helper: 'array',
    fn: function () {
      return Array.prototype.slice.call(arguments, 0, -1);
    }
  }, {
    helper: 'has',
    fn: function (object, component, options) {
      if (data[object].indexOf(component) > -1) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  }, {
    helper: 'hasAny',
    fn: function (object, components, options) {
      let hasInstance = false;

      if (components) {
        components.forEach(component => {
          if (data[object].indexOf(component) > -1) {
            hasInstance = true;
          }
        });
      }

      return hasInstance ? options.fn(this) : options.inverse(this);
    }
  }, {
    helper: 'raw',
    fn: function (options) {
      return options.fn();
    }
  }];
};
},{}],"../src/bud/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bud = void 0;

const {
  join,
  resolve
} = require('path');

const fs = require('fs-extra');

const fetch = require('node-fetch');

const execa = require('execa');

const handlebars = require('handlebars');

const prettier = require('prettier');

const globby = require('globby');

const {
  Observable,
  from
} = require('rxjs');

const {
  concatMap
} = require('rxjs/operators');

const basePrettierConfig = require('./../../prettier.config.js');

const handlebarsHelpers = require('handlebars-helpers');

const helpers = require('./helpers');

const CWD = process.cwd();
/**
 * Bud Core
 */

const bud = {
  fs,
  fetch,
  execa,
  prettier,
  handlebars,

  /**
   * Initialize
   *
   * @param {string} outDir
   * @param {object} data
   * @param {object} sprout
   * @param {string} templateDir
   * @param {bool}   skipInstall
   */
  init: function ({
    data = {},
    sprout,
    templateDir,
    outDir
  }) {
    this.data = data;
    this.sprout = sprout;
    this.projectDir = outDir ? join(CWD, outDir) : CWD;
    this.execaOptions = {
      cwd: this.projectDir
    };
    this.templateDir = templateDir;
    this.registerActions();
    this.registerHelpers();
    return this;
  },

  /**
   * Get config.
   *
   * @return {object}
   */
  getConfig: function () {
    return {
      path: `${process.cwd()}/${this.projectDir}/.bud/bud.config.json`,
      data: require(`${process.cwd()}/${this.projectDir}/.bud/bud.config.json`)
    };
  },

  /**
   * Get data.
   *
   * @return {object}
   */
  getData: function () {
    return this.data;
  },

  /**
   * Set data.
   *
   * @param  {object} data
   * @return {void}
   */
  setData: function (data) {
    this.data = data;
  },

  /**
   * Register actions
   */
  registerActions: function () {
    this.sprout.registerActions && this.sprout.registerActions.forEach(action => {
      this[`${action.handle}`] = action.callback;
    });
  },

  /**
   * Register helpers
   */
  registerHelpers: function () {
    // lib helpers
    handlebarsHelpers({
      handlebars: this.handlebars
    }); // plugin registered helpers

    this.sprout.registerHelpers && this.sprout.registerHelpers.length > 0 && this.sprout.registerHelpers.forEach(helper => {
      helpers.push(helper);
    }); // roots/bud helpers

    helpers(this.getData()).forEach(({
      helper,
      fn
    }) => {
      this.handlebars.registerHelper(helper, fn);
    });
  },

  /**
   * Format
   *
   * @param  {object|string} content
   * @param  {parser} string
   * @return {string}
   */
  format: function (content, parser) {
    return this.prettier.format(typeof content !== 'string' ? JSON.stringify(content) : content, { ...basePrettierConfig,
      parser: parser || 'babel'
    });
  },

  /**
   * Actions
   *
   * @return {Observable}
   */
  actions: function () {
    const bud = { ...this
    };
    return new Observable(function (observer) {
      from(bud.sprout.actions).pipe(concatMap(function (task) {
        return new Observable(async function (observer) {
          return bud[task.action](task, observer, bud);
        });
      })).subscribe({
        next: next => observer.next(next),
        error: error => observer.error(error),
        complete: complete => observer.complete(complete)
      });
    });
  },

  /**
   * Scaffold directories
   *
   * @param  {array} paths
   * @return {Observable}
   */
  scaffold: function ({
    paths
  }, observer) {
    observer.next(`Creating directories`);
    from(paths).pipe(concatMap(path => {
      return new Observable(async observer => {
        try {
          await this.mkDir({
            path
          }, observer);
        } catch (e) {
          observer.error(e);
        }
      });
    })).subscribe({
      next: next => observer.next(next),
      error: error => observer.error(error),
      complete: () => observer.complete()
    });
  },

  /**
   * Make directory
   *
   * @param  {string}     path
   * @param  {Observable} observer
   * @return {Observable}
   */
  mkDir: async function ({
    path
  }, observer) {
    const pathTemplate = this.handlebars.compile(path);
    const dirPath = join(this.projectDir, pathTemplate(this.getData()));

    try {
      await fs.ensureDir(dirPath).then(() => {
        observer.complete();
      });
    } catch (e) {
      observer.error(e);
    }
  },

  /**
   * Get template contents.
   *
   * @param  {string} template
   * @return {array}
   */
  getTemplate: async function (template) {
    const path = join(this.templateDir, template);
    const contents = await fs.readFile(path, 'utf8');
    return {
      path,
      contents
    };
  },

  /**
   * Infer parser
   *
   * @param  {string} file
   * @return {string}
   */
  inferParser: async function (file) {
    var _parserMap$;

    const ext = file.split('.')[file.split('.').length - 1];
    const parserMap = {
      js: 'babel',
      jsx: 'babel',
      graphql: 'graphql',
      css: 'css',
      json: 'json',
      md: 'markdown',
      html: 'html',
      htm: 'html',
      ts: 'typescript',
      tsx: 'typescript',
      yml: 'yaml',
      yaml: 'yaml',
      less: 'less'
    };
    return (_parserMap$ = parserMap[`${ext}`]) !== null && _parserMap$ !== void 0 ? _parserMap$ : null;
  },

  /**
   * Action: template
   *
   * @param  {string} parser
   * @param  {string} path
   * @param  {string} template
   * @return {Observable}
   */
  template: async function ({
    parser,
    path,
    template
  }, observer) {
    try {
      const {
        contents
      } = await this.getTemplate(template);
      const dest = join(this.projectDir, this.handlebars.compile(path)(this.getData()).replace('.hbs', ''));
      observer.next(`Writing ${dest.split('/')[dest.split('/').length - 1]}`);
      const compiled = this.handlebars.compile(contents)(this.getData());
      const outputContents = parser ? this.format(compiled, parser) : compiled;
      fs.outputFile(dest, outputContents).then(() => observer.complete());
    } catch (error) {
      observer.error(error);
    }
  },

  /**
   * Action: template dir
   *
   * @param  {string} parser
   * @param  {string} path
   * @param  {string} templateDir
   * @return {Observable}
   */
  templateGlob: async function ({
    glob
  }, observer) {
    try {
      const templates = await globby([resolve(this.templateDir, glob)]);
      from(templates).pipe(concatMap(template => {
        return new Observable(async observer => {
          try {
            const parser = await this.inferParser(template.replace('.hbs', ''));
            await this.template({
              parser,
              template: template.replace(this.templateDir, ''),
              path: template.replace(this.templateDir, '').replace('.hbs', '')
            }, observer);
          } catch (error) {
            observer.error(error);
          }
        });
      })).subscribe({
        next: next => observer.next(next),
        error: error => observer.error(error),
        complete: () => observer.complete()
      });
    } catch (error) {
      observer.error(error);
    }
  },

  /**
   * Action: Modules
   *
   * @param  {array} pkgs
   * @param  {bool}  dev
   * @return {Observable}
   */
  addDependencies: async function ({
    repo,
    pkgs,
    dev
  }, observer) {
    let installation;
    observer.next(`Installing packages from ${repo}...`);

    if (repo !== 'npm' && repo !== 'packagist') {
      observer.error(`Incorrect package repo specified.`);
    }

    if (repo == 'npm') {
      installation = this.execa.command(`yarn add ${dev ? `-D` : ``} ${pkgs.join(' ')}`, this.execaOptions);
    }

    if (repo == 'packagist') {
      installation = this.execa.command(`composer require ${pkgs.join(' ')} ${dev ? `--development` : ``}`, this.execaOptions);
    }

    installation.stdout.on('data', status => {
      observer.next(status);
    });
    installation.then(() => observer.complete());
  },

  /**
   * Action: Install from package files
   *
   * @param  {string} repo
   * @return {Observable}
   */
  install: async function ({
    repo
  }, observer) {
    let installation;
    observer.next(`Installing packages from ${repo}...`);

    if (repo !== 'npm' && repo !== 'packagist') {
      observer.error(`Incorrect package repo specified.`);
    }

    if (repo == 'npm') {
      installation = this.execa.command(`yarn`, this.execaOptions);
    }

    if (repo == 'packagist') {
      installation = this.execa.command(`composer install`, this.execaOptions);
    }

    installation.stdout.on('data', status => {
      observer.next(status.code);
    });
    installation.then(() => observer.complete());
  },

  /**
   * Expose project JSON
   */
  json: async function ({
    file,
    merge
  }, observer) {
    const json = require(`${this.projectDir}/${file}`);

    observer.next('json-ish?');
    observer.next(`Writing JSON to ${file}`);
    observer.next('json-ish?');
    const output = merge(json);

    try {
      await fs.outputFile(`${this.projectDir}/${file}`, this.format(output, 'json'));
      observer.complete();
    } catch (err) {
      observer.error(`There was a problem writing to ${file}`);
    }
  }
};
exports.bud = bud;
},{"./../../prettier.config.js":"../prettier.config.js","./helpers":"../src/bud/helpers.js"}],"../src/components/containers/Runner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _react = require("react");

var _bud = require("../../bud");

var _store = require("../store");

/** application */

/**
 * Runner
 *
 * @prop {bool}   ready
 * @prop {object} data
 * @prop {object} sprout
 * @prop {string} module
 */
const Runner = ({
  ready,
  data,
  sprout,
  module,
  outDir
}) => {
  const {
    dispatch
  } = (0, _react.useContext)(_store.store);
  /**
   * When the store ready boolean is flipped
   * then initialize the BudEngine and return
   * the observable to be subscribed to.
   */

  const [subscription, setSubscription] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    ready && setSubscription(_bud.bud.init({
      sprout,
      data,
      outDir: outDir ? outDir : null,
      templateDir: (0, _path.join)((0, _path.dirname)(module), 'templates')
    }).actions());
  }, [ready]);
  /**
   * Once there is something to subscribe to
   * subscribe to it and use what it emits as component
   * state.
   */

  const [status, setStatus] = (0, _react.useState)(null);
  const [error, setError] = (0, _react.useState)(null);
  const [complete, setComplete] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    subscription === null || subscription === void 0 ? void 0 : subscription.subscribe({
      next: next => setStatus(next),
      error: error => setError(error),
      complete: () => setComplete(true)
    });
  }, [subscription]);
  /**
   * Handle status emittences.
   */

  (0, _react.useEffect)(() => {
    status && dispatch({
      type: 'SET_STATUS',
      status
    });
  }, [status]);
  /**
   * Handle error emittences.
   */

  (0, _react.useEffect)(() => {
    error && dispatch({
      type: 'SET_ERROR',
      error
    });
  }, [error]);
  /**
   * Handle the completion emittence.
   */

  (0, _react.useEffect)(() => {
    complete && dispatch({
      type: 'SET_COMPLETE',
      complete
    });
  }, [complete]);
  return null;
};

var _default = Runner;
exports.default = _default;
},{"../../bud":"../src/bud/index.js","../store":"../src/components/store.js"}],"../src/components/components/Status.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Status
 *
 * @prop {string} status
 * @prop {bool}   comp
 */
const Status = ({
  status,
  complete
}) => /*#__PURE__*/_react.default.createElement(_ink.Box, null, status && !complete && /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
  green: true
}, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, {
  type: "dots"
})), ` ${status}`), complete && /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
  green: true
}, "\u26A1\uFE0F All set.")));

Status.propTypes = {
  complete: _propTypes.default.bool
};
Status.defaultProps = {
  status: '',
  complete: false
};
var _default = Status;
exports.default = _default;
},{}],"../src/components/components/Error.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error
 */
const Error = ({
  message
}) => message ? /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
  red: true
}, "\uD83D\uDCA5 ", JSON.stringify(message))) : [];

Error.propTypes = {
  message: _propTypes.default.string
};
var _default = Error;
exports.default = _default;
},{}],"../src/components/Bud.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _store = require("./store");

var _Prompts = _interopRequireDefault(require("./containers/Prompts"));

var _Runner = _interopRequireDefault(require("./containers/Runner"));

var _Status = _interopRequireDefault(require("./components/Status"));

var _Error = _interopRequireDefault(require("./components/Error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** application */
const budConfig = require(`${process.cwd()}/.bud/bud.config.json`);
/**
 * Bud Application
 *
 * This container represents the main Bud application.
 *
 * It does not handle the initial command invocation or
 * routing. Rather, the  moduleReady and module props are supplied
 * by a command component, which are housed in the commands dir.
 *
 * @see ink (react cli framework)
 * @see pastel (ink project framework)
 *
 * @prop {bool}   moduleReady
 * @prop {string} module
 * @prop {string} outDirectory
 */


const Bud = ({
  moduleReady,
  module,
  outDir
}) => {
  const {
    state,
    dispatch
  } = (0, _react.useContext)(_store.store);
  /**
   * Load the "sprout" from the module file
   * if the search has concluded.
   */

  const [sprout, setSprout] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    moduleReady && module && setSprout(require(module));
  }, [moduleReady, module]);
  /**
   * If the sprout has a description
   * then update the application banner.
   */

  (0, _react.useEffect)(() => {
    (sprout === null || sprout === void 0 ? void 0 : sprout.description) && dispatch({
      type: 'SET_LABEL',
      label: sprout.description
    });
  }, [sprout]);
  /**
   * Load the config's project key into the store
   * so that generators can use it as a fallback.
   */

  (0, _react.useEffect)(() => {
    budConfig && dispatch({
      type: 'SET_DATA',
      data: budConfig.project
    });
  }, [budConfig]);
  /**
   * If the generator has prompts then update the
   * store with those prompts.
   */

  (0, _react.useEffect)(() => {
    sprout && (() => {
      sprout.prompts && sprout.prompts.length > 0 ? dispatch({
        type: 'SET_PROMPTS',
        prompts: sprout.prompts
      }) : dispatch({
        type: 'SET_READY',
        ready: true
      });
    })();
  }, [sprout]);
  /**
   * Render the main app flow.
   */

  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_Error.default, {
    message: state === null || state === void 0 ? void 0 : state.error
  }), /*#__PURE__*/_react.default.createElement(_Status.default, {
    status: state === null || state === void 0 ? void 0 : state.status,
    complete: state === null || state === void 0 ? void 0 : state.complete
  }), /*#__PURE__*/_react.default.createElement(_Prompts.default, null), /*#__PURE__*/_react.default.createElement(_Runner.default, {
    ready: state === null || state === void 0 ? void 0 : state.ready,
    data: state === null || state === void 0 ? void 0 : state.data,
    module: module,
    sprout: sprout,
    outDir: outDir
  }));
};

Bud.defaultProps = {
  outDir: null,
  ready: false
};
var _default = Bud;
exports.default = _default;
},{"./store":"../src/components/store.js","./containers/Prompts":"../src/components/containers/Prompts.js","./containers/Runner":"../src/components/containers/Runner.js","./components/Status":"../src/components/components/Status.js","./components/Error":"../src/components/components/Error.js"}],"../src/components/components/Banner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _inkLink = _interopRequireDefault(require("ink-link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Banner
 *
 * @prop {string} label
 */
const Banner = ({
  label
}) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  marginBottom: 1,
  flexDirection: "row",
  justifyContent: "space-between"
}, /*#__PURE__*/_react.default.createElement(_ink.Box, {
  flexDirection: "column"
}, /*#__PURE__*/_react.default.createElement(_ink.Text, null, label)), /*#__PURE__*/_react.default.createElement(_ink.Box, {
  flexDirection: "row"
}, /*#__PURE__*/_react.default.createElement(_ink.Text, null, `🌱`), /*#__PURE__*/_react.default.createElement(_ink.Text, {
  bold: true
}, /*#__PURE__*/_react.default.createElement(_inkLink.default, {
  url: "https://roots.io/bud"
}, /*#__PURE__*/_react.default.createElement(_ink.Color, {
  green: true
}, '  Bud')))));

Banner.propTypes = {
  label: _propTypes.default.string
};
var _default = Banner;
exports.default = _default;
},{}],"init.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Bud = _interopRequireDefault(require("../src/components/Bud"));

var _store = require("../src/components/store");

var _Banner = _interopRequireDefault(require("../src/components/components/Banner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** application */
const initModule = (0, _path.resolve)(__dirname, './../../src/budfiles/init/init.bud');
const strings = {
  title: 'Bud: WordPress CLI generator tooling'
};
/** Command: bud init */
/// Create a new project

const Init = props => {
  const {
    state
  } = (0, _react.useContext)(_store.store);
  /**
   * Update the generator label.
   */

  const [label, setLabel] = (0, _react.useState)(strings.title);
  (0, _react.useEffect)(() => {
    (state === null || state === void 0 ? void 0 : state.label) && setLabel(state.label);
  }, [state === null || state === void 0 ? void 0 : state.label]);
  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    marginTop: 1,
    flexDirection: 'column'
  }, /*#__PURE__*/_react.default.createElement(_Banner.default, {
    label: label
  }), /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: 'column',
    marginBottom: 1
  }, /*#__PURE__*/_react.default.createElement(_Bud.default, {
    outDir: props.projectDir,
    module: initModule,
    moduleReady: true
  })));
};
/** Command: bud init */
/// Initialize a Bud project


const InitCLI = props => {
  return /*#__PURE__*/_react.default.createElement(_store.StateProvider, null, /*#__PURE__*/_react.default.createElement(Init, props));
};

InitCLI.propTypes = {
  /// Output directory
  projectDir: _propTypes.default.string
};
InitCLI.positionalArgs = ['projectDir'];
var _default = InitCLI;
exports.default = _default;
},{"../src/components/Bud":"../src/components/Bud.js","../src/components/store":"../src/components/store.js","../src/components/components/Banner":"../src/components/components/Banner.js"}]},{},["init.js"], null)
//# sourceMappingURL=/init.js.map