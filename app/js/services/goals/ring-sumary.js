(function () {
  'use strict';
  angular.module('goals').factory('RingSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/rings/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function () {
      return this.ring;
    }

    return obj;
  });

}).call(this);

//# sourceMappingURL=house.js.map
