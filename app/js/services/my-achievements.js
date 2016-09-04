(function() {
  'use strict';
  angular.module('agera').factory('MyAchievements', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/plan/achievements", {});
    }
  ]);

}).call(this);

//# sourceMappingURL=myprogress.js.map
