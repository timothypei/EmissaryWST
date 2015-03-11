'use strict';

angular.module('DashboardFormBuilderModule').service('FormService', function FormService($http, $rootScope) {

    var formsJsonPath = './static-data/sample_forms.json';

    return {
        fields:[
            {
                name : 'textfield',
                value : 'Textfield'
            },
            {
                name : 'email',
                value : 'E-mail'
            },
            {
                name : 'password',
                value : 'Password'
            },
            {
                name : 'radio',
                value : 'Radio Buttons'
            },
            {
                name : 'dropdown',
                value : 'Dropdown List'
            },
            {
                name : 'date',
                value : 'Date'
            },
            {
                name : 'textarea',
                value : 'Text Area'
            },
            {
                name : 'checkbox',
                value : 'Checkbox'
            },
            {
                name : 'hidden',
                value : 'Hidden'
            }
        ],
        formData:{},
        form:function (id) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get(formsJsonPath).then(function (response) {
                var requestedForm = {};
                angular.forEach(response.data, function (form) {
                    if (form.form_id == id) requestedForm = form;
                });
                return requestedForm;
            });
        },
        forms: function() {
            return $http.get(formsJsonPath).then(function (response) {
                return response.data;
            });
        },
        getForm: function () {
            return $http.get('api/form/template/company/' + '55009aba141bc50c1a4e87d8').then(function(response){
                if(response.data === null)
                {
                    response.formExist = false;
                }
                else
                {
                    response.formExist = true;
                }
                return response;
            });
        },
        createNewForm: function (form) {
            console.log("create ");
            console.log(form);
            return $http.post('api/form/template/', {
                template : form,
                _admin_id :'55009aba141bc50c1a4e87d8'
            });
        },
        updateNewForm: function (form, id) {
            return $http.put('api/form/template', {
                template : form,
                template_id : id
            });
        }
    };
});
