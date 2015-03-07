'use strict';

angular.module('register')
  .controller('RegisterController', ['$scope','$location', 'RegisterService',function($scope,$location, RegisterService){
  		$scope.user = {email: '', password: ''};
      $scope.pass = '';
      $scope.err=false;
      $scope.check = false;
      $scope.errorMessage='';
  		$scope.reg = function(){
        //Email and password fields are empty
        if($scope.user.email==''){
          $scope.errorMessage='Email and Password and mandatory fields';
        }
        //Passwords differ
        else if($scope.pass!=$scope.user.password){
          $scope.errorMessage='Please make sure your passwords match';
          return;
        }
        //Password not 4 characters or more
        else if($scope.pass.length<4){
          $scope.errorMessage='Password must be at least 4 characters';
          return;
        }
        //Did not agree to the terms
        else if(!($scope.check)) {
          $scope.errorMessage='You must agree to the terms and conditions';
          return;
        }
        else{
  		    RegisterService.reg($scope.user)
          //when the API call was a success
      	  .success(function(data){
          $location.path('/thankyou');
          return data;
      	 })
      	 .error(function(err){
            $scope.errorMessage = 'You have already created an account';
       	  	return err;
     	  });
      }
        

  		};
  }]);
