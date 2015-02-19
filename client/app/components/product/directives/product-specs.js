'use strict';

angular.module('product')
  .directive('productSpecs', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/product-specs.html'
    };
});