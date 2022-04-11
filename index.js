const fs = require('fs');
const lex = require('./lexer');

function createEngine(filePath, options, callback) {
  //Set paths
  filePath = filePath || './views'; //Default path
  exports.templates = [];
  
  //read file
  fs.readFile(filePath, (err, content) => {
    if(err) {return callback(err)}

    const tokenized = lex(content);
    const rendered = render(tokenized);
    
    return callback(null, rendered);
  });

}

module.exports = createEngine;