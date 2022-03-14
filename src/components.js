import { A, Li, Ul, Button, Div, Frag, inlineStyle } from './core.js';

export function Box(children, props) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return Div({
    children,
    ...props
  });
}

export function Flex(children, { gap, flexDirection, justifyContent, alignItems, props } = {}) {
  return Div({ children, style: inlineStyle({
    display: 'flex',
    'flex-direction': flexDirection,
    'justify-content': justifyContent,
    'align-items': alignItems,
    gap
  }), ...props });
}

export function Row(children, { gap, flexDirection = 'row', justifyContent, alignItems, props }) {
  return Flex(children, { gap, flexDirection, justifyContent, alignItems, ...props });
}

export function Column(children, { gap, flexDirection = 'column', justifyContent, alignItems, props }) {
  return Flex(children, { gap, flexDirection, justifyContent, alignItems, ...props });
}

export function List(items, props) {
  return Ul({ children: items.map(item => {
    if (typeof item === 'string')
      return Li({ text: item });
    else
      return item;
  }), ...props });
}

export function Btn(text, onclick, props) {
  return Button({ text, onclick, ...props });
}

export function Link(text, href, props) {
  return A({ text, href, ...props });
}

export function FauxLink(text, onclick, href = '#', props) {
  return A({
    text,
    href,
    ...{
      ...props,
      onclick
    }
  });
}

// size: ['span', 'p', 'h1', 'h2', 'h3', 'h4']
export function Text(text, { type = 'p', props } = {}) {
  return Frag(type, { text, ...props });
}
