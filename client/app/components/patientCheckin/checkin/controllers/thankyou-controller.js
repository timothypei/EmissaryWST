'use strict';

angular.module('thankyouCheckIn')
  .controller('CheckInThankYouController', ['$location', '$timeout', function($location, $timeout) {
    $timeout(redirectToCheckin, 5000);
    console.log("Im in");
    function redirectToCheckin() {
    	console.log('test');
      $location.path('/checkin')
    }
}]);
