(function() {
  'use strict';
  angular.module('goals').factory('Credit', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/debts/credit_cards/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/debts/credit_cards/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/debts/credit_cards/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/debts/credit_cards/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/debts/credit_cards/" + this.guid + "/schedule");
    };
    obj.type = 'debt';
    obj.kind = 'credit_card';
    obj.dateTitle = 'Payoff Date';
    obj.amountTitle = 'Total Payoff';
    obj.hasFinance = false;
    obj.attributes = [
      {
        title: 'Current Balance',
        attribute: 'amount',
        filter: 'dollars'
      }
    ];
    return obj;
  });

}).call(this);

//# sourceMappingURL=credit.js.map
