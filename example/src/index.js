import { App, A, H1, Button, Div, Frag, inlineStyle } from 'https://unpkg.com/flub.js@1.0.0/dist/core.js';

// Our App's entry point
App(document.body, { children: [
  Home,
  Counter
]});

function Home({ name = 'default' }) {
  return Div({ children: [
    A({ text: `Hello ${name}!`, href: '#', onclick: () => alert(`Hello ${name}!`) }),
    (setState) => Button({ text: "Click to change name", onclick: () => {
      // To update the component's state, we simply re-call the component
      setState(
        Home({ name: "flub" })
      );
    }})
  ]});
}

function Counter({ count = 0 }) {
  return Div({ children: [
    H1({ text: `Count: ${count}` }),

    (setState) => Button({ text: "+", onclick: () => {
      setState(
        Counter({ count: count + 1 })
      );
    }}),

    // We can use a generic Frag to create a button as well
    (setState) => Frag('button', { text: "-", onclick: () => {
      setState(
        Counter({ count: count - 1 })
      );
    }}),

  // Notice we can use standard attributes like "class"
  ], style: inlineStyle({ display: 'flex', gap: '2px', 'align-items': 'center' }) });
}
