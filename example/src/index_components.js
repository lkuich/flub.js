import { App, Frag, Button } from 'https://unpkg.com/flub.js/dist/core.js';
import { Row, Btn, Text, Box, FauxLink, ManagedForm, TextInput, EmailInput } from 'https://unpkg.com/flub.js/dist/components.js';

App(document.body, { children: [
  Home,
  Counter
]});

function Home({ name = 'default', i = 0, step = 0 }, { setState }) {
  const Frm = step === 0 ? FormExample : SecondFormExample;

  return Box([
    FauxLink(`Hello ${name}! Form reset: ${i} times`, () => alert(`Hello ${name}!`)),
    Btn("Reset Form", () =>
      setState(
        { name: "flub", i: i + 1 }
      )
    ),
    Frm,
    step == 0 && Btn("Next step", () => setState({ step: 1 }))
  ]);
}

function FormExample({ name = 'name...', email = 'email...' }, { setState }) {
  return Box([
    Text(name),
    Text(email),
    ManagedForm({
      name: 'sample-form',
      children: [
        Button({ text: "Submit", type: 'submit' })
      ]
    }, {
      fields: [
        TextInput({ name: 'name', placeholder: 'Name', label: 'Name' }),
        EmailInput({ name: 'email', placeholder: 'Email', label: 'Email' })
      ],
      onSubmit: (e, formData) => setState(formData)
    })
  ]);
}

function SecondFormExample({ address = 'address...' }, { setState }) {
  return Box([
    Text(address),
    ManagedForm({
      name: 'sample-form-2',
      children: [
        Button({ text: "Submit", type: 'submit' })
      ]
    }, {
      fields: [
        TextInput({ name: 'address', placeholder: 'Address', label: 'Address' })
      ],
      onSubmit: (e, formData) => setState(formData)
    })
  ]);
}

function Counter({ count = 0 }, { setState, useCreation }) {
  useCreation(() => {
    console.log('First render');
  });

  return Row([
    Text(`Count: ${count}`, { type: 'h1' }),

    Btn("+", () =>
      setState(
        { count: count + 1 }
      )
    ),

    // We can use a generic Frag to create a button as well
    Frag('button', { text: "-", onclick: () =>
      setState(
        { count: count - 1 }
      )
    })
  ], { gap: '2px', alignItems: 'center' });
}
