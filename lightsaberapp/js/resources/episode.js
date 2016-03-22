var lightsaberApp = angular.module("LightsaberApp");

lightsaberApp.factory('Episode', ['$resource', function($resource) {
  return $resource('http://localhost:3000/episodes/:id', {id: '@_id'}, {
    'update': { method:'PUT' }
  });
}]);