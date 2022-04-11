function render(tokens) {
  const peek = (i) => {return tokens[i+1]};
  const rendered = '';

  for(let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    switch(token.type) {
      case 'directive':
        i = applyDirective(i, token.value);
        break;
    }
  }

  return rendered;

  //Inner funcs
  function applyDirective(i, value) {
    switch(value) {
      case 'template':
        if(peek(i).type == 'value') {
          global.templates.push(peek(i).value);
        }
        break;
      case 'include':
        break;
    }
  
    return ++i;
  }
}

module.exports = render;