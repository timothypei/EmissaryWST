'use strict';

function CreateNewFormModalInstanceCtrl($modalInstance, FormService, formId){
	var vm = this;

	vm.ok = function () {
      	FormService.formData.submitted = true;

		FormService.updateNewForm(FormService.formData, formId);
    	$modalInstance.close();
  	};

  	vm.cancel = function () {
  		console.log("NO!, i change my mind!");
    	$modalInstance.dismiss('cancel');
  	};
}

angular.module('robobetty')
	.controller('CreateNewFormModalInstanceCtrl', ['$modalInstance', 'FormService', 'formId', CreateNewFormModalInstanceCtrl]);