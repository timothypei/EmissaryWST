'use strict';

angular.module('signin')
  .controller('SigninController', ['$scope', '$location', 'SigninService', function($scope, $location, SigninService){
  	$scope.user = {email: '', password: ''};
    $scope.err = false; 
  	$scope.login = function(){
  		var account = this;
  		account.dat = {};
  		SigninService.login($scope.user)
      	.success(function(data){
      		console.log($location);
      		$location.path('product');
        	account.dat = data;
        	return data;
      	})
      	.error(function(err){
      		console.log($location);
      		$location.path('product');
       		$scope.err = true; 
       		return err;
     	});
  	};
  	
  
  }]);
