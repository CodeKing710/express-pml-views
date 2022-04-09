const fs = require('fs');
function createEngine(filePath, options, callback) {
  filePath = './views' || filePath; //Default path
  fs.readFile(filePath, (err, content) => {
    if(err) return callback(err);

    //Begin parsing
    content = content.toString()
    
    const keyList = {
      tag: /\$(\w|\W)+/g,
      attr: />(\w|\W)+/g,
      expr: /(\w|\W)+=(\w|\W)+/g,
      ref: /"(\w|\W)+"/g
    };
    const replacements = {
      tag: null,
      attr: null,
      expr: null,
      ref: null
    }

    const rendered = () => {
      for (const key in keyList) {
        content = content.replace(key, replacements[key])
      }
    }
  });
}

module.exports = createEngine