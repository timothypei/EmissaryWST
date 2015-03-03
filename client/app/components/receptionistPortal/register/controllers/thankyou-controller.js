'use strict';

angular.module('thankyou')
  .controller('ThankYouController', ['$location', '$timeout', function($location, $timeout) {
    $timeout(redirectToSignin, 1000);
    
    function redirectToSignin() {
      $location.path('/signin')
    }
}]);
