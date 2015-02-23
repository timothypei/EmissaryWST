'use strict';

angular.module('theme')
  .directive('themeChoice', function() {
  	return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/formBuilder/themeChoice/views/themeChoice.html',
      controller: 'ThemeController',
      controllerAs: 'themeCtrl'
    };
  })
  .controller('ThemeController', function(){

});