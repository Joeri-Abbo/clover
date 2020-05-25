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

const cwd = process.cwd();
/** app config */

let budConfig;

try {
  budConfig = require(`${process.cwd()}/.bud/bud.config.json`);
} catch {
  budConfig = {};
}
/**
 * Bud application context
 */


const store = (0, _react.createContext)({
  cwd,
  writeDir: cwd,
  projectConfig: { ...budConfig
  },
  label: 'Bud: a modern WordPress scaffolding utility',
  prompts: null,
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
},{}],"../src/bud/components/Banner.js":[function(require,module,exports) {
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
},{"./../store":"../src/bud/store.js"}],"../src/bud/containers/List.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _globby = _interopRequireDefault(require("globby"));

var _rxjs = require("rxjs");

var _store = require("../store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** application */

/**
 * Search
 *
 * @prop {array}  glob
 * @prop {string} label
 */
const List = ({
  glob,
  label
}) => {
  const {
    dispatch
  } = (0, _react.useContext)(_store.store);
  /**
   * Return an observable emitting
   * budfile matches.
   */

  const [search] = (0, _react.useState)(new _rxjs.Observable(async observer => {
    observer.next({
      status: 'Searching'
    });
    const results = await (0, _globby.default)(glob);
    observer.next({
      results: results ? results : null
    });
    observer.complete();
  }));
  /**
   * Once there is an observer available to subscribe to,
   * use what it emits to set various component states.
   */

  const [status, setStatus] = (0, _react.useState)(null);
  const [complete, setComplete] = (0, _react.useState)(null);
  const [results, setResults] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    search === null || search === void 0 ? void 0 : search.subscribe({
      next: next => {
        next.status && setStatus(next.status);
        next.results && setResults(next.results);
      },
      complete: () => setComplete(true),
      error: () => setComplete(true)
    });
  }, [search]);
  /**
   * Mirror any changes to component state
   * in the global store.
   */

  (0, _react.useEffect)(() => {
    complete && dispatch({
      type: 'SET',
      key: 'status',
      value: 'complete'
    });
    dispatch({
      type: 'SEARCH_RESULTS',
      label,
      results,
      complete,
      status
    });
  }, [results, status, complete]);
  /** Format matched files for display */

  const displayFile = file => (0, _path.basename)(file).replace('.bud.js', '');
  /**
   * Render
   */


  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, results === null || results === void 0 ? void 0 : results.map((result, id) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
    key: id,
    flexDirection: "row",
    textWrap: "truncate-start"
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    gray: true
  }, "yarn generate ")), /*#__PURE__*/_react.default.createElement(_ink.Text, null, `${displayFile(result)}`))));
};

List.propTypes = {
  glob: _propTypes.default.array.isRequired,
  label: _propTypes.default.string
};
List.defaultProps = {
  label: 'List'
};
var _default = List;
exports.default = _default;
},{"../store":"../src/bud/store.js"}],"list/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _inkUseStdoutDimensions = _interopRequireDefault(require("ink-use-stdout-dimensions"));

var _store = require("../../src/bud/store");

var _Banner = _interopRequireDefault(require("../../src/bud/components/Banner"));

var _List = _interopRequireDefault(require("../../src/bud/containers/List"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** application */

/**
 * Scaffold candidate locations
 */
const globs = {
  project: `${process.cwd()}/.bud/budfiles/**/*.bud.js`,
  plugins: `${process.cwd()}/node_modules/**/bud-plugin-*/**/*.bud.js`,
  core: `${process.cwd()}/node_modules/@roots/bud/src/budfiles/**/**.bud.js`
};
/**
 * List
 *
 * @prop {string} request
 */

const ListView = () => {
  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: 'column'
  }, /*#__PURE__*/_react.default.createElement(_Banner.default, {
    label: 'bud list'
  }), /*#__PURE__*/_react.default.createElement(_List.default, {
    glob: [globs.project, globs.plugins, globs.core]
  }));
};
/** Command: bud list */
/// List generators


const ListCLI = ({
  request
}) => {
  const [width, height] = (0, _inkUseStdoutDimensions.default)();
  return /*#__PURE__*/_react.default.createElement(_store.StateProvider, null, /*#__PURE__*/_react.default.createElement(_ink.Box, {
    width: width,
    height: height - 5
  }, /*#__PURE__*/_react.default.createElement(ListView, {
    request: request
  })));
};

var _default = ListCLI;
exports.default = _default;
},{"../../src/bud/store":"../src/bud/store.js","../../src/bud/components/Banner":"../src/bud/components/Banner.js","../../src/bud/containers/List":"../src/bud/containers/List.js"}]},{},["list/index.js"], null)
//# sourceMappingURL=/list/index.js.map