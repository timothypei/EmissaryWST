'use strict';

angular.module('settings')
  .service('SettingsService', ['$http', '$rootScope', function($http, $rootScope) {
  	  //Works with the settings API to post to server
      this.update = function(user) {
      	var param = $rootScope.email;
      	console.log(user);
      	var url= '/auth/setting/'+param;
      	console.log('url:'+url);

        return $http.put(url, user); // TODO how to pass parameter? needs to be email address

      };
  }]);