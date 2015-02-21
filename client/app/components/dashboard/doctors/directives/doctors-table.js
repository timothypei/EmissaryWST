'use strict';

angular.module('doctors')
  .directive('productDescription', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/doctors/doctors.html'
    };
});