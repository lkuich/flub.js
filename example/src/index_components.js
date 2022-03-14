import { App, Frag } from 'https://unpkg.com/flub.js@1.0.0/dist/core.js';
import { Row, Btn, Text, Box, FauxLink } from 'https://unpkg.com/flub.js@1.0.0/dist/components.js';

// Our App's entry point
App(document.body, { children: [
  Home,
  Counter
]});

function Home({ name = 'default' }) {
  return Box([
    FauxLink(`Hello ${name}!`, () => alert(`Hello ${name}!`)),
    (setState) => Btn("Click to change name", () =>
      // To update the component's state, we simply re-call the component
      setState(
        Home({ name: "flub" })
      )
    )
  ]);
}

function Counter({ count = 0 }) {
  return Row([
    Text(`Count: ${count}`, { type: 'h1' }),

    (setState) => Btn("+", () =>
      setState(
        Counter({ count: count + 1 })
      )
    ),

    // We can use a generic Frag to create a button as well
    (setState) => Frag('button', { text: "-", onclick: () =>
      setState(
        Counter({ count: count - 1 })
      )
    }),

  ], { gap: '2px', alignItems: 'center' });
}
