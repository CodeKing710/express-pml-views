const express = require('express');
const app = express();

app.set('view engine','pml');
app.engine('pml',require('../index'));

app.get('/', (req,res) => {
  res.render('test', {title: 'MEMEME'});
})

app.listen(5000, console.log("Listening on 5000..."));