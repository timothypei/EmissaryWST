'use strict';

angular.module('product')
  .directive('productDescription', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/product-description.html'
    };
});