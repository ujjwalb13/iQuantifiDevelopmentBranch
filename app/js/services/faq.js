(function() {
  'use strict';
  angular.module('agera').factory('faqService', function($http, configService, ENV) {
    var faqService;
    return faqService = {
      get: function() {
        return $http.get(ENV.apiHost + "/faq", {
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

//# sourceMappingURL=faq.js.map
