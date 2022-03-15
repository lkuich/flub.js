import { App, A, H1, Button, Div, Frag, inlineStyle } from 'https://unpkg.com/flub.js@1.1.0/dist/core.js';

// Our App's entry point
App(document.body, { children: [
  Home,
  Counter
]});

function Home({ name = 'default' }, { setState }) {
  return Div({ children: [
    A({ text: `Hello ${name}!`, href: '#', onclick: () => alert(`Hello ${name}!`) }),
    Button({ text: "Click to change name", onclick: () => {
      setState(
        { name: "flub" }
      );
    }})
  ]});
}

function Counter({ count = 0 }, { setState }) {
  return Div({ children: [
    H1({ text: `Count: ${count}` }),

    Button({ text: "+", onclick: () => {
      setState(
        { count: count + 1 }
      );
    }}),

    // We can use a generic Frag to create a button as well
    Frag('button', { text: "-", onclick: () => {
      setState(
        { count: count - 1 }
      );
    }}),

  // Notice we can use standard attributes like "class"
  ], style: inlineStyle({ display: 'flex', gap: '2px', 'align-items': 'center' }) });
}
