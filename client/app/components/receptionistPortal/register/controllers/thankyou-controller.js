'use strict';

angular.module('thankyou')
  .controller('ThankYouController', ['$location', '$timeout', function($location, $timeout) {
    $timeout(redirectToSignin, 15000);
    
    function redirectToSignin() {
      $location.path('/signin')
    }
}]);
