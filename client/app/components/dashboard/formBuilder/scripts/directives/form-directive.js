'use strict';

angular.module('DashboardFormBuilderModule')
  .directive('formDirective', function () {
    return {
      controller: function($scope, FormService, $modal){
        $scope.submit = function(){
          
              $scope.form.submitted = true;

              for(var i = 0; i < $scope.form.form_fields.length; i++)
              {
                $scope.form.form_fields[i].field_readonly = false;
                console.log($scope.form.form_fields);
              }

              FormService.formData.submitted = true;
              //console.log($scope.form.form_fields);

              FormService.createNewForm(FormService.formData);
        };
      },
      templateUrl: 'views/components/dashboard/formBuilder/views/directive-templates/form/form.html',
      restrict: 'E',
      scope: {
        form:'='
      }
    };
  });