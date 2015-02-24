'use strict';

angular.module('signin')
  .controller('SigninController', ['$scope', '$location', 'SigninService', function($scope, $location, SigninService){
  	$scope.user = {email: '', password: ''};
    $scope.err = false; 
    //this function is called when we press the login button
  	$scope.login = function(){
  		var account = this;
  		account.dat = {};
      //calls the API to login
  		SigninService.login($scope.user)
      	.success(function(data){
        	account.dat = data;
          //redirects to the person's home page when a success
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
