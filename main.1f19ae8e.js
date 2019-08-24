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
})({"Canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas =
/*#__PURE__*/
function () {
  function Canvas() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Canvas);

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.options = options;
    this.initCanvas(this.canvas, options);
  }

  _createClass(Canvas, [{
    key: "initCanvas",
    value: function initCanvas(canvas, options) {
      var width = options.width,
          height = options.height;
      this.updateDimensions(width, height);
    }
  }, {
    key: "updateDimensions",
    value: function updateDimensions(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }, {
    key: "initCtx",
    value: function initCtx() {
      var _this$options = this.options,
          _this$options$lineJoi = _this$options.lineJoin,
          lineJoin = _this$options$lineJoi === void 0 ? 'round' : _this$options$lineJoi,
          _this$options$lineCap = _this$options.lineCap,
          lineCap = _this$options$lineCap === void 0 ? 'round' : _this$options$lineCap,
          _this$options$lineWid = _this$options.lineWidth,
          lineWidth = _this$options$lineWid === void 0 ? 2 : _this$options$lineWid,
          _this$options$strokeS = _this$options.strokeStyle,
          strokeStyle = _this$options$strokeS === void 0 ? '#ffd5d5' : _this$options$strokeS;
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.lineWidth = lineWidth;
      this.ctx.lineJoin = lineJoin;
      this.ctx.lineCap = lineCap;
    }
    /**
     * @public
     */

  }, {
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * @public
     */

  }, {
    key: "drawLine",
    value: function drawLine(x1, y1, x2, y2) {
      this.ctx.beginPath();
      this.initCtx();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
    /**
     *
     * @public
     */

  }, {
    key: "mount",
    value: function mount(elem) {
      elem.appendChild(this.canvas);
    }
  }]);

  return Canvas;
}();

var _default = Canvas;
exports.default = _default;
},{}],"Tree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Canvas2 = _interopRequireDefault(require("./Canvas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Tree =
/*#__PURE__*/
function (_Canvas) {
  _inherits(Tree, _Canvas);

  function Tree() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tree);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tree).call(this, {
      strokeStyle: options.color,
      width: options.width,
      height: options.height
    }));

    _this.init(options);

    return _this;
  }

  _createClass(Tree, [{
    key: "setProperty",
    value: function setProperty(propName, value) {
      this[propName] = value === undefined ? this[propName] : value;
    }
  }, {
    key: "init",
    value: function init(options) {
      var width = options.width,
          height = options.height,
          depth = options.depth,
          angle = options.angle,
          length = options.length,
          lengthRatio = options.lengthRatio,
          angleRatio = options.angleRatio,
          tilt = options.tilt,
          topOffset = options.topOffset,
          leftOffset = options.leftOffset;
      this.setProperty('width', width);
      this.setProperty('height', height);
      this.setProperty('topOffset', topOffset);
      this.setProperty('leftOffset', leftOffset);
      this.setProperty('depth', depth);
      this.setProperty('angle', angle);
      this.setProperty('length', length);
      this.setProperty('lengthRatio', lengthRatio);
      this.setProperty('angleRatio', angleRatio);
      this.setProperty('tilt', tilt);
      this.updateDimensions(this.width, this.height);
    }
  }, {
    key: "draw",
    value: function draw() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.init(options);
      this.clear();

      var _this$getInitialCoord = this.getInitialCoords(),
          _this$getInitialCoord2 = _slicedToArray(_this$getInitialCoord, 2),
          x = _this$getInitialCoord2[0],
          y = _this$getInitialCoord2[1];

      this.drawLine(x, y, x, y - this.length);
      this.drawLevel(x, y - this.length, 1, this.tilt + this.angle / 2);
    }
  }, {
    key: "getLength",
    value: function getLength(depth) {
      if (this.length - this.length * this.lengthRatio * depth <= 0) return 0;
      return this.length - this.length * this.lengthRatio * depth;
    }
  }, {
    key: "getInitialCoords",
    value: function getInitialCoords() {
      return [this.width / 2 + this.leftOffset, this.topOffset];
    }
  }, {
    key: "getBranchTop",
    value: function getBranchTop(x, y, angle, radius) {
      var normalizedAngle = angle + 90;
      var radians = normalizedAngle * Math.PI / 180.0;
      var topX = x + radius * Math.cos(radians);
      var topY = y - radius * Math.sin(radians);
      return [topX, topY];
    }
  }, {
    key: "drawLevel",
    value: function drawLevel(x, y, depth, angle) {
      if (depth > this.depth) return;
      var length = this.getLength(depth);

      var _this$drawBranch = this.drawBranch(x, y, angle - this.angle, length),
          _this$drawBranch2 = _slicedToArray(_this$drawBranch, 2),
          leftX = _this$drawBranch2[0],
          leftY = _this$drawBranch2[1];

      var _this$drawBranch3 = this.drawBranch(x, y, angle, length),
          _this$drawBranch4 = _slicedToArray(_this$drawBranch3, 2),
          rightX = _this$drawBranch4[0],
          rightY = _this$drawBranch4[1];

      var newAngle = this.angleRatio + this.angle / 2;
      this.drawLevel(leftX, leftY, depth + 1, this.tilt + angle - newAngle);
      this.drawLevel(rightX, rightY, depth + 1, this.tilt + angle + newAngle);
    }
  }, {
    key: "drawBranch",
    value: function drawBranch(x, y, angle, length) {
      var _this$getBranchTop = this.getBranchTop(x, y, angle, length),
          _this$getBranchTop2 = _slicedToArray(_this$getBranchTop, 2),
          endX = _this$getBranchTop2[0],
          endY = _this$getBranchTop2[1];

      this.drawLine(x, y, endX, endY);
      return [endX, endY];
    }
  }, {
    key: "get",
    value: function get(prop) {
      return this[prop];
    }
  }]);

  return Tree;
}(_Canvas2.default);

