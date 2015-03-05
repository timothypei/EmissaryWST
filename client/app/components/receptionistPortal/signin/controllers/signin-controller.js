'use strict';

angular.module('signin')
  .controller('SigninController', ['$scope', '$rootScope', '$location', 'SigninService', function($scope, $rootScope, $location, SigninService){
  	$scope.user = {email: '', password: ''};
    $scope.errMessage ='';
    console.log("test");
    //this function is called when we press the login button
  	$scope.login = function(){
      console.log("test");
      if($scope.user.email.indexOf('@')==-1||$scope.user.email.indexOf('.')==-1){
        $scope.errMessage = 'Invalid Email/Password'
      }
      else{
  		  var account = this;
        //calls the API to login
  		  SigninService.login($scope.user)
      	 .success(function(data){
          if(data=='Oops! Wrong password'){
            $scope.errMessage = 'Invalid Email/Password'; 
          }
            //redirects to the person's home page when a success
          else{  
           $rootScope.token = data.token;
           $rootScope.email = $scope.user.email;
        	 $location.path('../../../dashboard/views/dashboard.html');
        	 return data;
          }
      	 })
      	 .error(function(err){
          console.log("failure");
       	  	$scope.errMessage = 'Invalid Email/Password'; 
       	  	return err;
     	  });
      }
  	};
  }]);
