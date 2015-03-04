'use strict';

angular.module('signin')
  .controller('SigninController', ['$scope', '$location', 'SigninService', function($scope, $location, SigninService){
  	$scope.user = {email: '', password: ''};
    $scope.errMessage ='';
    //this function is called when we press the login button
  	$scope.login = function(){
      if($scope.user.email.indexOf('@')==-1||$scope.user.email.indexOf('.')==-1){
        $scope.errMessage = 'Invalid Email/Password'
      }
      else{
  		  var account = this;
        //calls the API to login
  		  SigninService.login($scope.user)
      	 .success(function(data){
          var cookie=data;
          console.log("success");
          console.log('fjdakslfjs');
          console.log(data);
          if(data=='Oops! Wrong password'){
            $scope.errMessage = 'Invalid Email/Password'; 
          }
            //redirects to the person's home page when a success
          else{  
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
