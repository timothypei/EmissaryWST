'use strict';

angular.module('signin')
  .controller('SigninController', ['$scope', 'SigninService', function($scope, signinService){
  	$scope.user = {email: '', password: ''};
    $scope.err = false; 

  	$scope.login = function(){
  	};
  }]);