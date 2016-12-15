(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["FindWhileScrolling"] = factory(require("react"), require("react-dom"));
	else
		root["FindWhileScrolling"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactAttachHandler = __webpack_require__(4);

	var _reactAttachHandler2 = _interopRequireDefault(_reactAttachHandler);

	var _helpers = __webpack_require__(5);

	var helpers = _interopRequireWildcard(_helpers);

	function _interopRequireWildcard(obj) {
	    if (obj && obj.__esModule) {
	        return obj;
	    } else {
	        var newObj = {};if (obj != null) {
	            for (var key in obj) {
	                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	            }
	        }newObj.default = obj;return newObj;
	    }
	}

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	function _possibleConstructorReturn(self, call) {
	    if (!self) {
	        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} // eslint-disable-line no-unused-vars
	// eslint-disable-line no-unused-vars

	var FindWhileScrolling = function (_Component) {
	    _inherits(FindWhileScrolling, _Component);

	    function FindWhileScrolling() {
	        var _ref;

	        var _temp, _this, _ret;

	        _classCallCheck(this, FindWhileScrolling);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FindWhileScrolling.__proto__ || Object.getPrototypeOf(FindWhileScrolling)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
	            var active = _this.props.active;

	            if (active) {
	                _this.startFinding();
	            }
	        }, _this.componentWillUnmount = function () {
	            _this.stopFinding();
	        }, _this.componentWillReceiveProps = function (nextProps) {
	            var active = nextProps.active;

	            if (active) {
	                _this.startFinding();
	            } else {
	                _this.stopFinding();
	            }
	        }, _this.startFinding = function () {
	            // Only create one instance of the interval checker
	            if (_this.findInterval) {
	                return;
	            }
	            var _this$props = _this.props,
	                intervalCheck = _this$props.intervalCheck,
	                intervalDelay = _this$props.intervalDelay;

	            if (intervalCheck) {
	                _this.findInterval = setInterval(_this.find, intervalDelay);
	                // Call the function for the first time
	                _this.find();
	            }
	        }, _this.stopFinding = function () {
	            _this.findInterval = clearInterval(_this.findInterval);
	        }, _this.find = function () {
	            var el = (0, _reactDom.findDOMNode)(_this);

	            if (!el) {
	                return;
	            }

	            var _this$props2 = _this.props,
	                wrapperEl = _this$props2.wrapperEl,
	                peek = _this$props2.peek,
	                minimumTop = _this$props2.minimumTop,
	                onVisibleHandler = _this$props2.onVisibleHandler;

	            var _el$getBoundingClient = el.getBoundingClientRect(),
	                top = _el$getBoundingClient.top,
	                left = _el$getBoundingClient.left,
	                bottom = _el$getBoundingClient.bottom,
	                right = _el$getBoundingClient.right;

	            var wrapperElRect = void 0;

	            if (wrapperEl) {
	                wrapperElRect = wrapperEl.getBoundingClientRect();
	            } else {
	                wrapperElRect = {
	                    top: 0,
	                    left: 0,
	                    bottom: window.innerHeight || document.documentElement.clientHeight,
	                    right: window.innerWidth || document.documentElement.clientWidth
	                };
	            }

	            var _wrapperElRect = wrapperElRect,
	                topWrapper = _wrapperElRect.top,
	                leftWrapper = _wrapperElRect.left,
	                bottomWrapper = _wrapperElRect.bottom,
	                rightWrapper = _wrapperElRect.right;

	            var whatYouCanSeeRect = {
	                top: top >= topWrapper,
	                left: left >= leftWrapper,
	                bottom: bottom <= bottomWrapper,
	                right: right <= rightWrapper
	            };

	            var canYouSeeMe = whatYouCanSeeRect.top && whatYouCanSeeRect.left && whatYouCanSeeRect.bottom && whatYouCanSeeRect.right;

	            if (peek) {
	                var peekABoo = rect.top <= bottomWrapper && rect.bottom >= topWrapper && rect.left <= rightWrapper && rect.right >= leftWrapper;

	                // If peek is a string then need to find is peeking
	                if (typeof peek === 'string') {
	                    peekABoo = wrapperElRect[peek];
	                }

	                canYouSeeMe = minimumTop ? peekABoo && rect.top <= wrapperElRect.bottom - minimumTop : peekABoo;
	            }

	            var visible = _this.state.visible;

	            if (visible !== canYouSeeMe) {
	                _this.setState({ visible: true, visibleDimensions: whatYouCanSeeRect });

	                if (typeof onVisibleHandler === 'function') {
	                    onVisibleHandler(canYouSeeMe, whatYouCanSeeRect);
	                }
	            }
	        }, _this.render = function () {
	            var _this$props3 = _this.props,
	                children = _this$props3.children,
	                scrollCheck = _this$props3.scrollCheck,
	                debounce = _this$props3.scrollDebounce;

	            var el = _react2.default.Children.only(children);
	            return _react2.default.createElement('div', { ref: function ref(r) {
	                    return _this.findMe = r;
	                }, className: 'visible-traker' }, scrollCheck && _react2.default.createElement(_reactAttachHandler2.default, { target: 'window', events: {
	                    scroll: _this.find,
	                    opts: {
	                        debounce: debounce
	                    }
	                } }), el);
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    return FindWhileScrolling;
	}(_react.Component);

	FindWhileScrolling.propTypes = {
	    onVisibleHandler: _react.PropTypes.func.isRequired,
	    active: _react.PropTypes.bool,
	    peek: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['top', 'right', 'bottom', 'left'])]),
	    intervalCheck: _react.PropTypes.bool,
	    scrollCheck: _react.PropTypes.bool,
	    intervalDelay: _react.PropTypes.number,
	    wrapperEl: typeof window !== 'undefined' ? _react.PropTypes.instanceOf(Element) : _react.PropTypes.any,
	    children: _react.PropTypes.element,
	    minimumTop: _react.PropTypes.number
	};
	FindWhileScrolling.defaultProps = {
	    active: true,
	    peek: false,
	    minimumTop: 0,
	    intervalCheck: true,
	    intervalDelay: 1000,
	    scrollCheck: false,
	    scrollDebounce: 250,
	    wrapperEl: null,
	    children: _react2.default.createElement('span')
	};
	FindWhileScrolling.state = {
	    visible: false,
	    visibleDimensions: {}
	};
	exports.default = FindWhileScrolling;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(2));
		else if(typeof define === 'function' && define.amd)
			define(["react"], factory);
		else if(typeof exports === 'object')
			exports["AttachHandler"] = factory(require("react"));
		else
			root["AttachHandler"] = factory(root["React"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(1).default;

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

		Object.defineProperty(exports, "__esModule", {
		    value: true
		});

		var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		} : function (obj) {
		    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
		};

		var _react = __webpack_require__(2);

		var _react2 = _interopRequireDefault(_react);

		var _reactAddonsShallowCompare = __webpack_require__(3);

		var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

		var _helpers = __webpack_require__(6);

		var helpers = _interopRequireWildcard(_helpers);

		function _interopRequireWildcard(obj) {
		    if (obj && obj.__esModule) {
		        return obj;
		    } else {
		        var newObj = {};if (obj != null) {
		            for (var key in obj) {
		                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
		            }
		        }newObj.default = obj;return newObj;
		    }
		}

		function _interopRequireDefault(obj) {
		    return obj && obj.__esModule ? obj : { default: obj };
		}

		function _classCallCheck(instance, Constructor) {
		    if (!(instance instanceof Constructor)) {
		        throw new TypeError("Cannot call a class as a function");
		    }
		}

		function _possibleConstructorReturn(self, call) {
		    if (!self) {
		        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		    }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
		    if (typeof superClass !== "function" && superClass !== null) {
		        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
		    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		} //eslint-disable-line no-unused-vars


		var defaultEventOptions = {
		    capture: false,
		    passive: false,
		    debounce: false,
		    debounceDelay: 250
		};

		var addEventListener = helpers.addEventListener,
		    removeEventListener = helpers.removeEventListener,
		    passiveOptions = helpers.passiveOptions;

		var mergeOptionsWithDefault = function mergeOptionsWithDefault(obj) {
		    return Object.assign({}, defaultEventOptions, obj);
		};

		var getEventsArgs = function getEventsArgs(eventName, cb, opts) {
		    var args = [eventName, cb];
		    args.push(passiveOptions ? opts : opts.capture);
		    return args;
		};

		// Inspired from http://davidwalsh.name/javascript-debounce-function
		var debounceFn = function debounceFn(cb, delay) {
		    var timeout = void 0;

		    return function () {
		        var context = this;
		        var args = arguments;

		        clearTimeout(timeout);
		        timeout = setTimeout(function () {
		            cb.apply(context, args);
		        }, delay);
		    };
		};

		var switchOn = function switchOn(target, eventName, cb) {
		    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

		    // Only supports modern browsers Sorry IE10- users
		    if (addEventListener) {
		        var _opts$debounce = opts.debounce,
		            debounce = _opts$debounce === undefined ? false : _opts$debounce,
		            debounceDelay = opts.debounceDelay;
		        // http://stackoverflow.com/questions/2891096/addeventlistener-using-apply

		        target.addEventListener.apply(target, getEventsArgs(eventName, debounce ? debounceFn(cb, debounceDelay) : cb, opts));
		    }
		};

		var switchOff = function switchOff(target, eventName, cb) {
		    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

		    // Only supports modern browsers Sorry IE10- users
		    if (removeEventListener) {
		        // http://stackoverflow.com/questions/2891096/addeventlistener-using-apply
		        target.removeEventListener.apply(target, getEventsArgs(eventName, cb, opts));
		    }
		};

		var AttachHandler = function (_Component) {
		    _inherits(AttachHandler, _Component);

		    function AttachHandler() {
		        var _ref;

		        var _temp, _this, _ret;

		        _classCallCheck(this, AttachHandler);

		        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		            args[_key] = arguments[_key];
		        }

		        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AttachHandler.__proto__ || Object.getPrototypeOf(AttachHandler)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.componentDidMount = function () {
		            _this.addEventListener();
		        }, _this.shouldComponentUpdate = function (nextProps) {
		            return (0, _reactAddonsShallowCompare2.default)({
		                props: _this.props,
		                state: _this.state
		            }, nextProps, _this.state);
		        }, _this.componentWillUpdate = function () {
		            _this.addEventListener();
		        }, _this.componentDidUpdate = function () {
		            _this.addEventListener();
		        }, _this.componentWillUnmount = function () {
		            _this.removeEventListener();
		        }, _this.addEventListener = function () {
		            _this.setListeners(switchOn);
		        }, _this.removeEventListener = function () {
		            _this.setListeners(switchOff);
		        }, _this.setListeners = function (switchOnOff) {
		            var _this$props = _this.props,
		                target = _this$props.target,
		                events = _this$props.events;

		            if (target) {
		                (function () {
		                    var element = void 0;

		                    if (typeof target === 'string') {
		                        element = window[target];
		                    }

		                    Object.keys(events).forEach(function (event) {
		                        var value = events[event];
		                        var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
		                        var isObject = valueType === 'object';
		                        var isFunction = valueType === 'function';

		                        // This check is to make sure we have the right typeof value
		                        if (!isObject && !isFunction) {
		                            return;
		                        }
		                        var eventHandler = void 0,
		                            options = void 0;

		                        if (isObject) {
		                            var _value$handler = value.handler,
		                                handler = _value$handler === undefined ? null : _value$handler,
		                                _value$opts = value.opts,
		                                opts = _value$opts === undefined ? {} : _value$opts;

		                            if (handler) {
		                                eventHandler = handler;
		                            }
		                            if (opts) {
		                                options = mergeOptionsWithDefault(opts);
		                            }
		                        } else {
		                            eventHandler = value;
		                        }

		                        if (eventHandler) {
		                            switchOnOff(element, event, eventHandler, options);
		                        }
		                    });
		                })();
		            }
		        }, _this.render = function () {
		            return _this.props.children || null;
		        }, _temp), _possibleConstructorReturn(_this, _ret);
		    }

		    return AttachHandler;
		}(_react.Component);

		AttachHandler.propTypes = {
		    // The Component will take one child
		    children: _react.PropTypes.element,
		    // DOM target to listen to
		    target: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]).isRequired,
		    events: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]).isRequired
		};
		exports.default = AttachHandler;

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(4);

	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 */

		'use strict';

		var shallowEqual = __webpack_require__(5);

		/**
		 * Does a shallow comparison for props and state.
		 * See ReactComponentWithPureRenderMixin
		 * See also https://facebook.github.io/react/docs/shallow-compare.html
		 */
		function shallowCompare(instance, nextProps, nextState) {
		  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
		}

		module.exports = shallowCompare;

	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * @typechecks
		 * 
		 */

		/*eslint-disable no-self-compare */

		'use strict';

		var hasOwnProperty = Object.prototype.hasOwnProperty;

		/**
		 * inlined Object.is polyfill to avoid requiring consumers ship their own
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
		 */
		function is(x, y) {
		  // SameValue algorithm
		  if (x === y) {
		    // Steps 1-5, 7-10
		    // Steps 6.b-6.e: +0 != -0
		    // Added the nonzero y check to make Flow happy, but it is redundant
		    return x !== 0 || y !== 0 || 1 / x === 1 / y;
		  } else {
		    // Step 6.a: NaN == NaN
		    return x !== x && y !== y;
		  }
		}

		/**
		 * Performs equality by iterating through keys on an object and returning false
		 * when any key has values which are not strictly equal between the arguments.
		 * Returns true when the values of all keys are strictly equal.
		 */
		function shallowEqual(objA, objB) {
		  if (is(objA, objB)) {
		    return true;
		  }

		  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
		    return false;
		  }

		  var keysA = Object.keys(objA);
		  var keysB = Object.keys(objB);

		  if (keysA.length !== keysB.length) {
		    return false;
		  }

		  // Test for A's keys different from B.
		  for (var i = 0; i < keysA.length; i++) {
		    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
		      return false;
		    }
		  }

		  return true;
		}

		module.exports = shallowEqual;

	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		// Inspired by https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js
		var canUseDom = exports.canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

		var addEventListener = exports.addEventListener = canUseDom && 'addEventListener' in window;
		var removeEventListener = exports.removeEventListener = canUseDom && 'removeEventListener' in window;

		var defineProperty = function defineProperty(o, p, attr) {
		    return Object.defineProperty(o, p, attr);
		};

		// Passive events
		// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js
		var passiveOptions = exports.passiveOptions = function () {
		    var cache = null;
		    return function () {
		        if (cache !== null) {
		            return cache;
		        }
		        var passiveOptionsSupport = false;
		        try {
		            window.addEventListener('test', null, defineProperty({}, 'passive', {
		                get: function get() {
		                    passiveOptionsSupport = true;
		                }
		            }));
		        } catch (e) {} //eslint-disable-line no-empty

		        cache = passiveOptionsSupport;
		        return passiveOptionsSupport;
		    }();
		}();

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 5 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// Inspired by https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js
	var canUseDom = exports.canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }
/******/ ])
});
;