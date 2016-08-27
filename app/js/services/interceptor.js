(function() {
  'use strict';
  angular.module('agera').config(function($httpProvider) {
    return $httpProvider.interceptors.push([
      '$q', '$rootScope', '$window', '$location', 'ENV', function($q, $rootScope, $window, $location, ENV) {
        return {
          responseError: function(res) {
            if (res.status === 0) {
              $rootScope.$broadcast('alert', {
                type: 'warning',
                msg: 'Server not responding. You may need to try again.'
              });
            } else if (res.status === 403 && !_($window.location.href).endsWith('/two-factor-auth')) {
              $location.path('/two-factor-auth');
            } else if (res.status === 404 && !ENV.debug) {
              $window.location = "/404.html";
            } else if (res.status === 500 && !ENV.debug) {
              $window.location = "/500.html";
            }
            return $q.reject(res);
          }
        };
      }
    ]);
  });

}).call(this);

//# sourceMappingURL=interceptor.js.map