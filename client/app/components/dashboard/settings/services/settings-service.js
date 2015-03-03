'use strict';

angular.module('settings')
  .service('SettingsService', ['$http', function($http) {
  	  //Works with the settings API to post to server
      this.update = function(user) {
        return $http.put('/auth/setting/:user', user); // TODO how to pass parameter? needs to be email address
      };
  }]);