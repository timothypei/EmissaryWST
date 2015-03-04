'use strict';

angular.module('thankyou')
  .controller('ThankYouController', ['$location', '$timeout', function($location, $timeout) {
    $timeout(redirectToSignin, 3000);
    
    function redirectToSignin() {
      $location.path('/signin')
    }
}]);
