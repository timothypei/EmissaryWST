'use strict';

angular.module('checkin')
  .controller('CheckinController', ['$scope', '$rootScope','$timeout', '$location', 'CheckinService', function($scope,$rootScope,$timeout,$location, CheckinService){

    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms
    $scope.user = {email: $rootScope.email, password: ''};

    var tick = function () {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
        
    }
    $scope.checkin = function(){
        $location.path('/thankyouCheckIn');
    }
    // Start the timer

    $timeout(tick, $scope.tickInterval);
  }]);

angular.module('checkin')
  .controller('signinCtrl', ['$scope', '$rootScope', '$location', 'SigninService', function($scope, $rootScope, $location, SigninService){
    $scope.user = {email: $rootScope.email, password: ''};
    $scope.errMessage ='';
    //this function is called when we press the login button
    $scope.checkin = function(){
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
