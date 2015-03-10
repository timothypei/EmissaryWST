'use strict';

angular.module('themes')
  .controller('ThemesController', ['$scope', '$location', 'ThemesService', function($scope, $location) {
  	$scope.theme ={};
    $scope.img =  ['../images/themes/pink_trees.jpg',
                   '../images/themes/city0.jpg',
                   '../images/themes/city1.jpg',
                   '../images/themes/city2.png',
                   '../images/themes/city3.jpg',
                   '../images/themes/colors.jpg',
                   '../images/themes/flamingo1.jpg',
                   '../images/themes/flamingo2.jpg',
                   '../images/themes/lake.jpg',
                   '../images/themes/maverick.png',
                   '../images/themes/old-fashioned.jpg',
                   '../images/themes/tron.jpg',
                   '../images/themes/walkway.jpg'];

    function splitRows(arr, size) {
  		var newArr = [];
  		for(var i = 0; i < arr.length; i += size) {
  			newArr.push(arr.slice(i, i + size));
  		}
  		return newArr;
  	}

  	$scope.splitData = splitRows($scope.img, 3);

  	$scope.selectedImage = { value :'' };
  	var selected = '';


  	$scope.submitTheme = function() {
  		console.log($scope.selectedImage);
  		selected = $scope.img[$scope.selectedImage.value];
  		console.log(selected);
      
  	};

    $scope.cancel = function(){
      console.log("Theme selection canceled. Rerouting...");
      $location.path('/themes'); // Where do we go after cancel is pressed?
    };

}]);
