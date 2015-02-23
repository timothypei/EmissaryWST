'use strict';

angular.module('signin')
  .controller('SigninController', ['$scope', 'SigninService', function($scope, signinService){
  	$scope.user = {email: '', password: ''};

    $scope.title = 'Top Sellers in Books'; 

  	$scope.login = function(){
  		$scope.err = true;
  		console.log("fjdklsa");
  	};
  }]);