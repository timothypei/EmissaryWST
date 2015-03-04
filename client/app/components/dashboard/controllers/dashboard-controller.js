'use strict';

angular.module('dashboard')
	.controller('DashboardController', ['$scope', '$state', function ($scope, $state) {
		$scope.title = $state.current.title;
	}]);