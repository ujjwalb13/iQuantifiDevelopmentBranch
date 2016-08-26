(function() {
  'use strict';
  angular.module('aggregation').factory('Job', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/aggregation/jobs/:id/:route", {
        id: '@guid'
      }, {
        credentials: {
          method: 'GET',
          params: {
            id: '@guid',
            route: 'credentials'
          },
          isArray: true
        },
        resume: {
          method: 'GET',
          params: {
            id: '@guid',
            route: 'resume'
          },
          isArray: false
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=job.js.map
