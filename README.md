# flub

With inspiration from React and Flutter, flub is a minimal JS framework for quickly prototyping basic JS frontend apps.

## Installation

Point to your `index.js` as a module in your `index.html`

```html
<body>
  <!-- ... -->

  <script src="src/index.js" type="module"></script>
</body>
```

In your `index.js`, import `flub` and scaffold your `app`

```js
import { App, Div } from 'flub';

// Our App's entry point
App(document.body, { children: [
  Div({ text: "Hello world!" })
]});
```

## Usage

At it's core, our most basic object is a `Frag`. Each `Frag` has a `type`, and `children`. A `child` can be a DOM Element like so

```js
App(document.body, { children: [
  Div({ text: "Hello world!" })
]});
```

Or a function, which gives us access to the `setState` function, which lets us update our component's state

```js
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

You can pass any function you like to `setState`, but to simply re-render our component with our new state, we just recursively call our `Home` function with its new state.

### Footnotes

Just an experiment! Not for production use.