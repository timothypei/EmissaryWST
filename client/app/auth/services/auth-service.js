angular.module('auth')
  .service('AuthService',
  ['TokenInjector', '$http', function(TokenInjector, $http) {

    /* Make auth api call to backend */
    this.signin = function signin(account) {

      var payload = account;
      console.log(payload);
      /* On success grab token from payload and register it with
       * TokenInjector
       */
      function success(payload) {
        if(payload && payload.token){
          TokenInjector.setToken(payload.token);
        } else {
          // TODO: what happens when token is not returned
        }
      }

      function error(err) {
        TokenInjector.setToken(undefined); // TODO: need to check this
      }

      /* Return promise to caller so they can call success and error too */
      return $http.post('/auth/login', payload);
    };

    this.reg = function register(account) {

      var payload = account;
      console.log(payload);
      /* On success grab token from payload and register it with
       * TokenInjector
       */
      function success(payload) {
        if(payload && payload.token){
          TokenInjector.setToken(payload.token);
        } else {
          // TODO: what happens when token is not returned
        }
      }

      function error(err) {
        TokenInjector.setToken(undefined); // TODO: need to check this
      }

      /* Return promise to caller so they can call success and error too */
      return $http.post('/auth/signup', payload);
    };

  }]);