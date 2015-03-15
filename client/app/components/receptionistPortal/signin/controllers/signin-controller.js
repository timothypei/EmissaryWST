'use strict';

angular.module('signin')
  .controller('SigninController', ['$scope', '$rootScope', '$location', 'AuthService', function($scope, $rootScope, $location, AuthService){
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
  		  AuthService.signin($scope.user)
      	 .success(function(data){
          if(data=='Oops! Wrong password'){
            $scope.errMessage = 'Invalid Email/Password'; 
          }
            //redirects to the person's home page when a success
          else{  
            console.log(data);
           $rootScope.token = data.token;
           $rootScope.number = data.company_phone_number;
           $rootScope.company_name = data.company_name;
           $rootScope.admin_id = data.admin_id;
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
