'use strict';

angular.module('register')
  .controller('RegisterController', ['$scope', 'RegisterService',function($scope, RegisterService){
  		$scope.user = {email: '', password: ''};
      $scope.pass = '';
  		$scope.reg = function(){
  		RegisterService.reg($scope.user)
      	.success(function(data){

      		console.log($location);
        	account.dat = data;
        	$location.path(data.successRedirect);
        	return data;
      	})
      	.error(function(err){
      		console.log($scope.user);
      		console.log($location);
      		$location.path('product');
       		$scope.err = true; 
       		return err;
     	});
  		};
  }]);
