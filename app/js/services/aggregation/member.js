(function() {
  'use strict';
  angular.module('aggregation').factory('Member', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/aggregation/members/:id/:route", {
        id: '@guid'
      }, {
        refresh: {
          method: 'GET',
          params: {
            id: '@guid',
            route: 'refresh'
          },
          isArray: false
        },
        mfaCredentials: {
          method: 'POST',
          params: {
            id: '@guid',
            route: 'credentials'
          },
          isArray: false
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=member.js.map
