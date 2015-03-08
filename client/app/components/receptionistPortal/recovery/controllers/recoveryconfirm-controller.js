'use strict';

angular.module('recoverythx')
	.controller('RecoveryConfirmController', ['$location', '$timeout', function($location, $timeout){
    $timeout(redirectToSignin, 3000);
    
    function redirectToSignin() {
      $location.path('/signin')
    }

	}]);