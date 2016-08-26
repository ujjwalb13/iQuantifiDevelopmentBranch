(function() {
  'use strict';
  angular.module('goals').factory('Baby', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/babies/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/babies/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/babies/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/babies/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/babies/" + this.guid + "/schedule");
    };
    obj.type = 'goal';
    obj.kind = 'baby';
    obj.dateTitle = 'Date';
    obj.amountTitle = 'Total Amount';
    obj.hasFinance = false;
    obj.attributes = [
      {
        title: 'Type',
        attribute: 'kind',
        filter: 'translate'
      }, {
        title: 'Amount',
        attribute: 'amount',
        filter: 'dollars'
      }
    ];
    obj.donutAttribute = 'amount';
    return obj;
  });

}).call(this);

//# sourceMappingURL=baby.js.map
