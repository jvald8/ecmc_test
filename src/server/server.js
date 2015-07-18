var express = require('express'),
secret_stuff = require('./secret_stuff.js'),
app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 3001, function() {
  console.log('server started on 3001')
})