var _default = Tree;
exports.default = _default;
},{"./Canvas":"Canvas.js"}],"../node_modules/lodash/isObject.js":[function(require,module,exports) {
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],"../node_modules/lodash/_freeGlobal.js":[function(require,module,exports) {
var global = arguments[3];
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

},{}],"../node_modules/lodash/_root.js":[function(require,module,exports) {
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":"../node_modules/lodash/_freeGlobal.js"}],"../node_modules/lodash/now.js":[function(require,module,exports) {
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":"../node_modules/lodash/_root.js"}],"../node_modules/lodash/_Symbol.js":[function(require,module,exports) {
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":"../node_modules/lodash/_root.js"}],"../node_modules/lodash/_getRawTag.js":[function(require,module,exports) {
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":"../node_modules/lodash/_Symbol.js"}],"../node_modules/lodash/_objectToString.js":[function(require,module,exports) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],"../node_modules/lodash/_baseGetTag.js":[function(require,module,exports) {
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":"../node_modules/lodash/_Symbol.js","./_getRawTag":"../node_modules/lodash/_getRawTag.js","./_objectToString":"../node_modules/lodash/_objectToString.js"}],"../node_modules/lodash/isObjectLike.js":[function(require,module,exports) {
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"../node_modules/lodash/isSymbol.js":[function(require,module,exports) {
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":"../node_modules/lodash/_baseGetTag.js","./isObjectLike":"../node_modules/lodash/isObjectLike.js"}],"../node_modules/lodash/toNumber.js":[function(require,module,exports) {
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":"../node_modules/lodash/isObject.js","./isSymbol":"../node_modules/lodash/isSymbol.js"}],"../node_modules/lodash/debounce.js":[function(require,module,exports) {
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":"../node_modules/lodash/isObject.js","./now":"../node_modules/lodash/now.js","./toNumber":"../node_modules/lodash/toNumber.js"}],"../node_modules/lodash/throttle.js":[function(require,module,exports) {
var debounce = require('./debounce'),
    isObject = require('./isObject');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;

},{"./debounce":"../node_modules/lodash/debounce.js","./isObject":"../node_modules/lodash/isObject.js"}],"Slider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slider =
/*#__PURE__*/
function () {
  function Slider(options) {
    _classCallCheck(this, Slider);

    this.slider = document.createElement('input');
    this.initDisplay(options.displayClassName);
    this.init(options);
  }

  _createClass(Slider, [{
    key: "init",
    value: function init(options) {
      var _this = this;

      var min = options.min,
          max = options.max,
          value = options.value,
          step = options.step,
          name = options.name,
          className = options.className,
          containerClassName = options.containerClassName;
      this.slider.setAttribute('type', 'range');
      this.slider.setAttribute('min', min);
      this.slider.setAttribute('max', max);
      this.slider.setAttribute('step', step);
      this.slider.setAttribute('value', value);
      this.slider.setAttribute('class', className);
      this.containerClassName = containerClassName;
      this.name = name;
      this.addEventListener('input', function (e) {
        return _this.updateDisplay(e.target.value);
      });
      this.updateDisplay(value);
    }
  }, {
    key: "initDisplay",
    value: function initDisplay(className) {
      this.display = document.createElement('span');
      this.display.classList.add(className);
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay(value) {
      this.display.innerHTML = "".concat(this.name, ": ").concat(value);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      var _this$slider;

      (_this$slider = this.slider).addEventListener.apply(_this$slider, arguments);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {
      var _this$slider2;

      (_this$slider2 = this.slider).removeEventListener.apply(_this$slider2, arguments);
    }
  }, {
    key: "mount",
    value: function mount(elem) {
      this.container = document.createElement('div');
      this.container.classList.add(this.containerClassName);
      this.container.appendChild(this.slider);
      this.container.appendChild(this.display);
      elem.appendChild(this.container);
      return this;
    }
  }, {
    key: "unmount",
    value: function unmount() {
      this.container.parentNode.removeChild(this.container);
    }
  }]);

  return Slider;
}();

var _default = Slider;
exports.default = _default;
},{}],"TreeSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _Slider2 = _interopRequireDefault(require("./Slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TreeSlider =
/*#__PURE__*/
function (_Slider) {
  _inherits(TreeSlider, _Slider);

  function TreeSlider(options) {
    var _this;

    _classCallCheck(this, TreeSlider);

    var value = options.value,
        min = options.min,
        max = options.max,
        step = options.step,
        onChange = options.onChange,
        displayName = options.displayName,
        animator = options.animator,
        _options$animationDur = options.animationDuration,
        animationDuration = _options$animationDur === void 0 ? 1000 : _options$animationDur;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeSlider).call(this, {
      value: value,
      min: min,
      max: max,
      step: step,
      name: displayName,
      containerClassName: 'slider-container',
      displayClassName: 'slider-name',
      className: 'slider'
    }));
    _this.animating = false;
    _this.onChange = onChange;
    _this.animation = animator;
    _this.animationDuration = animationDuration;
    _this.value = value;
    _this.animate = _this.animate.bind(_assertThisInitialized(_this));
    _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));

    if (_this.animation) {
      _this.onInput = (0, _throttle.default)(_this.onInput, 100);
    }

    _this.addEventListener('input', _this.onInput);

    _this.addEventListener('mousedown', function (e) {
      return e.stopPropagation();
    });

    _this.onChange(_this.value);

    return _this;
  }

  _createClass(TreeSlider, [{
    key: "finishAnimation",
    value: function finishAnimation() {
      if (this.animation) {
        this.animation.finish();
        this.value = this.animation.value();
        this.onChange(this.value);
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      this.value = this.animation.value();
      this.onChange(this.value);

      if (this.animation.finished) {
        this.animating = false;
        return;
      }

      window.requestAnimationFrame(this.animate);
    }
  }, {
    key: "onInput",
    value: function onInput(e) {
      var value = +e.target.value;

      if (!this.animation) {
        this.onChange(value);
        return;
      }

      this.animation.start(this.value, value, this.animationDuration);

      if (!this.animating) {
        this.animating = true;
        this.animate();
      }
    }
  }]);

  return TreeSlider;
}(_Slider2.default);

