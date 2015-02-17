angular.module('products')
  .service('productService', ['$http', function($http) {
      this.getProducts = function() {
        return $http.get('http://localhost:4941/product');
      };
  }]);