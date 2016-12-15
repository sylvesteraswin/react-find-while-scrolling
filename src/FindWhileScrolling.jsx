import React, {Component, PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import {findDOMNode} from 'react-dom';

import AttachHandler from 'react-attach-handler'; // eslint-disable-line no-unused-vars

import * as helpers from './helpers';

class FindWhileScrolling extends Component {
    static propTypes = {
        onVisibleHandler: PropTypes.func.isRequired,
        active: PropTypes.bool,
        peek: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
        ]),
        intervalCheck: PropTypes.bool,
        scrollCheck: PropTypes.bool,
        intervalDelay: PropTypes.number,
        wrapperEl: (typeof window !== 'undefined')
            ? PropTypes.instanceOf(Element)
            : PropTypes.any,
        children: PropTypes.element,
        minimumTop: PropTypes.number
    };

    static defaultProps = {
        active: true,
        peek: false,
        minimumTop: 0,
        intervalCheck: true,
        intervalDelay: 1000,
        scrollCheck: false,
        scrollDebounce: 250,
        wrapperEl: null,
        children: React.createElement('span')
    };

    static state = {
        visible: false,
        visibleDimensions: {}
    };

    componentDidMount = () => {
        const {active} = this.props;

        if (active) {
            this.startFinding();
        }
    };

    componentWillUnmount = () => {
        this.stopFinding();
    };

    componentWillReceiveProps = (nextProps) => {
        const {active} = nextProps;

        if (active) {
            this.startFinding();
        } else {
            this.stopFinding();
        }
    };

    startFinding = () => {
        // Only create one instance of the interval checker
        if (this.findInterval) {
            return;
        }
        const {intervalCheck, intervalDelay} = this.props;

        if (intervalCheck) {
            this.findInterval = setInterval(this.find, intervalDelay);
            // Call the function for the first time
            this.find();
        }
    };

    stopFinding = () => {
        this.findInterval = clearInterval(this.findInterval);
    };

    find = () => {
        const el = findDOMNode(this);

        if (!el) {
            return;
        }

        const {wrapperEl, peek, minimumTop, onVisibleHandler} = this.props;

        const {top, left, bottom, right} = el.getBoundingClientRect();

        let wrapperElRect;

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

        const {top: topWrapper, left: leftWrapper, bottom: bottomWrapper, right: rightWrapper} = wrapperElRect;

        const whatYouCanSeeRect = {
            top: top >= topWrapper,
            left: left >= leftWrapper,
            bottom: bottom <= bottomWrapper,
            right: right <= rightWrapper
        };

        let canYouSeeMe = whatYouCanSeeRect.top && whatYouCanSeeRect.left && whatYouCanSeeRect.bottom && whatYouCanSeeRect.right;

        if (peek) {
            let peekABoo = rect.top <= bottomWrapper && rect.bottom >= topWrapper && rect.left <= rightWrapper && rect.right >= leftWrapper;

            // If peek is a string then need to find is peeking
            if (typeof peek === 'string') {
                peekABoo = wrapperElRect[peek];
            }

            canYouSeeMe = minimumTop
                ? peekABoo && rect.top <= (wrapperElRect.bottom - minimumTop)
                : peekABoo;
        }

        const {visible} = this.state;

        if (visible !== canYouSeeMe) {
            this.setState({visible: true, visibleDimensions: whatYouCanSeeRect});

            if (typeof onVisibleHandler === 'function') {
                onVisibleHandler(canYouSeeMe, whatYouCanSeeRect);
            }
        }
    };

    render = () => {
        const {children, scrollCheck, scrollDebounce: debounce} = this.props;

        const el = React.Children.only(children);
        return (
            <div ref={r => this.findMe = r} className={'visible-traker'}>
                {scrollCheck && <AttachHandler target='window' events={{
                    scroll: this.find,
                    opts: {
                        debounce
                    }
                }}/>
}
                {el}
            </div>
        );
    };
}

export default FindWhileScrolling;
