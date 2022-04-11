function lex(src) {
  //Token creator
  const tokenizer = (type, item) => {
    return {type: type, value: item}
  };
  
  const peek = (index) => {
    return src[index+1];
  }
  const tokens = [];
  
  for(let i = 0; i <= src.length; i++) {
    const char = src[i];
    if(i == src.length && char == '\n') {
      return tokens;
    }

    switch(char) {
      case '#':
        i = handleComment(i);
        break;
      case '@':
        i = handleDirective(i);
        break;
      case '$':
        i = handleVariable(i);
        break;
      case ':':
        i = handleTag(i);
        break;
      case '<':
        i = handleAttributes(i);
        break;
      //Handle unknown characters
      case '"':
        i = handleText(i);
        break;
    }
  }

  return tokens;

  //Inner funcs
  //Comments
  function handleComment(index) {
    while(peek(index) != '\n')
      ++index;
    
    return index;
  }

  //Directives
  function handleDirective(index) {
    if(peek(index) != ' ') {
      //Incorrect syntax
      throw new Error('Improper syntax on line: '+(index+1));
    } else {
      ++index; //Skip whitespace marker
      //Track word
      let directive = '';
      while(peek(index) != ' ') {
        directive += src[++index];
      }
      //Track value
      let value = '';
      while(peek(index) != '\n') {
        value += src[++index];
      }

      //Generate tokens
      tokens.push(tokenizer('directive',directive), tokenizer('value',value.trim()));
    }

    return index;
  }

  //Variables
  function handleVariable(index) {
    let variable = '';
    while(peek(index) != '\n') {
      variable += src[++index];
    }
    tokens.push(tokenizer('variable',variable));

    return index;
  }

  //Tags
  function handleTag(index) {
    let tagName = '';
    while(peek(index) != ' ') {
      if(peek(index) == '\n') {
        break;
      }
      tagName += src[++index];
    }
    tokens.push(tokenizer('tag',tagName));

    return index;
  }

  //Attributes
  function handleAttributes(index) {
    let attrNames = [];
    let attrValues = [];
    let holder = '';

    while(peek(index) != '\n') {
      if(peek(index) == '=') {
        attrNames.push(holder);
        holder = '';
        ++index;
      }
      if(peek(index) == ',') {
        attrValues.push(holder);
        holder = '';
        ++index;
      }
      if(peek(index) == '>') {
        attrValues.push(holder);
        break;
      }
      holder+=src[++index];
    }

    attrNames.forEach((name, i) => {
      tokens.push(tokenizer('attrName', name), tokenizer('attrValue', attrValues[i]));
    });

    return index;
  }

  //Text
  function handleText(index) {
    let sentence = '';
    while(peek(index) != '\n') {
      if(peek(index) == '$') {
        index = handleVariable(index);
      }
      sentence += src[++index];
    }
    tokens.push(tokenizer('text',sentence));

    return index;
  }
}

module.exports = lex;