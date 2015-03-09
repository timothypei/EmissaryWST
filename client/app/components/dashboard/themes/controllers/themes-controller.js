'use strict';

angular.module('themes')
  .controller('ThemesController', ['$scope', 'ThemesService', function($scope) {
  	$scope.selectedImage = '';
  	$scope.submitTheme = function() {
  		console.log($scope.selectedImage);
  		//console.log("hello!!!!");
  	};
}]);
