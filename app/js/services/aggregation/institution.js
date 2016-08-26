(function() {
  'use strict';
  angular.module('aggregation').factory('Institution', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/finance/institutions/:id", {
        id: '@guid'
      }, {
        credentials: {
          method: 'GET',
          url: ENV.apiHost + "/aggregation/institutions/:id/credentials",
          params: {
            id: '@guid'
          },
          isArray: true
        },
        search: {
          method: 'GET',
          url: ENV.apiHost + "/aggregation/institutions/search",
          isArray: true
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=institution.js.map
