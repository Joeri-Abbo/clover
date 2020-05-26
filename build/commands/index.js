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
})({"../src/bud/store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateProvider = exports.store = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Bud application context
 */
const store = (0, _react.createContext)({
  writeDir: null,
  projectConfig: null,
  label: null,
  prompts: null,
  data: null,
  status: null,
  error: null,
  complete: false,
  ready: false,
  budfile: null,
  sprout: null,
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
/**
 * State provider
 */

const StateProvider = ({
  children
}) => {
  const [state, dispatch] = (0, _react.useReducer)((state, action) => {
    switch (action.type) {
      case 'SET':
        {
          const {
            key,
            value
          } = action;
          return { ...state,
            [key]: value
          };
        }
    }

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
},{}],"../src/bud/containers/Runner/tasks/addDependencies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _execa = _interopRequireDefault(require("execa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const execaOptions = {
  cwd: process.cwd()
};
/**
 * Add dependencies
 */

const addDependencies = async function ({
  task: {
    repo,
    pkgs,
    dev
  },
  observer
}) {
  let installation;
  observer.next({
    status: `Installing packages from ${repo}...`
  });

  if (repo !== 'npm' && repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`);
  }

  if (repo == 'npm') {
    installation = _execa.default.command(`yarn add ${dev ? `-D` : ``} ${pkgs.join(' ')}`, execaOptions);
  }

  if (repo == 'packagist') {
    installation = _execa.default.command(`composer require ${pkgs.join(' ')} ${dev ? `--development` : ``}`, execaOptions);
  }

  installation.stdout.on('data', status => {
    observer.next({
      status
    });
  });
  installation.then(() => observer.complete());
};

var _default = addDependencies;
exports.default = _default;
},{}],"../src/bud/containers/Runner/tasks/install.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _execa = _interopRequireDefault(require("execa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const install = async ({
  task: {
    repo
  },
  writeDir,
  observer
}) => {
  const options = {
    cwd: writeDir
  };
  observer.next({
    status: `Installing packages from ${repo}...`
  });

  if (repo !== 'npm' && repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`);
  }

  if (repo == 'npm') {
    const {
      stdout
    } = (0, _execa.default)(`yarn`, [`install`], options);
    stdout.then(() => {
      observer.complete();
    });
  }

  if (repo == 'packagist') {
    const {
      stdout
    } = (0, _execa.default)(`composer`, [`install`], options);
    stdout.then(() => {
      observer.complete();
    });
  }
};

var _default = install;
exports.default = _default;
},{}],"../src/bud/containers/Runner/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Handlebars helpers
 */
const helpers = data => [{
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

var _default = helpers;
exports.default = _default;
},{}],"../src/bud/containers/Runner/Process.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _handlebarsHelpers = _interopRequireDefault(require("handlebars-helpers"));

var _helpers = _interopRequireDefault(require("./helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handlebars
 */

/**
 * Process Handlebars template
 *
 * @param {string} string
 * @param {object} sprout
 */
const Process = async ({
  observer,
  string,
  sprout,
  data
}) => {
  var _sprout$registerHelpe;

  (0, _handlebarsHelpers.default)({
    handlebars: _handlebars.default
  });
  (0, _helpers.default)(data).forEach(({
    helper,
    fn
  }) => {
    _handlebars.default.registerHelper(helper, fn);
  });
  sprout === null || sprout === void 0 ? void 0 : (_sprout$registerHelpe = sprout.registerHelpers) === null || _sprout$registerHelpe === void 0 ? void 0 : _sprout$registerHelpe.forEach(({
    helper,
    fn
  }) => {
    _handlebars.default.registerHelper(helper, fn);
  });
  observer.next({
    status: `Compiling template`
  });
  return await _handlebars.default.compile(string)(data);
};

var _default = Process;
exports.default = _default;
},{"./helpers":"../src/bud/containers/Runner/helpers.js"}],"../src/bud/containers/Runner/Prettify.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prettier = require("prettier");

/**
 * Prettier
 *
 * @param {Observable} observer
 * @param {string} extension
 * @param {string} string
 */
const Prettify = async ({
  observer,
  string,
  extension
}) => {
  const parsers = {
    js: 'babel',
    jsx: 'babel',
    graphql: 'graphql',
    css: 'css',
    md: 'markdown',
    html: 'html',
    htm: 'html',
    ts: 'typescript',
    tsx: 'typescript',
    yml: 'yaml',
    yaml: 'yaml',
    less: 'less'
  };
  const parser = parsers[`${extension}`];
  const config = {
    arrowParens: 'avoid',
    bracketSpacing: false,
    tabWidth: 2,
    printWidth: 100,
    singleQuote: true,
    jsxBracketSameLine: true,
    useTabs: false,
    trailingComma: 'all',
    semi: false,
    parser
  };
  /**
   * Make prettier.
   */

  observer.next(parser ? `Skipping prettier. No support for this extension.` : `Prettifying file output`);
  const prettified = parser ? (0, _prettier.format)(string, config) : string;
  return prettified;
};

var _default = Prettify;
exports.default = _default;
},{}],"../src/bud/containers/Runner/Write.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = require("fs-extra");

