export function App(body, { children }) {
  const frag = document.createDocumentFragment();
  for (const child of children) {
    if (typeof child === 'function') {
      let elm = child({}, { setState, onCreate });

      function onCreate(fn) {
        if (fn) fn();
      }

      function setState(params) {
        const content = child(params, { setState, onCreate: () => {} });

        const parent = elm.parentNode;
        parent.replaceChild(content, elm);

        elm = content;
      }

      frag.appendChild(elm);
    }
    else {
      if (child)
        frag.appendChild(child);
    }
  }

  body.innerHTML = '';
  body.appendChild(frag);
}

export function Frag(type, props) {
  const go = document.createElement(type);

  for (const propName in props) {
    if (propName === 'children') {
      const frag = document.createDocumentFragment();
      
      for (const child of props.children) {
        if (typeof child === 'function') {
          let elm = child({}, { setState, onCreate });

          function onCreate(fn) {
            if (fn) fn();
          }

          function setState(params) {
            const content = child(params, { setState, onCreate: () => {} });
            
            const parent = elm.parentNode;
            parent.replaceChild(content, elm);

            elm = content;
          }

          frag.append(elm);
        }
        else {
          if (child)
            frag.append(child);
        }

        go.appendChild(frag);
      }
    } else if (propName === 'text') {
      go.innerText = props.text;
    }
    else if (propName.startsWith('on') && typeof props[propName] === 'function') {
      go[propName] = props[propName];
    }
    else {
      go.setAttribute(propName, props[propName]);
    }
  }

  return go;
}

export function Div(props) {
  return Frag('div', props);
}

export function A(props) {
  return Frag('a', props);
}

export function P(props) {
  return Frag('p', props);
}

export function H1(props) {
  return Frag('h1', props);
}

export function H2(props) {
  return Frag('h2', props);
}

export function H3(props) {
  return Frag('h3', props);
}

export function H4(props) {
  return Frag('h4', props);
}

export function Button(props) {
  return Frag('button', props);
}

export function Input(props) {
  return Frag('input', props);
}

export function Span(props) {
  return Frag('span', props);
}

export function Li(props) {
  return Frag('li', props);
}

export function Ul(props) {
  return Frag('ul', props);
}

export function Form(props) {
  return Frag('form', props);
}

export function Img(props) {
  return Frag('img', props);
}

export function inlineStyle(style) {
  return Object.keys(style).map(key => style[key] && `${key}:${style[key]}`).filter(Boolean).join(';') + ';';
}
