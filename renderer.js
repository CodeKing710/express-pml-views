function render(tokens, options) {
  const subtemplate = options.subtemplate || false;
  const peek = (i) => {return tokens[i+1]};
  let rendered = subtemplate ? '' :
`<!DOCTYPE html>
<html>`;

  //List of special tags (includes template names when necessary)
  const tags = {
    input: ''
  };

  if(!tokens || tokens === []) {return rendered;}

  for(let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    switch(token.type) {
      case 'directive':
        i = applyDirective(i, token.value);
        break;
      case 'tag':
        i = applyTag(i, token.value);
        break;
      case 'text':
        i = applyText(i, token.value);
        break;
      case 'attrName':
        i = applyAttrs(i);
    }
  }

  return subtemplate ? rendered : rendered + '</html>';

  //Inner funcs
  //Directives
  function applyDirective(i, value) {
    switch(value) {
      case 'template':
        global.cache.templates.push(tokens[++i].value);
        break;
      case 'include':
        //Check if global template cache has value
        const include = tokens[++i].value;
        if(global.cache.templates.includes(include)) {
          //Template exists lets add these tokens to the current render
          let fileContents = '';
          require('fs').readFileSync(`./views/${include}.pml`, (err, content) => {
            fileContents = content;
          });
          let tempTokens = require('./lexer')(fileContents);
          tags[include] = render(tempTokens, {subtemplate: true});
        }
        break;
    }
  
    return ++i;
  }

  //Tags
  function applyTag(i, value) {
    if(tags[value]) {
      //Special tag requires replacement within the code
      rendered += tags[value];
      return ++i;
    }

    if(peek(i).type === 'attrName') {
      //Tag has attributes
      rendered += `<${value} `;
      i = applyAttrs(++i);
      rendered += '>';
    } else if(peek(i).type === 'text') {
      ++i;
      i = applyText(i, tokens[i].value);
    } else if(peek(i).type === 'tag') {
      ++i;
      i = applyTag(i, tokens[i].value);
    }
    rendered += `</${value}>`;

    return ++i;
  }

  //Attributes
  function applyAttrs(i) {
    while(peek(i).type === 'attrValue') {
      rendered += `${tokens[i].value}=${tokens[++i].value}`
      ++i;
    }

    return i;
  }

  //Text
  function applyText(i, value) {
    if(peek(i).type === 'variable') {
      ++i;
      i = applyVariable(i, tokens[i].value);
    }
    rendered += value;

    return ++i;
  }

  //Variable
  function applyVariable(i, value) {
    rendered += options[value];

    return ++i;
  }
}

module.exports = render;