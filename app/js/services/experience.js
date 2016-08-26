(function() {
  'use strict';
  angular.module('agera').factory('Experience', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/experience", {});
    }
  ]);

}).call(this);

//# sourceMappingURL=experience.js.map
