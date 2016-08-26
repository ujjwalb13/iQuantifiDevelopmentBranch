(function() {
  'use strict';
  angular.module('agera').factory('costsService', function($http, configService, ENV) {
    var costsService;
    return costsService = {
      get: function() {
        return $http.get(ENV.apiHost + "/college_costs", {
          timeout: configService.timeout,
          cache: true
        }).then(function(response) {
          return response.data;
        }, function(response) {
          return response.data;
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=costs.js.map
