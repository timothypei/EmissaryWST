/**
 * Created by eduardo on 2/14/15.
 */
module.exports = (function () {
    var ret = {};
    
    ret.dir = function () {
    return {
        restrict: 'E',
        templateUrl: '..//gallery/product-gallery.html',
        controller: function() {
          this.current = 0;
          this.setCurrent = function(imageNumber){
            this.current = imageNumber || 0;
          };
        },
        controllerAs: 'gallery'
      };
    }
    
    return ret;
})();