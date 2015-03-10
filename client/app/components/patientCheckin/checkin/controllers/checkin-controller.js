'use strict';

angular.module('checkin')
  .controller('CheckinController', ['$scope', '$rootScope','$timeout', '$location', 'CheckinService', function($scope,$rootScope,$timeout,$location, CheckinService){

    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms
    $scope.user = {email: $rootScope.email, password: ''};
    $scope.dat;
    var tick = function () {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

      $scope.init = function(){
        CheckinService.getForms($rootScope.admin_id).success(
          function(data){
          $scope.form = JSON.parse(data.template);
            return data;
          })
        .error(function(err){
          console.log("nono");
          console.log(err);
          return err;
        }
          );
      }


    $scope.checkin = function(){
        $location.path('/thankyouCheckIn');
    }
    // Start the timer

    $timeout(tick, $scope.tickInterval);
  }]);



angular.module('checkin')
  .controller('admin_signinCtrl', ['$scope', '$rootScope', '$location', 'AuthService', function($scope, $rootScope, $location, AuthService){
    $scope.user = {email: $rootScope.email, password: ''};
    $scope.errMessage ='';
    //this function is called when we press the login button
    $scope.checkin = function(){
      console.log("test");
      if($rootScope.email.indexOf('@')==-1||$rootScope.email.indexOf('.')==-1){
        $scope.errMessage = 'Invalid Email/Password';
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
