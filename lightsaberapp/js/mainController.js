var lightsaberApp = angular.module("LightsaberApp");

lightsaberApp.controller("MainController", ['$scope', '$resource', function($scope, $resource) {
  // Blank new character for form
  $scope.character = {}

  // Obtain our resource class
  var Character = $resource('http://localhost:3000/characters/:id', {id: '@_id'}, {
    'update': { method:'PUT' }
  });

  // Fetch all todos
  $scope.characters = Character.query();

  // Fetch the clicked todo
  $scope.selectCharacter = function(character) {
    self.selectedCharacter = Character.get({id: character._id});
  };

  // Save as a Constructor
  // $scope.addCharacter = function() {
  //   var character = new Character($scope.character);
  //   character.$save(function(){
  //     $scope.characters.push(character);
  //     $scope.character = {};
  //   });
  // };

  // Create/Update a Character (Class Method)
  $scope.addCharacter = function() {
    if ($scope.character._id) {
      Character.update($scope.character, function(){
        $scope.character = {};
      });
    } else {
      Character.save($scope.character, function(character) {
        $scope.characters.push(character);
        $scope.character = {}
      });
    }
  };

  // Delete a Character
  $scope.deleteCharacter = function(character){
    Character.delete({id: character._id});
    var index = $scope.characters.indexOf(character);
    $scope.characters.splice(index, 1);
  }

  // Fill the form to edit a Character
  $scope.editCharacter = function(character){
    self.character = character;
  }
}]);

/*
MainController.$inject = ['$resource']
function MainController($resource){
  var self = this;

  // Blank new character for form
  this.character = {}

  // Obtain our resource class
  var Character = $resource('http://localhost:3000/characters/:id', {id: '@_id'}, {
    'update': { method:'PUT' }
  });

  // Fetch all todos
  this.characters = Character.query();

  // Fetch the clicked todo
  this.selectCharacter = function(character) {
    self.selectedCharacter = Character.get({id: character._id});
  };

  // Save as a Constructor
  // this.addCharacter = function() {
  //   var character = new Character(self.character);
  //   character.$save(function(){
  //     self.characters.push(character);
  //     self.character = {};
  //   });
  // };

  // Create/Update a Character (Class Method)
  this.addCharacter = function() {
    if (self.character._id) {
      Character.update(self.character, function(){
        self.character = {};
      });
    } else {
      Character.save(self.character, function(character) {
        self.characters.push(character);
        self.character = {}
      });
    }
  };

  // Delete a Character
  this.deleteCharacter = function(character){
    Character.delete({id: character._id});
    var index = self.characters.indexOf(character);
    self.characters.splice(index, 1);
  }

  // Fill the form to edit a Character
  this.editCharacter = function(character){
    self.character = character;
  }
}
*/