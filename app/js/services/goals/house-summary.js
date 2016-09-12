(function() {
  'use strict';
  angular.module('goals').factory('HouseSummary', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/houses/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function() {
      return this.house;
    }

    return obj;
  });

}).call(this);

//# sourceMappingURL=house.js.map
