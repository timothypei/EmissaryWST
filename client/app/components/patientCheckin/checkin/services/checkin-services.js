'use strict';

angular.module('checkin')
  .service('CheckinService', ['$http', '$rootScope', function($http, $rootScope) {
      this.getTheme = function(id){
      	 console.log(id);
      	 console.log("getThemes");
      	 var path = '/api/'+id+'/theme';
      	 return $http.get(path);
      };  	
  	  this.getForms = function(id) {
  	  	console.log(id);
  	  	console.log("getForms");
  	  	var url = '/api/form/template/company/' + $rootScope.admin_id;
  	  	console.log(url);
        return $http.get(url);
      };

  }]);