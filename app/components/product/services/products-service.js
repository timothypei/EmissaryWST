angular.module('products')
  .service('productService', ['$http', function($http) {
      this.getProducts = function() {
        return $http.get('/products.json');
      };
  }]);