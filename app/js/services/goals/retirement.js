(function() {
  'use strict';
  angular.module('goals').factory('Retirement', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/retirements/:guid", {
      guid: '@guid'
    },
    {
      summary: {
        url: ENV.apiHost + "/goals/retirements/:guid/Summary",
        method: 'GET',
        isArray: false
      },
      accounts: {
        url: ENV.apiHost + "/goals/retirements/:guid/Accounts",
        method: 'GET',
        isArray: true
      }
    }
    );
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/retirements/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/retirements/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/retirements/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/retirements/" + this.guid + "/schedule");
    };

    obj.type = 'goal';
    obj.kind = 'retirement';
    obj.dateTitle = 'Retirement Date';
    obj.amountTitle = "Amount needed today to fund retirement";
    obj.hasFinance = false;
    obj.attributes = [
      {
        title: 'Total Current Balance',
        attribute: 'total',
        filter: 'dollars'
      }, {
        title: "This Year's Contribution Target",
        attribute: 'current',
        filter: 'dollars'
      }, {
        title: "401k Employer Match",
        attribute: 'employer_match',
        filter: 'dollars'
      }
    ];
    obj.donutAttribute = 'current';
    return obj;
  });

}).call(this);

//# sourceMappingURL=retirement.js.map
