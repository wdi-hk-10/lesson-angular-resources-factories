var lightsaberApp = angular.module("LightsaberApp");

// firstName as a function
/*
lightsaberApp.factory('Character', ['$resource', function($resource) {
  var CharacterResource = $resource('http://localhost:3000/characters/:id', {id: '@_id'}, {
    'update': { method:'PUT' }
  });

  CharacterResource.prototype.firstName = function() {
    if (this.name) {
      if (this.name.indexOf(" ") === -1) return this.name;
      return this.name.slice(0, this.name.indexOf(' '));
    }
  }

  return CharacterResource;
}]);
*/

// firstName as a property
lightsaberApp.factory('Character', ['$resource', function($resource) {
  var CharacterResource = $resource('http://localhost:3000/characters/:id', {id: '@_id'}, {
    'update': { method:'PUT' }
  });

  Object.defineProperty(CharacterResource.prototype, 'firstName', {
    get: function(){
      if (this.name) {
        if (this.name.indexOf(" ") === -1) return this.name;
        return this.name.slice(0, this.name.indexOf(" "));
      }
    }
  });

  return CharacterResource;
}]);

