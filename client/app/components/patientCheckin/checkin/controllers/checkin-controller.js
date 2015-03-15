'use strict';

angular.module('checkin')
  .controller('CheckinController', ['$scope', '$rootScope','$timeout', '$location', 'CheckinService', '$http', 'socket',
    function($scope,$rootScope,$timeout,$location, CheckinService, $http, socket){

    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms
    $scope.user = {email: $rootScope.email, password: ''};
    $scope.dat;
    $scope.background_image;
    var tick = function () {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

      $scope.init = function(){
        CheckinService.getTheme($rootScope.admin_id)
        .success(function(data){
          console.log("Currently has Is");
          console.log(data);
          if(data==null||data.background_img=="default"){
            $scope.background_image="../images/themes/city0.jpg";
          }
          else{
            console.log(data.background_img);
            $scope.background_image=data.background_img;
          }
            return data;
          })
        .error(function(err){
          console.log(err);
          return err;
        }
          );
        CheckinService.getForms($rootScope.admin_id).success(
          function(data){
            console.log(data);
            data.template.submitted = false;
            $scope.form = data.template;
            console.log("trying to post", $rootScope.admin_id);
            $http.post('/api/patient/checkin', {_admin_id: $rootScope.admin_id, name: 'Brian Soe'})
              .success(function(data, status, headers, config) {
                console.log("success", data);
                socket.emit('patient_added', data.queue.patients[data.queue.patients.length -1]);
              })
              .error(function(data, status, headers, config) {
                console.log("error", data, status, headers);
              });
            return data;
          })
        .error(function(err){
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
