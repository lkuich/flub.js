export function App(body, { children }) {
  const frag = document.createDocumentFragment();
  for (const child of children) {
    if (typeof child === 'function') {
      frag.appendChild(child({}));
    }
    else
      frag.appendChild(child);
  }

  body.innerHTML = '';
  body.appendChild(frag);
}

export function Frag(type, props) {
  const go = document.createElement(type);

  function setState(content) {
    const parent = go.parentNode;
    parent.replaceChild(content, go);
  }

  for (const propName in props) {
    if (propName === 'children') {
      const frag = document.createDocumentFragment();
      
      for (const child of props.children) {
        if (typeof child === 'function') {
          frag.append(child(setState));
        }
        else
          frag.append(child);

          go.appendChild(frag);
      }
    } else if (propName === 'text') {
      go.innerText = props.text;
    }
    else if (propName.startsWith('on') && typeof props[propName] === 'function') {
      go[propName] = props[propName];
    }
    else
      go.setAttribute(propName, props[propName]);
  }

  return go;
}

export function Div(props) {
  const div = Frag('div', props);
  return div;
}

export function P(props) {
  const p = Frag('p', props);
  return p;
}

export function Button(props) {
  const button = Frag('button', props);
  return button;
}

export function Input(props) {
  const input = Frag('input', props);
  return input;
}
