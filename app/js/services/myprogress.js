(function() {
  'use strict';
  angular.module('agera').factory('MyProgress', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/plan/myprogress", {});
    }
  ]);

}).call(this);

//# sourceMappingURL=myprogress.js.map
