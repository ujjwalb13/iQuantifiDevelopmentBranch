(function() {
  'use strict';
  angular.module('onboard').factory('onboardService', function($http, $q, configService, ENV) {
    return {
      finish: function() {
        return $http.post(ENV.apiHost + "/welcome/conclusion", {}, {
          timeout: configService.timeout
        }).then(function(response) {
          return response.data;
        }, function(response) {
          return response.data;
        });
      },
      is_complete: function() {
        return $http.get(ENV.apiHost + "/welcome/is_complete", {}, {
          timeout: configService.timeout
        }).then(function(response) {
          return response.data;
        }, function(response) {
          return $q.reject(response.data);
        });
      },
      process_transactions: function() {
        return $http.put(ENV.apiHost + "/welcome/process_transactions", {}, {
          timeout: configService.timeout
        }).then(function(response) {
          return response.data;
        }, function(response) {
          return $q.reject(response.data);
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=onboard.js.map
