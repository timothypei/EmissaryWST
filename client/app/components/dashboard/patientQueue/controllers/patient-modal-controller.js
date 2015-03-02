angular.module('dashboard')
	.controller('PatientModalController', function ($scope, $modalInstance, item) {

		$scope.selectedPatient = item;

		$scope.ok = function () {
			$scope.selectedPatient.Name = $scope.name;
			$scope.selectedPatient.Doctor = $scope.doctor;
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});
