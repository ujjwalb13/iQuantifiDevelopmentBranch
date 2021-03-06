(function() {
  'use strict';
  angular.module('agera').factory('Action', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/actions/:guid", {
        guid: '@guid'
      }, {
        count: {
          method: 'GET',
          isArray: false,
          url: ENV.apiHost + "/actions/count"
        },
        getRationale: {
          method: 'GET',
          isArray: false,
          url: ENV.apiHost + "/actions/rationale/:guid"
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=action.js.map
