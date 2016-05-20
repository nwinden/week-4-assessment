var express = require('express');
var router = express.Router();
var pg = require('pg');
var randomNumber = require('../modules/randomNumber');
var connectionString = 'postgres://localhost:5432/zoo';


//gets the animals from the animal DB and sends it back to the client JS as an array of objects
router.get('/', function(req, res) {

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM animals ORDER BY id ASC',
      function(err, result) {
        done();

        if (err) {
          res.sendStatus(500);
        }

        res.send(result.rows);

      }

    );

  });

});

//posts a new animal to the DB with help from the randomNumber  module required in
router.post('/', function(req, res) {

  var animal = req.body;

  pg.connect(connectionString, function(err, client, done) {

    if (err) {
      res.sendStatus(500);
    }

    client.query( 'INSERT INTO animals (animal_type, animal_qty)' +
                  'values($1, $2)', [animal.animal_type, parseInt(randomNumber(1,100))],
                  function(err, result) {
                  done();

                  if (err) {
                    res.sendStatus(500);
                  }

                  res.sendStatus(201);

                });

  });

});


//exports the router
module.exports = router;
