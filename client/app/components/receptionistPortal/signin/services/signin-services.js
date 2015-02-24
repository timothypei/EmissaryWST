'use strict';

angular.module('signin')
  .service('SigninService', ['$http', function($http) {
      this.login = function(user) {
        console.log($http.post('https://blue-jay.herokuapp.com/api/login', user));
        return $http.post('https://blue-jay.herokuapp.com/api/login', user);
      };
  }]);