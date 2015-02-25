'use strict';

angular.module('robobetty').directive('fieldDirective', function ($http, $compile) {

        var getTemplateUrl = function(field) {
            var type = field.field_type;
            var templateUrl = '';

            switch(type) {
                case 'textfield':
                    templateUrl = 'views/textfield.html';
                    break;
                case 'email':
                    templateUrl = 'views/email.html';
                    break;
                case 'textarea':
                    templateUrl = 'views/textarea.html';
                    break;
                case 'checkbox':
                    templateUrl = 'views/checkbox.html';
                    break;
                case 'date':
                    templateUrl = 'views/date.html';
                    break;
                case 'dropdown':
                    templateUrl = 'views/dropdown.html';
                    break;
                case 'hidden':
                    templateUrl = 'views/hidden.html';
                    break;
                case 'password':
                    templateUrl = 'views/password.html';
                    break;
                case 'radio':
                    templateUrl = 'views/radio.html';
                    break;
            }
            return templateUrl;
        };

        var linker = function(scope, element) {
            // GET template content from path
            var templateUrl = getTemplateUrl(scope.field);
            $http.get(templateUrl).success(function(data) {
                element.html(data);
                $compile(element.contents())(scope);
            });
        };

        return {
            template: '<div>{{field}}</div>',
            restrict: 'E',
            scope: {
                field:'='
            },
            link: linker
        };
  });
