'use strict';

angular.module('themes')
  .service('ThemesService', ['$http', '$rootScope', function($http, $rootScope) {
  	var userid = $rootScope.admin_id;
  	this.read = function(){
  		return $http.get('/api/' + $rootScope.admin_id + '/theme');

  	};

  	this.update = function(theme){

  		console.log("Sending the update req to: " + userid);
  		return $http.put('/api/' + $rootScope.admin_id + '/theme', theme);
  	};

  	this.create = function(theme){
      console.log("Create");
  		return $http.post('/api/' + $rootScope.admin_id + '/theme', theme);
  	};

  	this.delete = function(){
  		// return $http.delete('/api/:user_id/theme');
  	};
  }]);