/**
 * Write
 *
 * @param {Observer} observer
 * @param {string}   target
 * @param {string}   string
 */
const Write = ({
  observer,
  target,
  string
}) => {
  !(observer && target && string) ? observer.next({
    status: `Waiting for file contents..`
  }) : (() => {
    observer.next({
      status: `Writing ${target}`
    });
    (0, _fsExtra.outputFile)(target, string).then(() => {
      observer.complete();
    });
  })();
};

var _default = Write;
exports.default = _default;
},{}],"../src/bud/containers/Runner/tasks/json.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _Process = _interopRequireDefault(require("./../Process"));

var _Prettify = _interopRequireDefault(require("./../Prettify"));

var _Write = _interopRequireDefault(require("./../Write"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CWD = process.cwd();
/**
 * JSON
 */

const json = async ({
  task: {
    file,
    merge
  },
  sprout,
  data,
  observer
}) => {
  const json = require((0, _path.join)(CWD, file));

  observer.next({
    status: `Writing JSON to ${file}`
  });
  const output = merge(json);

  try {
    const string = await (0, _Process.default)({
      observer,
      string: output,
      sprout,
      data
    });
    const prettyString = await (0, _Prettify.default)({
      observer,
      string,
      extension: 'json'
    });
    await (0, _Write.default)({
      observer,
      target: (0, _path.join)(CWD, file),
      string: prettyString
    });
    observer.complete();
  } catch (err) {
    observer.error(`There was a problem writing to ${file}`);
  }
};

var _default = json;
exports.default = _default;
},{"./../Process":"../src/bud/containers/Runner/Process.js","./../Prettify":"../src/bud/containers/Runner/Prettify.js","./../Write":"../src/bud/containers/Runner/Write.js"}],"../src/bud/containers/Runner/tasks/scaffold.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fsExtra = require("fs-extra");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _Process = _interopRequireDefault(require("./../Process"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/display-name */

/* eslint-disable react/jsx-no-undef */

/**
 * Task: scaffold dir
 *
 * @prop {object}   task
 * @prop {string}   writeDir
 * @prop {object}   sprout
 * @prop {object}   data
 * @prop {Observer} observer
 */
const scaffold = async ({
  task: {
    paths
  },
  writeDir,
  sprout,
  data,
  observer
}) => {
  observer.next({
    status: `Creating directories`
  });
  (0, _rxjs.from)(paths).pipe((0, _operators.concatMap)(path => {
    return new _rxjs.Observable(async observer => {
      try {
        const pathTmp = await (0, _Process.default)({
          sprout,
          data,
          observer,
          string: path
        });
        const dirPath = (0, _path.join)(writeDir, pathTmp);

        try {
          await (0, _fsExtra.ensureDir)(dirPath).then(() => {
            observer.complete();
          });
        } catch {
          observer.error(`Scaffolding action throw: ${paths}, ${dirPath}`);
        }
      } catch {
        observer.error(`Action error: scaffold, pathTemplate`);
      }
    });
  })).subscribe({
    next: next => observer.next(next),
    error: error => observer.error(error),
    complete: () => observer.complete()
  });
};

var _default = scaffold;
exports.default = _default;
},{"./../Process":"../src/bud/containers/Runner/Process.js"}],"../src/bud/containers/Runner/Read.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = require("fs-extra");

/**
 * Read file
 *
 * @param {string} templateDir
 * @param {string} template
 */
const Read = async ({
  observer,
  file
}) => {
  try {
    observer.next({
      status: `Reading: ${file}`
    });
    return await (0, _fsExtra.readFile)(file, 'utf8');
  } catch (error) {
    observer.error(error);
  }
};

var _default = Read;
exports.default = _default;
},{}],"../src/bud/containers/Runner/tasks/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _Read = _interopRequireDefault(require("./../Read"));

var _Process = _interopRequireDefault(require("./../Process"));

var _Prettify = _interopRequireDefault(require("./../Prettify"));

