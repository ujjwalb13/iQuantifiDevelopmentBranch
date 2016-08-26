(function() {
  'use strict';
  angular.module('goals').factory('PolicyLife', [
    'Resource', '$http', '$filter', 'ENV', function($resource, $http, $filter, ENV) {
      var obj;
      obj = $resource(ENV.apiHost + "/policies/life_policies/:guid", {
        guid: '@guid'
      });
      obj.prototype.actions = function() {
        return $http.get(ENV.apiHost + "/policies/life_policies/" + this.guid + "/actions");
      };
      obj.prototype.completed_actions = function() {
        return $http.get(ENV.apiHost + "/policies/life_policies/" + this.guid + "/actions?filter=complete");
      };
      obj.prototype.historic_actions = function() {
        return $http.get(ENV.apiHost + "/policies/life_policies/" + this.guid + "/actions?filter=historic");
      };
      obj.prototype.schedule = function() {
        return $http.get(ENV.apiHost + "/policies/life_policies/" + this.guid + "/schedule");
      };
      obj.recommendation = function(data) {
        var amt, pre;
        if (data.recommend > 0) {
          amt = $filter('dollars')(data.recommend);
          pre = data.total > 0 ? 'Apply for an additional ' : 'Apply for a ';
          return pre + data.breakdown.need.terms + ' Year ' + data.breakdown.need.type + ' with a Benefit Amount of ' + amt;
        } else {
          return "No Policies Needed";
        }
      };
      obj.needs = function() {
        return $http.get(ENV.apiHost + "/policies/life_policies/needs");
      };
      obj.type = 'protection';
      obj.kind = 'life_policy';
      obj.dateTitle = '';
      obj.amountTitle = 'Total Coverage Needed';
      obj.hasFinance = false;
      obj.isReserves = false;
      obj.attributes = [
        {
          title: 'Annual Expenses',
          attribute: 'expenses',
          filter: 'dollars'
        }, {
          title: 'Total Debt',
          attribute: 'debt',
          filter: 'dollars'
        }, {
          title: 'College Costs',
          attribute: 'college',
          filter: 'dollars'
        }, {
          title: 'Burial Costs',
          attribute: 'burial',
          filter: 'dollars'
        }
      ];
      return obj;
    }
  ]);

}).call(this);

//# sourceMappingURL=policy-life.js.map
