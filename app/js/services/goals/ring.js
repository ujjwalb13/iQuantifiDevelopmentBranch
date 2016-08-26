(function() {
  'use strict';
  angular.module('goals').factory('Ring', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/rings/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/rings/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/rings/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/rings/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/rings/" + this.guid + "/schedule");
    };
    obj.type = 'goal';
    obj.kind = 'ring';
    obj.dateTitle = 'Purchase Date';
    obj.amountTitle = 'Total Purchase Price';
    obj.hasFinance = true;
    obj.attributes = [
      {
        title: 'Downpayment',
        attribute: 'downpayment',
        filter: 'dollars'
      }, {
        title: 'Finance Amount',
        attribute: 'projected_finance_amount',
        filter: 'dollars'
      }
    ];
    obj.donutAttribute = 'downpayment';
    return obj;
  });

}).call(this);

//# sourceMappingURL=ring.js.map
