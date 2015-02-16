angular.module('robobetty', ['$resource'])
  .factory('Doctor', function($resource) {
    return $resource("/doctors/:userId", {userId: '@_id'});
});