var _default = TreeSlider;
exports.default = _default;
},{"lodash/throttle":"../node_modules/lodash/throttle.js","./Slider":"Slider.js"}],"DragCapture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DragDelta =
/*#__PURE__*/
function () {
  function DragDelta() {
    var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var options = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, DragDelta);

    var x = options.x,
        y = options.y,
        onChange = options.onChange;
    this.onChange = onChange;
    this.elem = elem;
    this.x = x();
    this.y = y();
    this.getX = x;
    this.getY = y;
    this.reset = this.reset.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  _createClass(DragDelta, [{
    key: "onMouseMove",
    value: function onMouseMove(e) {
      this.deltaX = e.clientX - this.pressedX;
      this.deltaY = e.clientY - this.pressedY;
      this.onChange([this.x + this.deltaX, this.y + this.deltaY]);
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      this.pressedX = e.clientX;
      this.pressedY = e.clientY;
      this.x = this.getX();
      this.y = this.getY();
      this.elem.addEventListener('mousemove', this.onMouseMove);
      this.elem.addEventListener('mouseup', this.reset);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.elem.removeEventListener('mousemove', this.onMouseMove);
      this.elem.removeEventListener('mouseup', this.reset);
      this.x += this.deltaX;
      this.y += this.deltaY;
    }
  }, {
    key: "capture",
    value: function capture() {
      this.elem.addEventListener('mousedown', this.onMouseDown);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.elem.removeEventListener('mousedown', this.onMouseDown);
    }
  }]);

  return DragDelta;
}();

