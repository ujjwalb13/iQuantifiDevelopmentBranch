(function() {
  'use strict';
  angular.module('goals').factory('Travel', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/travels/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/travels/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/travels/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/travels/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/travels/" + this.guid + "/schedule");
    };
    obj.type = 'goal';
    obj.kind = 'travel';
    obj.dateTitle = 'Travel Date';
    obj.amountTitle = 'Total Amount';
    obj.hasFinance = false;
    obj.attributes = [
      {
        title: 'Travel Amount',
        attribute: 'amount',
        filter: 'dollars'
      }
    ];
    return obj;
  });

}).call(this);

//# sourceMappingURL=travel.js.map