var _Write = _interopRequireDefault(require("./../Write"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Template
 */
const template = async ({
  task,
  sprout,
  data,
  writeDir,
  templateDir,
  observer
}) => {
  let string;
  observer.next({
    status: `Processing templates`
  });
  string = await (0, _Read.default)({
    observer,
    file: `${templateDir}/${task.template}`
  });
  string = await (0, _Process.default)({
    observer,
    string,
    sprout,
    data
  });
  if (!task.prettier == false) string = await (0, _Prettify.default)({
    observer,
    string: template,
    extension: task.path.split('.')[task.path.split('.').length - 1]
  });
  string = await (0, _Write.default)({
    observer,
    string,
    target: (0, _path.join)(writeDir, task.path)
  });
  observer.next({
    status: string
  });
};

var _default = template;
exports.default = _default;
},{"./../Read":"../src/bud/containers/Runner/Read.js","./../Process":"../src/bud/containers/Runner/Process.js","./../Prettify":"../src/bud/containers/Runner/Prettify.js","./../Write":"../src/bud/containers/Runner/Write.js"}],"../src/bud/containers/Runner/tasks/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addDependencies = _interopRequireDefault(require("./addDependencies"));

var _install = _interopRequireDefault(require("./install"));

var _json = _interopRequireDefault(require("./json"));

var _scaffold = _interopRequireDefault(require("./scaffold"));

var _template = _interopRequireDefault(require("./template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** tasks */
const tasks = {
  addDependencies: _addDependencies.default,
  install: _install.default,
  json: _json.default,
  scaffold: _scaffold.default,
  template: _template.default
};
var _default = tasks;
exports.default = _default;
},{"./addDependencies":"../src/bud/containers/Runner/tasks/addDependencies.js","./install":"../src/bud/containers/Runner/tasks/install.js","./json":"../src/bud/containers/Runner/tasks/json.js","./scaffold":"../src/bud/containers/Runner/tasks/scaffold.js","./template":"../src/bud/containers/Runner/tasks/template.js"}],"../src/bud/containers/Runner/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _store = require("./../../store");

var _tasks = _interopRequireDefault(require("./tasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable react/display-name */

/* eslint-disable react/jsx-no-undef */

/** application */

/**
 * Runner
 *
 * @param {object}   data
 * @param {object}   sprout
 * @param {string}   templateDir
 * @param {string}   writeDir
 */
const Runner = ({
  sprout,
  data,
  budfile,
  writeDir,
  ready
}) => {
  const {
    state,
    dispatch
  } = (0, _react.useContext)(_store.store);
  const [status, setStatus] = (0, _react.useState)(null);
  const [error, setError] = (0, _react.useState)(null);
  const [complete, setComplete] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    ready && new _rxjs.Observable(observer => (0, _rxjs.from)(sprout.actions).pipe((0, _operators.concatMap)(task => {
      return new _rxjs.Observable(async observer => {
        return _tasks.default[task.action]({
          task,
          sprout,
          data,
          budfile,
          observer,
          templateDir: (0, _path.join)((0, _path.dirname)(budfile), 'templates'),
          writeDir
        });
      });
    })).subscribe({
      next: next => observer.next(next),
      error: error => observer.error(error),
      complete: () => observer.complete()
    })).subscribe({
      next: next => setStatus(next.status),
      error: error => setError(error),
      complete: () => setComplete(true)
    });
  }, [state, sprout]);
  (0, _react.useEffect)(() => {
    complete && (() => {
      dispatch({
        type: 'SET',
        key: 'status',
        value: 'complete'
      });
    })();
  }, [complete]);
  return !complete ? /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, status && /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, status))), error && /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    red: true
  }, typeof error !== 'string' ? JSON.stringify(error) : error)))) : [];
};

var _default = Runner;
exports.default = _default;
},{"./../../store":"../src/bud/store.js","./tasks":"../src/bud/containers/Runner/tasks/index.js"}],"../src/bud/containers/Prompt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _enquirer = require("enquirer");

var _store = require("../store");

/** application */

/**
 * Prompts
 */
const Prompt = ({
  prompts
}) => {
  const {
    state,
    dispatch
  } = (0, _react.useContext)(_store.store);
  /**
   * If there are prompts to run then do so
   * and dispatch the results to the global store.
   */

  (0, _react.useEffect)(() => {
    if (prompts && !state.ready) {
      dispatch({
        type: 'SET',
        key: 'status',
        value: 'questions'
      });
      (0, _enquirer.prompt)(prompts).then(data => {
        /**
         * Dispatch resultant data to the global store,
         * to be merged with whatever is already there.
         */
        dispatch({
          type: 'SET_DATA',
          data
        });
        dispatch({
          type: 'SET',
          key: 'ready',
          value: true
        });
      });
    }
  }, [prompts]);
  return null;
};

var _default = Prompt;
exports.default = _default;
},{"../store":"../src/bud/store.js"}],"../src/bud/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

var _Runner = _interopRequireDefault(require("./containers/Runner"));

