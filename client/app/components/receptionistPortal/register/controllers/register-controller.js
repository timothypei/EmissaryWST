'use strict';

angular.module('register')
  .controller('RegisterController', ['$scope', 'RegisterService',function($scope, RegisterService){
  		$scope.user = {email: '', password: ''};
      $scope.pass = '';
      $scope.err=false;
      $scope.errorMessage='';
  		$scope.reg = function(){
        //display the error message if passwords differ
        if($scope.pass!=$scope.user.password){
          $scope.err = true;
          $scope.errorMessage='Please make sure your passwords match';
          return;
        }
        //display the error message if passwords differ
        else if($scope.pass.length<4){
          $scope.err = true;
          $scope.errorMessage='Password must be at least 4 characters';
          return;
        }
        else{
  		    RegisterService.reg($scope.user)
          //when the API call was a success
      	  .success(function(data){
        	account.dat = data;
          	return data;
      	 })
      	 .error(function(err){
       	  	return err;
     	  });
      }
        

  		};
  }]);
