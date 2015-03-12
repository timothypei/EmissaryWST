'use strict';

angular.module('dashboard')
	.controller('EmployeeModalController', function ($scope, $modalInstance) {
		$scope.ok = function () {
			$modalInstance.close($scope.modal);
			////on click show it
			//$("#toaster").fadeIn();
			////5 second then hide it
			//setTimeout(function() {
			//	$("#toaster").fadeOut();
			//}, 3000);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
});
