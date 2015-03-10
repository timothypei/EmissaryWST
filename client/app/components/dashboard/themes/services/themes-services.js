'use strict';

angular.module('themes')
  .service('ThemesService', ['$http', '$rootScope', function($http, $rootScope) {
  	var userid = $rootScope.email;
  	this.read = function(){
  		return $http.get('/api/' + userid + '/theme');
  	};

  	this.update = function(theme){
  		console.log("Sending the post req to: " + userid);
  		return $http.put('/api/' + userid + '/theme', theme);
  	};

  	this.create = function(theme){
  		return $http.post('/api/' + userid + '/theme', theme);
  	};

  	this.delete = function(){
  		// return $http.delete('/api/:user_id/theme');
  	};
  }]);