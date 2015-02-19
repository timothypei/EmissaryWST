'use strict';

angular.module('product')
  .service('ProductService', ['$http', function($http) {
      this.getProducts = function() {
        return $http.get('http://localhost:4941/api/products');
      };
  }]);