'use strict';

angular.module('checkin')
  .service('CheckinService', ['$http', function($http) {
  	  this.login = function(user) {
        return $http.post('/auth/login', user);
      };
  }]);