'use strict';

angular.module('products')
  .directive('productSpecs', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/product-specs.html'
    };
});