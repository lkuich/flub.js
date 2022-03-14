import { App, P, Button, Div, Frag } from './flub.js';

// Our App's entry point
App(document.body, { children: [
  Home,
  Counter
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
  ], class: "home" });
}

function Counter({ count = 0 }) {
  return Div({ children: [
    P({ text: `Count: ${count}` }),

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
  ], class: "counter"});
}