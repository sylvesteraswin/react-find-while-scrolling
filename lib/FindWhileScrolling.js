Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

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
            return _react2.default.createElement(
                'div',
                { ref: function ref(r) {
                        return _this.findMe = r;
                    }, className: 'visible-traker' },
                scrollCheck && _react2.default.createElement(_reactAttachHandler2.default, { target: 'window', events: {
                        scroll: _this.find,
                        opts: {
                            debounce: debounce
                        }
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