var _default = DragDelta;
exports.default = _default;
},{}],"ScrollCapture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScrollCapture =
/*#__PURE__*/
function () {
  function ScrollCapture() {
    var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var options = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, ScrollCapture);

    var onChange = options.onChange;
    this.onChange = onChange;
    this.elem = elem;
    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  _createClass(ScrollCapture, [{
    key: "onMouseWheel",
    value: function onMouseWheel(e) {
      if (e.ctrlKey) return;
      this.onChange([e.deltaX, e.deltaY]);
    }
  }, {
    key: "capture",
    value: function capture() {
      this.elem.addEventListener('wheel', this.onMouseWheel);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.elem.removeEventListener('wheel', this.onMouseWheel);
    }
  }]);

  return ScrollCapture;
}();

var _default = ScrollCapture;
exports.default = _default;
},{}],"ZoomCapture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScrollCapture =
/*#__PURE__*/
function () {
  function ScrollCapture() {
    var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var options = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, ScrollCapture);

    var zoom = options.zoom,
        onChange = options.onChange;
    this.onChange = onChange;
    this.elem = elem;
    this.zoom = zoom;
    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  _createClass(ScrollCapture, [{
    key: "onMouseWheel",
    value: function onMouseWheel(e) {
      if (!e.ctrlKey) return;
      this.zoom -= e.deltaY * 0.3;
      this.onChange(this.zoom);
    }
  }, {
    key: "capture",
    value: function capture() {
      this.elem.addEventListener('wheel', this.onMouseWheel);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.elem.removeEventListener('wheel', this.onMouseWheel);
    }
  }]);

  return ScrollCapture;
}();

var _default = ScrollCapture;
exports.default = _default;
},{}],"Animation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animation =
/*#__PURE__*/
function () {
  function Animation() {
    _classCallCheck(this, Animation);

    this.finished = true;
  }

  _createClass(Animation, [{
    key: "start",
    value: function start(from, to, duration) {
      this.finished = false;
      this.startTime = Date.now();
      this.duration = duration;
      this.from = from;
      this.to = to;
    }
  }, {
    key: "finish",
    value: function finish() {
      this.finished = true;
    }
  }, {
    key: "value",
    value: function value() {
      if (this.finished) return this.to;
      var progress = (Date.now() - this.startTime) / this.duration;

      if (progress >= 1) {
        this.finish();

        if (this.cb) {
          this.cb();
        }

        return this.to;
      }

      return this.from + (this.to - this.from) * progress * (2 - progress);
    }
  }, {
    key: "onEnd",
    value: function onEnd(cb) {
      this.cb = cb;
    }
  }]);

  return Animation;
}();

var _default = Animation;
exports.default = _default;
},{}],"../node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel/src/builtins/bundle-url.js"}],"style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel/src/builtins/css-loader.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _Tree = _interopRequireDefault(require("./Tree"));

var _TreeSlider = _interopRequireDefault(require("./TreeSlider"));

var _DragCapture = _interopRequireDefault(require("./DragCapture"));

var _ScrollCapture = _interopRequireDefault(require("./ScrollCapture"));

var _ZoomCapture = _interopRequireDefault(require("./ZoomCapture"));

