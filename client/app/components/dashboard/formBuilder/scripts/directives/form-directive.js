'use strict';

angular.module('DashboardFormBuilderModule')
  .directive('formDirective', function () {
    return {
      controller: function($scope, FormService, $modal){
        $scope.submit = function(){
          FormService.getForm().then(function (response) {
            if(response.formExist === false) // doesnt exist make a new one
            {
              $scope.form.submitted = true;
              FormService.formData.submitted = true;

              FormService.createNewForm(FormService.formData);
            }
            else // does exist ask to replace
            {
              //console.log("make sure!!!");

              var modalInstance = $modal.open({
                templateUrl: 'views/components/dashboard/formBuilder/views/replaceFormModal.html',
                controller : 'CreateNewFormModalInstanceCtrl',
                controllerAs : 'vm'
              });
            }
          });
        };
      },
      templateUrl: 'views/components/dashboard/formBuilder/views/directive-templates/form/form.html',
      restrict: 'E',
      scope: {
        form:'='
      }
    };
  });