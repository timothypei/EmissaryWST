'use strict';

angular.module('DashboardFormBuilderModule')
  .controller('FormCreateController', function ($scope, $modal, $filter,$q, $http,FormService) {

  // preview form mode
  $scope.previewMode = false;
  // new form
  $scope.form = {};
  $scope.form.form_id = 1;
  $scope.form.form_name = 'My Form';
  $scope.form.form_fields = [];

  $scope.noSavedTemplate = true;
  // previewForm - for preview purposes, form will be copied into this
  // otherwise, actual form might get manipulated in preview mode
  $scope.previewForm = {};

  // add new field drop-down:
  $scope.addField = {};
  $scope.addField.types = FormService.fields;
  $scope.addField.new = $scope.addField.types[0].name;
  $scope.addField.lastAddedID = 0;

  // accordion settings
  $scope.accordion = {};
  $scope.accordion.oneAtATime = true;

  // create new field button click
  $scope.addNewField = function(){
    // incr field_id counter
    $scope.addField.lastAddedID++;
    var newField = {
      "field_id" : $scope.addField.lastAddedID,
      "field_title" : "New field - " + ($scope.addField.lastAddedID),
      "field_type" : $scope.addField.new,
      "field_value" : "",
      "field_required" : true,
      "field_disabled" : false
    };

    // put newField into fields array
    $scope.form.form_fields.push(newField);
  };

  // deletes particular field on button click
  $scope.deleteField = function (field_id){
    for(var i = 0; i < $scope.form.form_fields.length; i++){
      if($scope.form.form_fields[i].field_id == field_id){
        $scope.form.form_fields.splice(i, 1);
        break;
      }
    }
  };

  // add new option to the field
  $scope.addOption = function (field){
    if(!field.field_options) {
      field.field_options = [];
    }

    var lastOptionID = 0;

    if(field.field_options[field.field_options.length-1]) {
      lastOptionID = field.field_options[field.field_options.length-1].option_id;
    }

      // new option's id
    var option_id = lastOptionID + 1;

    var newOption = {
      "option_id" : option_id,
      "option_title" : "Option " + option_id,
      "option_value" : option_id
    };

    // put new option into field_options array
    field.field_options.push(newOption);
  };

  // delete particular option
  $scope.deleteOption = function (field, option){
    for(var i = 0; i < field.field_options.length; i++){
      if(field.field_options[i].option_id == option.option_id){
        field.field_options.splice(i, 1);
        break;
      }
    }
  };


  // preview form
  $scope.previewOn = function(){
    if($scope.form.form_fields === null || $scope.form.form_fields.length === 0) {
      var title = 'Error';
      var msg = 'No fields added yet, please add fields to the form before preview.';
      var btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];

      var modalInstance = $modal.open({
        templateUrl: 'views/components/dashboard/formBuilder/views/modal.html',
        controller : 'ModalInstanceCtrl',
        controllerAs : 'vm'
      });
    }
    else {
      $scope.previewMode = !$scope.previewMode;
      $scope.form.submitted = false;
      angular.copy($scope.form, $scope.previewForm);
    }
  };
  $scope.saveTemplate = function(){
      /*//see if there is not template saved
      var noTemplate = true;
      $http.get('/api/form/template/company/54f795c7212c76982b2662b8').
          success(function(data, status, headers, config) {
            console.log(data);
            if(data == null){
              console.log("data is null");
              postNewTemplate();
            }
            else{
              console.log("data is not null");
              var templateID = data._id;
              updateTemplate(templateID);
            }
          }).
          error(function(data, status, headers, config) {
            alert("could not get data");
          });
      var formJson = $filter('json')($scope.form);
      var putJson = { 
                         "template":formJson,
                         "template_id":"54f796cf637366641df712d9"
                     };
      $http.put('/api/form/template', putJson).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("put success");
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("no forms posted");
      });*/
  }
  $scope.fetchSavedTemplate = function(){
      $http.get('/api/form/template/company/54f795c7212c76982b2662b8').
          success(function(data, status, headers, config) {
            console.log(data.template);
            $scope.form =JSON.parse(data.template);
          }).
          error(function(data, status, headers, config) {
            alert("there is an error");
          });
  };
  // hide preview form, go back to create mode
  $scope.previewOff = function(){
    $scope.previewMode = !$scope.previewMode;
    $scope.form.submitted = false;
  };

  // decides whether field options block will be shown (true for dropdown and radio fields)
  $scope.showAddOptions = function (field){
    if(field.field_type == "radio" || field.field_type == "dropdown")
      return true;
    else
      return false;
  };

  // deletes all the fields
  $scope.reset = function (){
    $scope.form.form_fields.splice(0, $scope.form.form_fields.length);
    $scope.addField.lastAddedID = 0;
  };
});
