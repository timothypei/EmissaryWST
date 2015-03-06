'use strict';

angular.module('dashboard')
	.controller('SettingsController', ['$scope','$rootScope','SettingsService',
	  function($scope, $rootScope, SettingsService){

		$scope.user = { password: '', newpassword: ''};
		$scope.validateNewPass = '';
		$scope.email = $rootScope.email;
		$scope.err = false;
		$scope.errMessage = '';

		$scope.update = function(){
			if($scope.user.password == ''){
				$scope.errMessage = 'You must supply your current password.';
			} else if ($scope.user.newpassword == ''){
				$scope.errMessage = 'Please enter a new password.';
			} else if($scope.validateNewPass != $scope.user.newpassword){
				$scope.errMessage = "New password not validated correctly."
			} else if($scope.user.newpassword.length < 4){
				$scope.errMessage = 'Password length must be of at least 4 characters.';
			}else {
				SettingsService.update($scope.user)
					.success(function(data){
						if(data=='Oops! Wrong password')
							$scope.errMessage = 'Oops! Wrong password';
						else{
							$scope.errMessage = 'You have successfully changed your password';
						}
						return data;
					})
					.error(function(err){
						$scope.errMessage = 'Password change not successful';
						return err;
				});
			}

		}
	}]);
