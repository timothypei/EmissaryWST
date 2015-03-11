'use strict';

angular.module('dashboard')
  .controller('ThemesController', ['$scope', '$location', '$rootScope', 'ThemesService', function($scope, $location, $rootScope, ThemesService) {
    $scope.message = '';
    $scope.theme = {form_color: 'default',
                    background_img: 'default',
                    displayPhone : true,
                    diplayClock: true,
                    displaySignature: true,
                    additionalComments: true};

    // add new background themes to this list. View will update dynamically
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


  	$scope.submitTheme = function() {
  		$scope.theme.background_img = $scope.img[$scope.selectedImage.value];
      var hasTheme = false;
      ThemesService.read().success(function(data){
         // $location.path('/dashboard'); // route needs to be set
         console.log('currently has');
         console.log(data);
          return data;
        })
        .error(function(err){
          console.log("Theme selction failed.");
          return err;
        });

      if($scope.selectedImage.value != ''){
        ThemesService.update($scope.theme)
          .success(function(data){
            // $location.path('/dashboard'); // route needs to be set
            console.log("updated");
            console.log(data);
            $scope.message = "Theme updated successfully!";
            return data;
          })
          .error(function(err){
            $scope.message = 'Error selecting theme.';
            console.log("Theme selction failed.");
            return err;
          });
        } else {
          $scope.message = "Please select an image first."
        }
  	};

    $scope.cancel = function(){
      console.log("Theme selection canceled. Rerouting...");
      $location.path('/themes'); // Where do we go after cancel is pressed?
    };
}]);
