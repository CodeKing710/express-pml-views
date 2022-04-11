const {templates} = require('./index');

function render(tokens) {
  const peek = (i) => {return tokens[i+1]};

  for(let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    switch(token.type) {
      case 'directive':
        applyDirective(i, token.value);
        break;
    }
  }
}

function applyDirective(i, value) {
  switch(value) {
    case 'template':
      if(peek(i).type == 'value') {
        templates.push(peek(i).value);
      }
      break;
    case 'include':
      break;
  }

  return ++i;
}

module.exports = render;