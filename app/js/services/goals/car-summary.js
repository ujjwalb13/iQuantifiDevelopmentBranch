(function () {
  'use strict';
  angular.module('goals').factory('CarSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/cars/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function () {
      return this.car;
    }

    return obj;
  });

}).call(this);

//# sourceMappingURL=house.js.map
