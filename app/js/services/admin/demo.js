(function() {
  'use strict';
  angular.module('admin').factory('Demo', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/admin/demos/:guid", {
        guid: '@guid'
      }, {
        last: {
          method: 'GET',
          isArray: false,
          url: ENV.apiHost + "/admin/demos/last"
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=demo.js.map
