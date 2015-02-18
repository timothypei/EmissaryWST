'use strict';

angular.module('products')
  .directive('productGallery', function(){
    return {
      restrict: 'E',
      templateUrl: 'views/product-gallery.html ',
      controller: 'GalleryCtrl',
      controllerAs: 'gallery'
    };
  })
  .controller('GalleryCtrl', function(){
    this.current = 0;
    this.setCurrent = function(newGallery){
      this.current = newGallery || 0;
    };
  });