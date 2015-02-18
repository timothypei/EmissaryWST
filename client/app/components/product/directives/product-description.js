'use strict';

angular.module('products')
  .directive('productDescription', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/product-description.html'
    };
})