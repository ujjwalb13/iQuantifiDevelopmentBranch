(function() {
  'use strict';
  angular.module('goals').factory('House', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/houses/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/houses/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/houses/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/houses/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/houses/" + this.guid + "/schedule");
    };
    obj.type = 'goal';
    obj.kind = 'house';
    obj.dateTitle = 'Purchase Date';
    obj.amountTitle = 'Total Purchase Price';
    obj.hasFinance = true;
    obj.attributes = [
      {
        title: 'Net Proceeds From Sale Of Home',
        attribute: 'trade_in',
        filter: 'dollars'
      }, {
        title: 'Downpayment',
        attribute: 'downpayment',
        filter: 'dollars'
      }, {
        title: 'Mortgage Amount',
        attribute: 'projected_finance_amount',
        filter: 'dollars'
      }
    ];
    obj.donutAttribute = 'downpayment';
    return obj;
  });

}).call(this);

//# sourceMappingURL=house.js.map
