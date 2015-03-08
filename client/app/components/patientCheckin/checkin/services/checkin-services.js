'use strict';

angular.module('checkin')
  .service('CheckinService', ['$http', function($http) {
  	  this.getForms = function(id) {
  	  	var url = '/api/form/template/company/'+id;
        return $http.get(url);
      };
  }]);