'use strict';

angular.module('DashboardFormBuilderModule')
  .directive('formDirective', function () {
    return {
      controller: function($scope){
        $scope.submit = function(){
          alert('Form submitted..');
          $scope.form.submitted = true;
        };

        $scope.cancel = function(){
          alert('Form canceled..');
        };
      },
      templateUrl: 'views/components/dashboard/formBuilder/views/directive-templates/form/form.html',
      restrict: 'E',
      scope: {
        form:'='
      }
    };
  });