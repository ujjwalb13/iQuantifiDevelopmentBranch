'use strict';
var app = angular.module('agera')

app.config(function(AuthProvider, AuthInterceptProvider, $provide, ENV) {
  _.mixin(s.exports());
  AuthProvider.loginPath(ENV.apiHost + "/users/sign_in.json");
  AuthProvider.logoutPath(ENV.apiHost + "/users/sign_out.json");
  AuthProvider.registerPath(ENV.apiHost + "/users.json");
  AuthInterceptProvider.interceptAuth(true);
  return $provide.decorator('$exceptionHandler', function($delegate, $window) {
    return function(exception, cause) {
      if ($window.trackJs) {
        $window.trackJs.track(exception);
      }
      $delegate(exception, cause);
    };
  });
});
