var express = require('express');
var app = express ();
var bodyParser = require('body-parser');
var path = require('path');
var animals = require('./routes/animals');


app.use(bodyParser.urlencoded({extended:true}));


//sets port to 5000
app.set('port', 5000);

//animal route
app.use('/animals', animals);

//sets the index page and acts as a catchall to send back to the index
app.get('/*', function(req, res) {

  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, "./public", file));

});

//logs that the server is running to the console
app.listen(app.get('port'), function() {

  console.log('server is ready on port: ' + app.get('port'));

});