var _Animation = _interopRequireDefault(require("./Animation"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var animations = true;
var $animate = document.getElementById('animate');
var $animateSwitch = document.getElementById('animate-switch');
var $sliders = document.getElementById('sliders');
var sliders = [];
var FractalTree = new _Tree.default({
  color: '#ffd5d5',
  width: window.innerWidth,
  height: window.innerHeight,
  leftOffset: 0,
  topOffset: window.innerHeight - 200,
  depth: 10,
  angle: 40,
  length: 100,
  tilt: 0,
  angleRatio: 0,
  lengthRatio: 0.1
});
var DragCaptor = new _DragCapture.default(window, {
  x: function x() {
    return FractalTree.get('leftOffset');
  },
  y: function y() {
    return FractalTree.get('topOffset');
  },
  onChange: function onChange(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    FractalTree.draw({
      leftOffset: x,
      topOffset: y
    });
  }
});
var ScrollCaptor = new _ScrollCapture.default(window, {
  onChange: function onChange(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        deltaX = _ref4[0],
        deltaY = _ref4[1];

    FractalTree.draw({
      leftOffset: FractalTree.get('leftOffset') - deltaX,
      topOffset: FractalTree.get('topOffset') - deltaY
    });
  }
});
var ZoomCaptor = new _ZoomCapture.default(window, {
  zoom: FractalTree.get('length'),
  onChange: function onChange(zoom) {
    FractalTree.draw({
      length: zoom
    });
  }
});

var sliderDrawer = function sliderDrawer(prop) {
  return function (value) {
    FractalTree.draw(_defineProperty({}, prop, value));
  };
};

var initSliders = function initSliders() {
  sliders.push(new _TreeSlider.default({
    property: 'depth',
    displayName: 'Depth',
    value: FractalTree.get('depth'),
    min: 0,
    max: 15,
    onChange: sliderDrawer('depth')
  }).mount($sliders));
  sliders.push(new _TreeSlider.default({
    property: 'angle',
    displayName: "Angle\xB0",
    value: FractalTree.get('angle'),
    min: 0,
    max: 180,
    animator: animations && new _Animation.default(),
    onChange: sliderDrawer('angle')
  }).mount($sliders));
  sliders.push(new _TreeSlider.default({
    property: 'length',
    displayName: 'Length',
    value: FractalTree.get('length'),
    min: 0,
    max: 1000,
    animator: animations && new _Animation.default(),
    onChange: sliderDrawer('length')
  }).mount($sliders));
  sliders.push(new _TreeSlider.default({
    property: 'tilt',
    displayName: "Tilt\xB0",
    value: FractalTree.get('tilt'),
    min: -60,
    max: 60,
    animator: animations && new _Animation.default(),
    onChange: sliderDrawer('tilt')
  }).mount($sliders));
  sliders.push(new _TreeSlider.default({
    property: 'angleRatio',
    displayName: 'Angle ratio',
    value: FractalTree.get('angleRatio'),
    min: -180,
    max: 180,
    step: 1,
    animator: animations && new _Animation.default(),
    onChange: sliderDrawer('angleRatio')
  }).mount($sliders));
  sliders.push(new _TreeSlider.default({
    property: 'lengthRatio',
    displayName: 'Length ratio',
    value: FractalTree.get('lengthRatio'),
    min: -1,
    max: 1,
    step: 0.001,
    animator: animations && new _Animation.default(),
    onChange: sliderDrawer('lengthRatio')
  }).mount($sliders));
};

var animation = new _Animation.default();
var animLoop = false;
var startValue = FractalTree.get('lengthRatio');

var animateGrow = function animateGrow(cb) {
  FractalTree.draw({
    lengthRatio: animation.value()
  });

  if (animation.finished) {
    cb();
    return;
  }

  window.requestAnimationFrame(function () {
    return animateGrow(cb);
  });
};

function growUp() {
  if (!animLoop) return;
  animation.start(0.5, startValue, 6000);
  animateGrow(growDown);
}

function growDown() {
  if (!animLoop) return;
  animation.start(startValue, 0.5, 5000);
  animateGrow(growUp);
}

$animate.addEventListener('click', function () {
  animLoop = !animLoop;

  if (animLoop) {
    startValue = FractalTree.get('lengthRatio');
    growDown();
    $animate.innerHTML = 'Animating...';
  } else {
    animation.finish();
    window.requestAnimationFrame(function () {
      FractalTree.draw({
        lengthRatio: startValue
      });
    });
    document.getElementById('animate').innerHTML = 'Animate';
  }
});
$animateSwitch.addEventListener('click', function () {
  animations = !animations;
  sliders.forEach(function (slider) {
    slider.finishAnimation();
    slider.unmount();
  });
  sliders = [];
  $animateSwitch.innerHTML = "Animations: ".concat(animations ? 'on' : 'off');
  initSliders();
});
FractalTree.mount(document.getElementById('root'));
FractalTree.draw();
window.addEventListener('resize', function () {
  FractalTree.draw({
    width: window.innerWidth,
    height: window.innerHeight
  });
});
initSliders();
$animateSwitch.innerHTML = "Animations: ".concat(animations ? 'on' : 'off');
DragCaptor.capture();
ScrollCaptor.capture();
ZoomCaptor.capture();
},{"./Tree":"Tree.js","./TreeSlider":"TreeSlider.js","./DragCapture":"DragCapture.js","./ScrollCapture":"ScrollCapture.js","./ZoomCapture":"ZoomCapture.js","./Animation":"Animation.js","./style.css":"style.css"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56999" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map