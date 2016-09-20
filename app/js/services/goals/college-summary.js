(function() {
  'use strict';
  angular.module('goals').factory('CollegeSummary', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/colleges/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function() {
      return this.college;
    }

    return obj;
  });

}).call(this);