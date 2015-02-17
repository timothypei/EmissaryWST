angular.module('products')
  .directive('productTabs', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/product-tabs.html',
      controller: 'TabCtrl',
      controllerAs: 'tab'
    };
  })
  .controller('TabCtrl', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });
