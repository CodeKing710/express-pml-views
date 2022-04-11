//Token creator
const tokenizer = (type, item) => {
  return {type: type, value: item}
};

function lex(src) {
  // console.log(src);
  const peek = (index) => {
    return src[index+1];
  }
  const tokens = [];
  
  for(let i = 0; i < src.length; i++) {
    const char = src[i];

    switch(char) {
      case '#':
        i = handleComment(i);
        break;
      case '@':
        i = handleDirective(i);
        break;
      
      //Handle unknown characters
      default:
        continue;
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
}



module.exports = lex;