'use strict';

angular.module('register')
  .service('RegisterService', ['$http', function($http) {
      this.reg = function(user) {
      	console.log($http.post('https://blue-jay.herokuapp.com/api/template', user));
        return $http.post('https://blue-jay.herokuapp.com/api/template', user);
      };
  }]);