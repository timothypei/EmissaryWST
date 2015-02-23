'use strict';

angular.module('signin')
  .controller('SigninController', ['$scope', 'SigninService', function($scope, SigninService){
  	$scope.user = {email: '', password: ''};
    $scope.err = false; 
  	$scope.login = function(){
  		var account = this;
  		account.dat = {};
  		SigninService.login($scope.user)
      	.success(function(data){
      		console.log("fjklsdaf");
        	account.dat = data;
        	return data;
      	})
      	.error(function(err){
       		console.log("There was an error: " + err);
       		return err;
     	});
  	};
  
  }]);