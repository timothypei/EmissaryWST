
module.exports = (function () {
    var ret = {};
    
    ret.dir = function () {
    return {
        restrict: 'E',
        templateUrl: 'components/products/reviews/product-reviews.html',
        controller: function() {
          this.review = {};
          this.addReview = function addReview(product) {
            product.reviews.push(this.reviews);
            this.review = {};
          };
        }, controllerAs: 'reviewCtrl'
      };
    }
    
    return ret;
})();