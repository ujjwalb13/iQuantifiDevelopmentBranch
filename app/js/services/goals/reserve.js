(function() {
  'use strict';
  angular.module('goals').factory('Reserve', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/reserves/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/reserves/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/reserves/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/reserves/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/reserves/" + this.guid + "/schedule");
    };
    obj.type = 'protection';
    obj.kind = 'reserve';
    obj.dateTitle = 'Start Date';
    obj.amountTitle = ' Month Reserves';
    obj.hasFinance = false;
    obj.isReserves = true;
    obj.attributes = [
      {
        title: 'Current Amount',
        attribute: 'amount',
        filter: 'dollars'
      }
    ];
    return obj;
  });

}).call(this);

//# sourceMappingURL=reserve.js.map
