import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import FindWhileScrolling from '../../lib/FindWhileScrolling';

class Sections extends Component {
    state = {
        visible: false,
    };

    handleVisible = (number) => {
        this.setState({
            visible: true,
        }, () => {
            console.log(number);
        });
    };

    render = () => {
        return (
            <div className="cf flex flex-row items-start flex-auto">
                <FindWhileScrolling
                    peek
                    active
                    className={'w-25'}
                    wrapperEl={this.props.wrapperEl()}
                    onVisibleHandler={() => this.handleVisible('1')}>
                    <div className="fl w-100 tc pv5 bg-black-20">
                        1
                    </div>
                </FindWhileScrolling>
                <FindWhileScrolling
                    peek
                    active
                    className={'w-25'}
                    wrapperEl={this.props.wrapperEl()}
                    onVisibleHandler={() => this.handleVisible('2')}>
                    <div className="fl w-100 tc pv5 bg-black-10">
                        2
                    </div>
                </FindWhileScrolling>
                <FindWhileScrolling
                    peek
                    active
                    className={'w-25'}
                    wrapperEl={this.props.wrapperEl()}
                    onVisibleHandler={() => this.handleVisible('3')}>
                    <div className="fl w-100 tc pv5 bg-black-05">
                        3
                    </div>
                </FindWhileScrolling>
                <FindWhileScrolling
                    peek
                    active
                    className={'w-25'}
                    wrapperEl={this.props.wrapperEl()}
                    onVisibleHandler={() => this.handleVisible('4')}>
                    <div className="fl w-100 tc pv5 bg-black-10">
                        4
                    </div>
                </FindWhileScrolling>
                <FindWhileScrolling
                    peek
                    active
                    className={'w-25'}
                    wrapperEl={this.props.wrapperEl()}
                    onVisibleHandler={() => this.handleVisible('5')}>
                    <div className="fl w-100 tc pv5 bg-black-05">
                        5
                    </div>
                </FindWhileScrolling>
            </div>
        );
    };
}

class Tagline extends Component {
    state = {
        visible: false,
    };

    handleVisible = () => {
        this.setState({
            visible: true,
        }, () => {
            console.log('Found tagline');
        });
    };

    render = () => {
        return (
            <FindWhileScrolling
                active
                onVisibleHandler={this.handleVisible}>
                <article
                    className="mt7 mw7 center ph3 ph5-ns tc br2 pv5 bg-washed-green dark-green mb5">
                    <h1
                        className="fw6 f3 f2-ns lh-title mt0 mb3">
                        This is a tagline. For x.
                    </h1>
                    <h2
                        className="fw2 f4 lh-copy mt0 mb3">
                        This will change things. And we want you to be involved. This text needs to be longer for testing sake.
                    </h2>
                    <p
                        className="fw1 f5 mt0 mb3">
                        Sign up for beta access or learn more about x.
                    </p>
                    <div>
                        <a
                            className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
                        href="#">
                            Sign Up
                        </a>
                        <a
                            className="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
                        href="#">
                            Learn More
                        </a>
                    </div>
                </article>
            </FindWhileScrolling>
        );
    };
}

class Title extends Component {
    state = {
        visible: false,
    };

    handleVisible = () => {
        this.setState({
            visible: true,
        }, () => {
            console.log('Found title');
        });
    };

    render = () => {
        return (
            <FindWhileScrolling
                active
                onVisibleHandler={this.handleVisible}>
                <article
                    className="pa3 pa5-ns mt7">
                    <h1
                        className="f3 f1-m f-headline-l">Title</h1>
                    <p
                        className="measure lh-copy">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <p
                        className="measure lh-copy">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                </article>
            </FindWhileScrolling>
        );
    };
}

class App extends Component {

    state = {
        wrapperRender: false,
    };

    returnWrapperEl = () => {
        return this.refs.wrapperEl;
    };

    addWrapperEl = () => {
        this.setState({
            wrapperRender: !this.state.wrapperRender,
        });
    };

    render = () => {

        return (
            <section
                className="app">
                <Title />
                <Tagline />

                <div
                    ref={'wrapperEl'}
                    className="overflow-auto relative center bb b--black bl br bt"
                    style={{
                        width: "500px",
                        height: "500px"
                    }}
                    >
                    <div
                        className={"bg-black-05"}
                        style={{
                            width: '1000px',
                            height: '1000px',
                        }}
                    >
                        {
                            this.state.wrapperRender &&
                            <Sections
                                wrapperEl={this.returnWrapperEl} />
                        }
                    </div>
                </div>

                <div
                    className="pa3 tc">
                    <a
                        onClick={this.addWrapperEl}
                        className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue">
                        Add Wrapper El
                    </a>
                </div>
            </section>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
