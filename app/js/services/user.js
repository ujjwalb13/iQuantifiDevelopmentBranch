(function() {
  'use strict';
  angular.module('agera').factory('User', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/users", {}, {
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=user.js.map
