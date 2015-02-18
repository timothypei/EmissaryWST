'use strict';

angular.module('products')
  .directive('productReviews', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/product-reviews.html',
      controller: 'ReviewCtrl',
      controllerAs: 'reviewCtrl'
    };
  })
  .controller('ReviewCtrl', function() {
    this.review = {};
    this.review.createdOn = Date.now();
    this.addReview = function addReview(product) {
      product.reviews.push(this.review);
      this.review = {};
    };
  });