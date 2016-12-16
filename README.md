# react-find-while-scrolling

Tracking when any of your components show up in the viewport of a user.

## Install
```
npm install react-find-while-scrolling
```

## Example
```js
import FindWhileScrolling from 'react-find-while-scrolling'

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
```

## Props
* `active`: Boolean, default `true`.
* `peek`: Boolean or One fo `left`, `right`, `bottom` & `top`.
* `onVisibleHandler`: Function, `callback(<Visible Boolean>, <Visible Rectangle Object>)`.
* `intervalCheck`: Boolean, Use `setInterval` to find the items.
* `scrollCheck`: Boolean, Use `scroll` event to find the items.
* `intervalDelay`: Number, default `1000`. `setInterval` timing.
* `wrapperEl`: Element, default `document`.
* `children`: Element, the element to be tracked.
* `minimumGutter`: Number, default `0`.
* `killAfterFind`: Boolean, Kill the find of events after the first time.
* `className`: String,

## Build the example locally
```
git clone https://github.com/sylvesteraswin/react-find-while-scrolling
npm install
npm start
```

## License

MIT

## Collaboration
Feel free to contribute and or provide feedback.
