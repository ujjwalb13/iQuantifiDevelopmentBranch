(function() {
  'use strict';
  angular.module('goals').factory('Wedding', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/weddings/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/weddings/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/weddings/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/weddings/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/weddings/" + this.guid + "/schedule");
    };
    obj.type = 'goal';
    obj.kind = 'wedding';
    obj.dateTitle = 'Purchase Date';
    obj.amountTitle = 'Total Amount';
    obj.hasFinance = false;
    obj.attributes = [
      {
        title: 'Amount',
        attribute: 'amount',
        filter: 'dollars'
      }
    ];
    return obj;
  });

}).call(this);

//# sourceMappingURL=wedding.js.map
