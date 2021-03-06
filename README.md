# flub.js
<img src="https://i.giphy.com/media/G918yAdtAeaqs/giphy.gif" />

With inspiration from React and Flutter, flub is a minimal JS framework (`core` sits little over 1 kB) for quickly prototyping basic JS frontend apps. Born purely out of the hatred of working with vanilla JS, and all the hassle of setting up and deploying frameworks like React, Vue, or Angular; flub is meant to be a helper where other, more heavy handed solutions might not be warranted.

Some advantages of flub.js:
- Vanilla JS, no external dependancies, components are just POCO functions, no compilation, virtual DOM, translation, ect
- Extensible, since it's just functions, you can easily wrap components in your own functions to give them default properties and behaviour
- Simple, no surprises, no new API's to learn, functions simply pass their props as HTML attributes:<br />`Img({ src: '...', class: 'apple' })` === `<img src="..." class="apple" />`
- Stupid simple state, `setState` and `useCreation` are provided to your component to update a components own state. The component is completely re-rendered with each state update
- Easy to integrate and isolate, your components can attach to specific HTML elements, your entire app doesn't have to be in flub
- Tiny, there's really not much going on here.

## UNPKG

Import production `core` and `components` libraries from UNPKG

```js
import { App, Frag } from 'https://unpkg.com/flub.js/dist/core.js';
import { Row, Text } from 'https://unpkg.com/flub.js/dist/components.js';
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

function Home({ name = 'default' }, { setState, useCreation }) {
  useCreation(() => console.log("This will only run on first render"));

  console.log("However this will run every render");

  // Box is a Div, takes element or an array of elements
  return Box([
    // FaxuLink is an anchor with an onclick listener
    FauxLink(`Hello ${name}!`, () => alert(`Hello ${name}!`)),
    Btn("Click to change name", () =>
      // To update the component's state, call setState provided in the function params
      setState({ name: "flub" })
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

At it's core, our most basic object is a `Frag`. Each `Frag` has a `type`, and `children`. A `child` can be a DOM Element like so:

```js
App(document.body, { children: [
  Div({ text: "Hello world!" })
]});
```

Or a function signature, which gives us access to the `setState` function, which lets us update our component's state by completely re-rendering the component in the DOM

```js
import { App, Div, P } from 'flub/core.js';

App(document.body, { children: [
  Home
]});

function Home({ name = 'default' }, { setState }) {
  return Div({ children: [
    P({ text: `Hello ${name}!` }),
    Button({ text: "Click to change name", onclick: () => {
      setState({ name: "flub" });
    }})
  ]});
}
```

## Examples

Here's a simple `Counter` app using `flub components`!

```js
import { App } from 'https://unpkg.com/flub.js/dist/core.js';
import { Row, Btn, Text } from 'https://unpkg.com/flub.js/dist/components.js';

App(document.body, { children: [
  Counter
]});

function Counter({ count = 0 }, { setState }) {
  return Row([
    // Since we want to pass 'count' to a child component,
    //  we have to supply the prop, and it's hooks (so it can access setState, and useCreation!)
    (_, hooks) => CounterLabel({ ..._, count }, hooks),

    Btn("+", () =>
      setState({ count: count + 1 })
    ),

    Btn("-", () =>
      setState({ count: count - 1 })
    )
  ], { gap: '2px', alignItems: 'center' });
}

function CounterLabel({ count = 0 }) {
  return Text(`Count: ${count}`, { type: 'h1' });
}
```

Check out the [SnapShot flub app](https://codesandbox.io/s/lingering-darkness-640hgr?fontsize=14&hidenavigation=1&theme=dark) for a more complete example!

[![Edit lingering-darkness-640hgr](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/lingering-darkness-640hgr?fontsize=14&hidenavigation=1&theme=dark)

### Footnotes

Just an experiment! Major API changes inbound, not for production use.
