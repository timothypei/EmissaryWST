/**
 * Created by eduardo on 2/14/15.
 */
module.exports = (function () {
    var ret = {};
    
    ret.dir = function () {
      return {
        restrict: 'E',
        templateUrl: 'components/products/tabs/product-tabs.html',
        controller: function() {
          this.tab = 1;

          this.isSet = function(checkTab) {
            return this.tab === checkTab;
          };

          this.setTab = function(activeTab) {
            this.tab = activeTab;
          };
        },
        controllerAs: 'tab'
      };
    }
    
    ret.prop = 99;
    
    return ret;
})();