(function() {
  'use strict';
  angular.module('goals').factory('Loan', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/debts/loans/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/debts/loans/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/debts/loans/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/debts/loans/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/debts/loans/" + this.guid + "/schedule");
    };
    obj.type = 'debt';
    obj.kind = 'loan';
    obj.dateTitle = 'Payoff Date';
    obj.amountTitle = 'Total Payoff';
    obj.hasFinance = false;
    obj.attributes = [
      {
        title: 'Origination Date',
        attribute: 'originate_on',
        filter: 'monthYear'
      }, {
        title: 'Current Balance',
        attribute: 'amount',
        filter: 'dollars'
      }, {
        title: 'Interest Rate',
        attribute: 'rate',
        filter: '%'
      }, {
        title: 'Terms',
        attribute: 'originate_terms',
        filter: ' Years'
      }
    ];
    obj.donutAttribute = 'amount';
    return obj;
  });

}).call(this);

//# sourceMappingURL=loan.js.map
