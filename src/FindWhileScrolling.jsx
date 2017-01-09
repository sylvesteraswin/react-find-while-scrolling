import React, {Component, PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import {findDOMNode} from 'react-dom';
import cn from 'classnames';

import AttachHandler from 'react-attach-handler'; // eslint-disable-line no-unused-vars

import * as helpers from './helpers'; // eslint-disable-line no-unused-vars

class FindWhileScrolling extends Component {
    static propTypes = {
        onVisibleHandler: PropTypes.func.isRequired,
        active: PropTypes.bool,
        peek: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.oneOf([
                'top',
                'right',
                'bottom',
                'left',
            ]),
        ]),
        intervalCheck: PropTypes.bool,
        scrollCheck: PropTypes.bool,
        scrollThrottle: PropTypes.number,
        scrollDebounce: PropTypes.number,
        intervalDelay: PropTypes.number,
        wrapperEl: helpers.canUseDom
            ? PropTypes.instanceOf(Element)
            : PropTypes.any,
        children: PropTypes.element,
        minimumGutter: PropTypes.number,
        killAfterFind: PropTypes.bool,
        className: PropTypes.string,
    };

    static defaultProps = {
        active: true,
        peek: false,
        minimumGutter: 0,
        intervalCheck: true,
        intervalDelay: 1000,
        scrollCheck: false,
        scrollDebounce: 250,
        wrapperEl: null,
        killAfterFind: true,
        children: React.createElement('span'),
        className: '',
    };

    state = {
        active: this.props.active,
        visible: false,
        visibleDimensions: {},
    };

    componentDidMount = () => {
        const {active} = this.state;

        if (active) {
            this.startFinding();
        }
    };

    componentWillUnmount = () => {
        const {
            intervalCheck,
        } = this.props;

        if (intervalCheck) {
            this.stopFinding();
        }
    };

    componentWillReceiveProps = (nextProps) => {
        const {active} = nextProps;

        // This is the case when active was inactive and the new props have a true value
        // Set the state to the new props and fire startFinding
        if (active && !this.props.active) {
            this.setState({
                active,
            }, () => {
                this.startFinding();
            });
        } else if(!active && this.state.active) {
            this.stopFinding();
        }
    };

    startFinding = () => {
        const {
            intervalCheck,
            intervalDelay,
            scrollCheck,
        } = this.props;

        // Only create one instance of the interval checker
        if (this.findInterval && !scrollCheck) {
            return;
        }

        if (intervalCheck) {
            this.findInterval = setInterval(this.find, intervalDelay);
            // Call the function for the first time
            // this.find();
        } else if (scrollCheck) {
            this.find();
        }
    };

    stopFinding = () => {
        const {
            intervalCheck,
        } = this.props;

        if (intervalCheck && this.findInterval) {
            this.findInterval = clearInterval(this.findInterval);
        }
    };

    find = () => {
        const el = findDOMNode(this);

        if (!el) {
            return;
        }

        const {
            wrapperEl,
            peek,
            minimumGutter,
            onVisibleHandler,
            killAfterFind,
        } = this.props;

        const {top, left, bottom, right} = el.getBoundingClientRect();

        let wrapperElRect;

        if (wrapperEl) {
            wrapperElRect = wrapperEl.getBoundingClientRect();
        } else {
            wrapperElRect = {
                top: 0,
                left: 0,
                bottom: window.innerHeight || document.documentElement.clientHeight,
                right: window.innerWidth || document.documentElement.clientWidth,
            };
        }

        const {
            top: topWrapper,
            left: leftWrapper,
            bottom: bottomWrapper,
            right: rightWrapper,
        } = wrapperElRect;

        const whatYouCanSeeRect = {
            top: top >= topWrapper,
            left: left >= leftWrapper,
            bottom: bottom <= bottomWrapper,
            right: right <= rightWrapper,
        };

        let canYouSeeMe = whatYouCanSeeRect.top && whatYouCanSeeRect.left
            && whatYouCanSeeRect.bottom
            && whatYouCanSeeRect.right;

        if (peek) {
            let peekABoo = top <= bottomWrapper && bottom >= topWrapper
                && left <= rightWrapper
                && right >= leftWrapper;

            // If peek is a string then need to find is peeking
            if (typeof peek === 'string') {
                peekABoo = whatYouCanSeeRect[peek];
            }

            canYouSeeMe = minimumGutter
                ? peekABoo && top <= (bottomWrapper - minimumGutter)
                : peekABoo;
        }

        const {visible} = this.state;

        if (visible !== canYouSeeMe) {
            this.setState({
                visible: canYouSeeMe,
                visibleDimensions: whatYouCanSeeRect,
                active: killAfterFind ? false : this.state.active,
            }, () => {
                this.stopFinding();
            });

            if (typeof onVisibleHandler === 'function') {
                onVisibleHandler(canYouSeeMe, whatYouCanSeeRect);
            }
        }
    };

    render = () => {
        const {
            children,
            scrollCheck,
            className,
            scrollDebounce: debounce,
            scrollThrottle: throttle,
        } = this.props;

        const {
            active,
        } = this.state;

        const el = React.Children.only(children);

        let opts = {};
        if (throttle) {
            opts = {
                throttle: true,
                throttleDelay: throttle,
            };
        } else {
            opts = {
                debounce: true,
                debounceDelay: debounce,
            };
        }

        return (
            <div ref={r => this.findMe = r} className={cn('visible-traker', className)}>
                {
                    scrollCheck && active &&
                        <AttachHandler target='window' events={{
                            scroll: this.startFinding,
                            opts: opts,
                        }}/>
                }
                {el}
            </div>
        );
    };
}

export default FindWhileScrolling;
