
//creates a random number
var randomNumber = function(min, max) {
  return Math.random() * ((max - min) + min);
};

//exports the random number function
module.exports = randomNumber;
