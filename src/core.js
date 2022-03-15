const isFn = (fn) => typeof fn === 'function';

const buildFrag = (children) => {
  const frag = document.createDocumentFragment();
  children.forEach(child => {
    const childElm = buildChild(child);
    if (childElm) frag.append(childElm)
  });

  return frag;
}

function buildChild(child) {
  if (isFn(child)) {
    const useCreation = (fn) => fn();

    function setState(params) {
      const content = child(params, { setState, useCreation: () => {} });
      elm.replaceWith(content);
      elm = content;
    }

    let elm = child({}, { setState, useCreation });
    return elm;
  }

  return child;
}

export function App(elm, { children }) {
  elm.replaceChildren(
    buildFrag(children)
  );
}

export function Frag(type, props) {
  const elm = document.createElement(type);

  for (const propName in props) {
    if (propName === 'children')
      elm.append(
        buildFrag(props.children)
      );
    else if (propName === 'text')
      elm.innerText = props.text;
    else if (propName.startsWith('on') && isFn(props[propName]))
      elm[propName] = props[propName];
    else
      elm.setAttribute(propName, props[propName]);
  }

  return elm;
}

export const Div = (props) => Frag('div', props);
export const A = (props) => Frag('a', props);
export const P = (props) => Frag('p', props);
export const H = ({ h = 1, ...props }) => Frag(`h${h}`, props);
export const Button = (props) => Frag('button', props);
export const Input = (props) => Frag('input', props);
export const Span = (props) => Frag('span', props);
export const Li = (props) => Frag('li', props);
export const Ul = (props) => Frag('ul', props);
export const Form = (props) => Frag('form', props);
export const Img = (props) => Frag('img', props);
