$(function() {

  //adds animals in the DB to the DOM
  addToDom();

  //listens to the add button
  $('.addAnimal').on('click', addAnimal);

});

//adds an animal to the animal DB with an ajax call
function addAnimal() {

  //object to be sent in ajax
  var animal = {};

  //fills the object with the form data
  $.each($('.animal-form').serializeArray(), function (i,field) {

    animal[field.name] = field.value;

  });

  //ajax post that adds the new animal to the dom after
  $.post('/animals', animal, function() {

    $('.animal-form').find("input[type=text], textarea").val("");
    addToDom();

  });

}

//adds the DB animals to the DOM with an ajax call
function addToDom() {

  $.get('/animals', function(animals) {

    var $el = $('.target-container');

    $el.empty();

    animals.forEach(function(animal) {

      $el.append('<div class="animal-data">' +
                 '<ul><li>Animal: ' + animal.animal_type + '</li>' +
                 '<li>Quantity: ' + animal.animal_qty + '</li></ul>' +
                 '</div>'
                );

    });

  });

}