var _Prompt = _interopRequireDefault(require("./containers/Prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** application */

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
 * @prop {string} writeDir
 */
const Bud = ({
  writeDir,
  sprout,
  budfile,
  data,
  ready
}) => {
  /**
   * Render the main app flow.
   */
  return sprout ? /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_Prompt.default, {
    prompts: sprout.prompts
  }), /*#__PURE__*/_react.default.createElement(_Runner.default, {
    ready: ready,
    budfile: budfile,
    writeDir: writeDir,
    sprout: sprout,
    data: data
  })) : /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, null), " Loading...");
};

Bud.propTypes = {
  writeDir: _propTypes.default.string
};
Bud.defaultProps = {
  writeDir: null,
  ready: false
};
var _default = Bud;
exports.default = _default;
},{"./containers/Runner":"../src/bud/containers/Runner/index.js","./containers/Prompt":"../src/bud/containers/Prompt.js"}],"../src/bud/components/Banner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _inkLink = _interopRequireDefault(require("ink-link"));

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

var _store = require("./../store");

var _inkUseStdoutDimensions = _interopRequireDefault(require("ink-use-stdout-dimensions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const colors = {
  success: '#96EF85',
  error: '#BE425E'
};
/**
 * Banner
 *
 * @prop {string} label
 */

const Banner = ({
  label
}) => {
  const {
    state
  } = (0, _react.useContext)(_store.store);
  const [width] = (0, _inkUseStdoutDimensions.default)();
  const [spinner, setSpinner] = (0, _react.useState)(true);
  const [status, setStatus] = (0, _react.useState)(false);
  const [statusColor, setStatusColor] = (0, _react.useState)('#ffffff');
  (0, _react.useEffect)(() => {
    if ((state === null || state === void 0 ? void 0 : state.status) && state.status == 'complete') {
      setStatus('🎉');
      setStatusColor(colors.success);
      setSpinner(false);
    }

    if ((state === null || state === void 0 ? void 0 : state.status) && state.status == 'building') {
      setStatus('👩‍💻');
      setStatusColor(colors.white);
      setSpinner(true);
    }

    if ((state === null || state === void 0 ? void 0 : state.status) && state.status == 'questions') {
      setStatus('❔');
      setStatusColor(colors.white);
      setSpinner(false);
    }

    if ((state === null || state === void 0 ? void 0 : state.status) && state.status == 'error') {
      setStatus('💢');
      setStatusColor(colors.error);
      setSpinner(false);
    }
  }, [state]);
  return state ? /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
    width: width - width / 20
  }, /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "row",
    justifyContent: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_ink.Box, {
    width: 1,
    marginRight: 2
  }, spinner ? /*#__PURE__*/_react.default.createElement(_inkSpinner.default, null) : /*#__PURE__*/_react.default.createElement(_ink.Text, null, status)), /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    hex: statusColor
  }, label)))), /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "row"
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, null, `🌱`), /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Text, {
    bold: true
  }, /*#__PURE__*/_react.default.createElement(_inkLink.default, {
    url: "https://roots.io/bud"
  }, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, 'Bud')))))) : /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, null), " Loading");
};

Banner.propTypes = {
  label: _propTypes.default.string
};
var _default = Banner;
exports.default = _default;
},{"./../store":"../src/bud/store.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bud = _interopRequireDefault(require("../src/bud"));

var _store = require("../src/bud/store");

var _Banner = _interopRequireDefault(require("../src/bud/components/Banner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** application */
const cwd = process.cwd();
const budfile = (0, _path.resolve)(__dirname, './../../src/budfiles/init/init.bud');
const strings = {
  title: 'Bud: WordPress CLI generator tooling'
};
/** Command: bud init */
/// Create a new project

const Init = ({
  projectDir
}) => {
  const {
    state,
    dispatch
  } = (0, _react.useContext)(_store.store);
  (0, _react.useEffect)(() => {
    projectDir && dispatch({
      type: 'SET',
      key: 'writeDir',
      value: (0, _path.join)(cwd, projectDir)
    });
  }, [projectDir]);
  (0, _react.useEffect)(() => {
    budfile && dispatch({
      type: 'SET',
      key: 'budfile',
      value: budfile
    });
  }, [budfile]);
  const [sprout, setSprout] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    budfile && setSprout(require(budfile));
  }, [budfile]);
  (0, _react.useEffect)(() => {
    sprout && dispatch({
      type: 'SET',
      key: 'sprout',
      value: sprout
    });
    sprout && sprout.description && dispatch({
      type: 'SET',
      key: 'label',
      value: sprout.description
    });
  }, [sprout]);
  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    marginTop: 1,
    flexDirection: 'column'
  }, /*#__PURE__*/_react.default.createElement(_Banner.default, {
    label: (state === null || state === void 0 ? void 0 : state.label) || strings.title
  }), /*#__PURE__*/_react.default.createElement(_bud.default, state));
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
},{"../src/bud":"../src/bud/index.js","../src/bud/store":"../src/bud/store.js","../src/bud/components/Banner":"../src/bud/components/Banner.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map