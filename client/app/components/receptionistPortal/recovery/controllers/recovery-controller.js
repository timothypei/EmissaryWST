'use strict';

angular.module('recovery')
	.controller('RecoveryController', ['$scope', '$location', 'RecoveryService', function($scope, $location, RecoveryService){
		$scope.email = '';
		$scope.errMessage = '';

		// This is the functionality for the "recover password" button.
		$scope.recovery = function(){
			if($scope.email == ''){
				$scope.errMessage = 'You must enter a valid email address.'
			}else if($scope.email.indexOf('@')==-1||$scope.email.indexOf('.')==-1){
				$scope.errMessage = 'Invalid Email/Password'
			}else {
				RecoveryService.recover($scope.email)
					.success(function(data){
						console.log('Recover password successful.');
						$scope.errMessage = 'Recover password successful.';
						// From here, go to a notification html indicating that an email has been sent to {{$scope.email}}
						$location.path('/registerthx');
						return data;
					})
					.error(function(err){
						console.log('Recover password failed.');
						$scope.errMessage = 'Recover password failed.';
						return err;
					});
			}
		}
	}]);
