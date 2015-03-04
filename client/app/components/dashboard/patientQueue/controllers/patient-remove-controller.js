'use strict';

angular.module('dashboard')
	.controller('PatientRemoveController', function ($scope, $modalInstance, item) {

		//$scope.selectedPatient = item;

		$scope.ok = function (item) {
			//$scope.selectedPatient.Name = '';
			//$scope.item.Name = '';
            $modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});
