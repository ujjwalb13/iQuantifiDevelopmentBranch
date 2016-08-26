(function() {
  'use strict';
  angular.module('agera').factory('Organization', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/organizations/:guid", {
        guid: '@guid'
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=organization.js.map
