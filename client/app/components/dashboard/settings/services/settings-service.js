'use strict';

angular.module('dashboard')
  .service('SettingsService', ['$http', '$rootScope', function($http, $rootScope) {
      this.update = function(user) {
        return $http.put('/auth/setting/' + $rootScope.email, user);
      };
  }]);

