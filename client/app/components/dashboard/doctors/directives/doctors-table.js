'use strict';

angular.module('doctors')
  .directive('doctorsTable', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/doctors/doctors.html'
    };
});