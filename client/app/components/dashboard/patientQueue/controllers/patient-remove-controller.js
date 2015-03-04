angular.module('dashboard')
	.controller('PatientRemoveController', function ($scope, $modalInstance, item) {

		$scope.selectedPatient = item;

		$scope.ok = function (row) {
			var index = $scope.rowCollection.indexOf(row);
        	if (index !== -1) {
            	$scope.rowCollection.splice(index, 1);
        	}
            $modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});
