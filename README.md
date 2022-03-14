# flub.js
<img src="https://i.giphy.com/media/G918yAdtAeaqs/giphy.gif" />


With inspiration from React and Flutter, flub is a minimal JS framework (`core` sits around 1.6 kB) for quickly prototyping basic JS frontend apps. Born purely out of the hatrid of working with vanilla JS, and all the hassle of setting up and deploying frameworks like React, Vue, or Angular.

## UNPKG

Import production `core` and `components` libraries from UNPKG

```js
import { App, Frag } from 'https://unpkg.com/flub.js@1.0.0/dist/core.js';
import { Row, Text } from 'https://unpkg.com/flub.js@1.0.0/dist/components.js';
```

## Installation

Point to your `index.js` as a module in your `index.html`

```html
<body>
  <!-- ... -->

  <script src="index.js" type="module"></script>
</body>
```

flub provides a `core` library, that gives you access to underlying supporting elements such as `Div`, `P`, `A`, ect. They all follow a format of `Elm({ children: [], props })`.

In your `index.js`, import `flub` and scaffold your `app`

```js
import { App, Div } from 'flub/core.js';

// Our App's entry point
App(document.body, { children: [
  Div({ text: "Hello world!" })
]});
```

flub also provides a `components` module which adds support for common positional arguments to reduce bracket clutter, as well as some helpful components

```js
import { Box, FauxLink, Btn, Row, Text } from 'flub/components.js';

function Home({ name = 'default' }) {
  // Box is a Div, takes element or an array of elements
  return Box([
    // FaxuLink is an anchor with an onclick listener
    FauxLink(`Hello ${name}!`, () => alert(`Hello ${name}!`)),
    (setState) => Btn("Click to change name", () =>
      // To update the component's state, we simply re-call the component
      setState(
        Home({ name: "flub" })
      )
    ),
    // Row is a flexbox
    Row([
      // Text is a p tag
      Text('Item 1'),
      // We can change the type of tag to be a header
      Text('Item 2', { type: 'h2' })
    ], { gap: '12px' })
  ]);
}
```

## Usage

At it's core, our most basic object is a `Frag`. Each `Frag` has a `type`, and `children`. A `child` can be a DOM Element like so

```js
App(document.body, { children: [
  Div({ text: "Hello world!" })
]});
```

Or a function, which gives us access to the `setState` function, which lets us update our component's state by completely re-rendering the component in the DOM

```js
import { App, Div, P } from 'flub/core.js';

App(document.body, { children: [
  Home
]});

function Home({ name = 'default' }) {
  return Div({ children: [
    P({ text: `Hello ${name}!` }),
    (setState) => Button({ text: "Click to change name", onclick: () => {
      // To update the component's state, we simply re-call the component
      setState(
        Home({ name: "flub" })
      );
    }})
  ]});
}
```

You can pass any function/component you like to `setState`, but to simply re-render our current component with our new state, we just recursively call our `Home` function with its new state.

## Examples

Here's a complete `Counter` app using flub `components`!

```js
import { App } from 'https://unpkg.com/flub.js@1.0.0/dist/core.js';
import { Row, Btn, Text } from 'https://unpkg.com/flub.js@1.0.0/dist/components.js';

App(document.body, { children: [
  Counter
]});

function Counter({ count = 0 }) {
  return Row([
    Text(`Count: ${count}`, { type: 'h1' }),

    (setState) => Btn("+", () =>
      setState(
        Counter({ count: count + 1 })
      )
    ),

    (setState) => Btn("-", () =>
      setState(
        Counter({ count: count - 1 })
      )
    )
  ], { gap: '2px', alignItems: 'center' });
}
```

See [examples](https://github.com/lkuich/flub.js/blob/master/example) for complete examples with pure `core` and `components`.

### Footnotes

Just an experiment! Not for production use.
