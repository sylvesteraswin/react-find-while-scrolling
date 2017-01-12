Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAttachHandler = require('react-attach-handler');

var _reactAttachHandler2 = _interopRequireDefault(_reactAttachHandler);

var _helpers = require('./helpers');

var helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars
// eslint-disable-line no-unused-vars

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FindWhileScrolling.__proto__ || Object.getPrototypeOf(FindWhileScrolling)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            active: _this.props.active,
            visible: false,
            visibleDimensions: {}
        }, _this.componentDidMount = function () {
            var active = _this.state.active;


            if (active) {
                _this.startFinding();
            }
        }, _this.componentWillUnmount = function () {
            var intervalCheck = _this.props.intervalCheck;


            if (intervalCheck) {
                _this.stopFinding();
            }
        }, _this.componentWillReceiveProps = function (nextProps) {
            var active = nextProps.active;

            // This is the case when active was inactive and the new props have a true value
            // Set the state to the new props and fire startFinding

            if (active && !_this.props.active) {
                _this.setState({
                    active: active
                }, function () {
                    _this.startFinding();
                });
            } else if (!active && _this.state.active) {
                _this.stopFinding();
            }
        }, _this.startFinding = function () {
            var _this$props = _this.props,
                intervalCheck = _this$props.intervalCheck,
                intervalDelay = _this$props.intervalDelay,
                scrollCheck = _this$props.scrollCheck;

            // Only create one instance of the interval checker

            if (_this.findInterval && !scrollCheck) {
                return;
            }

            if (intervalCheck) {
                _this.findInterval = setInterval(_this.find, intervalDelay);
                // Call the function for the first time
                // this.find();
            } else if (scrollCheck) {
                _this.find();
            }
        }, _this.stopFinding = function () {
            var intervalCheck = _this.props.intervalCheck;


            if (intervalCheck && _this.findInterval) {
                _this.findInterval = clearInterval(_this.findInterval);
            }
        }, _this.find = function () {
            var el = (0, _reactDom.findDOMNode)(_this);

            if (!el) {
                return;
            }

            var _this$props2 = _this.props,
                wrapperEl = _this$props2.wrapperEl,
                peek = _this$props2.peek,
                minimumGutter = _this$props2.minimumGutter,
                onVisibleHandler = _this$props2.onVisibleHandler,
                killAfterFind = _this$props2.killAfterFind;

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
                var peekABoo = top <= bottomWrapper && bottom >= topWrapper && left <= rightWrapper && right >= leftWrapper;

                // If peek is a string then need to find is peeking
                if (typeof peek === 'string') {
                    peekABoo = whatYouCanSeeRect[peek];
                }

                canYouSeeMe = minimumGutter ? peekABoo && top <= bottomWrapper - minimumGutter : peekABoo;
            }

            var visible = _this.state.visible;


            if (visible !== canYouSeeMe) {
                _this.setState({
                    visible: canYouSeeMe,
                    visibleDimensions: whatYouCanSeeRect,
                    active: killAfterFind ? false : _this.state.active
                }, function () {
                    _this.stopFinding();
                });

                if (typeof onVisibleHandler === 'function') {
                    onVisibleHandler(canYouSeeMe, whatYouCanSeeRect);
                }
            }
        }, _this.render = function () {
            var _this$props3 = _this.props,
                children = _this$props3.children,
                scrollCheck = _this$props3.scrollCheck,
                className = _this$props3.className,
                debounce = _this$props3.scrollDebounce,
                throttle = _this$props3.scrollThrottle;
            var active = _this.state.active;


            var el = _react2.default.Children.only(children);

            var opts = {};
            if (throttle) {
                opts = {
                    throttle: true,
                    throttleDelay: throttle
                };
            } else {
                opts = {
                    debounce: true,
                    debounceDelay: debounce
                };
            }

            return _react2.default.createElement(
                'div',
                { ref: function ref(r) {
                        return _this.findMe = r;
                    }, className: (0, _classnames2.default)('visible-traker', className) },
                scrollCheck && active && _react2.default.createElement(_reactAttachHandler2.default, { target: 'window', events: {
                        scroll: _this.startFinding,
                        opts: opts
                    } }),
                el
            );
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
    scrollThrottle: _react.PropTypes.number,
    scrollDebounce: _react.PropTypes.number,
    intervalDelay: _react.PropTypes.number,
    wrapperEl: helpers.canUseDom ? _react.PropTypes.instanceOf(Element) : _react.PropTypes.any,
    children: _react.PropTypes.element,
    minimumGutter: _react.PropTypes.number,
    killAfterFind: _react.PropTypes.bool,
    className: _react.PropTypes.string
};
FindWhileScrolling.defaultProps = {
    active: true,
    peek: false,
    minimumGutter: 0,
    intervalCheck: true,
    intervalDelay: 1000,
    scrollCheck: false,
    scrollDebounce: 250,
    wrapperEl: null,
    killAfterFind: true,
    children: _react2.default.createElement('span'),
    className: ''
};
exports.default = FindWhileScrolling;