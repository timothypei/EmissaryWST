'use strict';

angular.module('dashboard')
	.controller('PatientModalController', function ($scope, $modalInstance, item) {

		$scope.selectedPatient = item;

		$scope.ok = function (row) {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});
