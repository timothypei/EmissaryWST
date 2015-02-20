'use strict';

angular.module('robobetty').directive('formDirective', function () {
    return {
        controller: function($scope){
            $scope.submit = function(){
                alert('Form submitted..');
                $scope.form.submitted = true;
            }

            $scope.cancel = function(){
                alert('Form canceled..');
            }
        },
        templateUrl: 'views/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
  });
