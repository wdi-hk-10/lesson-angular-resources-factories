var lightsaberApp = angular.module("LightsaberApp");

lightsaberApp.controller("MainController", ['$scope', '$resource', function($scope, $resource) {
  // Blank new character for form
  $scope.character = {};

  // Obtain our resource class
  var Character = $resource('http://localhost:3000/characters/:id', {id: '@_id'}, {
    'update': { method:'PUT' }
  });

  // Fetch all characters
  $scope.characters = Character.query();

  // Fetch the clicked character
  $scope.selectCharacter = function(character) {
    $scope.selectedCharacter = Character.get({id: character._id});
  };

  // Save as a Constructor
  // $scope.addCharacter = function() {
  //   var character = new Character($scope.character);
  //   character.$save(function(){
  //     $scope.characters.push(character);
  //     $scope.character = {};
  //   });
  // };

  // Create/Update a Character
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
    $scope.character = character;
  }
}]);
