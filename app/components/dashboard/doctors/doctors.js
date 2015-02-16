angular.module('robobetty', [])
.controller('doctorsCtrl', function(Doctor) {
    $scope.doctors = Doctor.get();
    $scope.hello = "world";
  });