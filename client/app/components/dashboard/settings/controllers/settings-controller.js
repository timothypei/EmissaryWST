'use strict';

angular.module('settings')
	.controller('SettingsController', ['$scope', '$rootScope','$location', 'SettingsService', function($scope, $rootScope, $location, SettingsService){
		$rootScope.email= 'test2@test.com';
		$scope.user = { password: '', newpassword: ''};
		$scope.pass = '';
		$scope.err = false;
		$scope.errMessage = '';
		$scope.update = function(){
			if($scope.user.password == ''){ 
				$scope.errMessage = 'You must supply your current password.';
			} else if($scope.user.newpassword == ''){
                $scope.errMessage = 'You must supply your new password.';
            }else if($scope.pass != $scope.user.newpassword){
				$scope.errMessage = 'Invalid password';
			} else if ($scope.user.newpassword.length < 4) {
				$scope.errMessage = 'Password length must be at least 4 characters!';
			} else {
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
		};
}]);
