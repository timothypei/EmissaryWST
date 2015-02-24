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
        	account.dat = data;
        	$location.path(data.successRedirect);
        	return data;
      	})
      	.error(function(err){
      		console.log($location);
       		$scope.err = true; 
       		return err;
     	});
  	};
  	
  
  }]);
