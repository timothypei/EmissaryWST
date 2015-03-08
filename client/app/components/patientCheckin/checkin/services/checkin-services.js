'use strict';

angular.module('checkin')
  .service('CheckinService', ['$http', function($http) {
  	  this.getForms = function(id) {
  	  	console.log(id);
  	  	console.log("getForms");
  	  	var url = '/api/form/template/company/54f8f23546b787e8335980e7';
  	  	console.log(url);
        return $http.get(url);
      };
  }]);