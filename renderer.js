function render(tokens, options) {
  const peek = (i) => {return tokens[i+1]};
  const rendered = '<!DOCTYPE html>';
  if(!tokens || tokens === []) {return rendered;}

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
          global.cache.templates.push(peek(i).value);
        }
        break;
      case 'include':
        break;
    }
  
    return ++i;
  }
}

module.exports = render;