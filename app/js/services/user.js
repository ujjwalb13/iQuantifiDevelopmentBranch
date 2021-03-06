(function() {
  'use strict';
  angular.module('agera').factory('User', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/users", {}, {
        update: {
          method: 'PUT',
          isArray: false
        },
        reset: {
            method: 'POST',
            isArray: false,
            url: ENV.apiHost + "/users/reset"
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=user.js.map
