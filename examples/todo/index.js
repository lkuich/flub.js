import { App, Button } from 'https://unpkg.com/flub.js/dist/core.js';
import { Column, ManagedForm, TextInput, List } from 'https://unpkg.com/flub.js/dist/components.js';

App(document.body, { children: [
  TodoList
]});

function TodoList({ items = [] }, { setState }) {
  return Column([
    ManagedForm({
      name: 'add-form',
      children: [
        Button({ text: "Add", type: 'submit' })
      ]
    }, {
      fields: [
        TextInput({ name: 'item', placeholder: 'Item', label: 'Add Todo' })
      ],
      onSubmit: (e, { item }) => setState({ items: items.concat(item) })
    }),
    List(items)
  ]);
}
