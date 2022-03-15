const _isFn = (fn) => typeof fn === 'function';
const _frag = () => document.createDocumentFragment();

function buildChild(child) {
  if (_isFn(child)) {
    const useCreation = (fn) => fn();

    function setState(params) {
      const content = child(params, { setState, useCreation: () => {} });
      elm.replaceWith(content);
      elm = content;
    }

    let elm = child({}, { setState, useCreation });
    return elm;
  }
  else {
    return child;
  }
}

export function App(body, { children }) {
  const frag = _frag();
  for (const child of children) {
    if (child) {
      frag.append(buildChild(child));
    }
  }

  body.replaceChildren(frag);
}

export function Frag(type, props) {
  const elm = document.createElement(type);

  for (const propName in props) {
    if (propName === 'children') {
      const frag = _frag();
      
      for (const child of props.children) {
        if (child) {
          frag.append(buildChild(child));
        }
      }

      elm.append(frag);
    } else if (propName === 'text') {
      elm.innerText = props.text;
    }
    else if (propName.startsWith('on') && _isFn(props[propName])) {
      elm[propName] = props[propName];
    }
    else {
      elm.setAttribute(propName, props[propName]);
    }
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
