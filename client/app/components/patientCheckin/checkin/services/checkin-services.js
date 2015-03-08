'use strict';

angular.module('checkin')
  .service('CheckinService', ['$http', function($http) {
  	  this.getForms = function(id) {
  	  	console.log(id);
  	  	console.log("getForms");
  	  	var url = '/api/form/template/company/'+id;
  	  	console.log(url);
        return $http.get(url);
      };
  }]);