import { Form, Input, A, Li, Ul, Button, Div, Frag } from './core.js';

export const Box = (children, props) =>
  Div({
    children,
    ...props
  });

export const Flex = (children, { gap, flexDirection, justifyContent, alignItems, props } = {}) =>
  Box(children, { style: inlineStyle({
    display: 'flex',
    'flex-direction': flexDirection,
    'justify-content': justifyContent,
    'align-items': alignItems,
    gap
  }), ...props });

export const Row = (children, { gap, flexDirection = 'row', justifyContent, alignItems, props } = {}) =>
  Flex(children, { gap, flexDirection, justifyContent, alignItems, ...props });

export const Column = (children, { gap, flexDirection = 'column', justifyContent, alignItems, props } = {}) =>
  Flex(children, { gap, flexDirection, justifyContent, alignItems, ...props });

export const List = (items, props) =>
  Ul({ children: items.map(item => {
    if (typeof item === 'string')
      return Li({ text: item });
    else
      return item;
  }), ...props });

export const Btn = (children, onclick, props) => Button({ ...props, children, onclick });

export const Link = (children, href, props) => A({ ...props, children, href });

export const FauxLink = (children, onclick, href = '#', props) =>
  A({
    ...{
      ...props,
      onclick
    },
    children,
    href
  });

// size: ['span', 'p', 'h1', 'h2', 'h3', 'h4']
export const Text = (children, { type = 'p', props } = {}) =>
  Frag(type, { ...props, children });

export const TextInput = (props) =>
  Input({ type: 'text', ...props });

export const EmailInput = (props) =>
  Input({ type: 'email', ...props });

export const NumberInput = (props) =>
  Input({ type: 'number', ...props });

export function ManagedForm(props = {}, schema) {
  return Form({
    ...props,
    onsubmit: schema.onSubmit ? onSubmit : null,
    children: [...schema.fields, ...props.children]
  });

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    schema.onSubmit(e, data);
  }
}

export const inlineStyle = (style) =>
  Object.keys(style).map(key => style[key] && `${key}:${style[key]}`).filter(Boolean).join(';') + ';';
