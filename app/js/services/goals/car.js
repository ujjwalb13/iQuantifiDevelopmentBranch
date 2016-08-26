(function() {
  'use strict';
  angular.module('goals').factory('Car', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/cars/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/cars/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/cars/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/cars/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/cars/" + this.guid + "/schedule");
    };
    obj.type = 'goal';
    obj.kind = 'car';
    obj.dateTitle = 'Purchase Date';
    obj.amountTitle = 'Total Purchase Price';
    obj.hasFinance = true;
    obj.attributes = [
      {
        title: 'Trade-In',
        attribute: 'trade_in',
        filter: 'dollars'
      }, {
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

//# sourceMappingURL=car.js.map
