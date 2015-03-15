'use strict';

angular.module('dashboard')
	.controller('SettingsController', ['$scope','$rootScope','SettingsService',
	  function($scope, $rootScope, SettingsService){

	  	//Object to be put in the request
		$scope.user = { password: ''};

		//Possible fields to update
		$scope.newpassword = '';
		$scope.newemail = '';
		$scope.new_company_name = '';
		$scope.new_company_phone_number = '';

		//Used for validation and API call
		$scope.validateNewPass = '';
		$scope.validateNewEmail = '';
		$scope.validateNewCompanyName = '';
		$scope.validateNewCompanyPhoneNumber = '';

		$scope.email = $rootScope.email;

		//Used to display error messages
		$scope.errMessage = '';

		$scope.update = function(){
			if($scope.user.password == ''){
				$scope.errMessage = 'You must supply your current password.';
			} else if ($scope.newpassword == ''){
				$scope.errMessage = 'Please enter a new password.';
			} else if($scope.validateNewPass != $scope.newpassword){
				$scope.errMessage = "New password not validated correctly."
			} else if($scope.newpassword.length < 4){
				$scope.errMessage = 'Password length must be of at least 4 characters.';
			} else {

				if($scope.newpassword != ''){
					$scope.user.newpassword = $scope.newpassword;
				}
				
                //call the update function of settings service to update the info about the user
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
