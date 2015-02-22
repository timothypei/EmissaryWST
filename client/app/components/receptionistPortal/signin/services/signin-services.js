'use strict';

angular.module('signin')
  .service('SigninService', ['$http', function($http) {
      this.signin = function() {
        return $http.get('https://blue-jay.herokuapp.com/api/products');
      };
  }]);