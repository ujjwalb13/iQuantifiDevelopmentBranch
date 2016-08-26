(function() {
  'use strict';
  angular.module('goals').factory('PolicyCare', [
    'Resource', '$http', '$filter', 'ENV', function($resource, $http, $filter, ENV) {
      var obj;
      obj = $resource(ENV.apiHost + "/policies/care_policies/:guid", {
        guid: '@guid'
      });
      obj.prototype.actions = function() {
        return $http.get(ENV.apiHost + "/policies/care_policies/" + this.guid + "/actions");
      };
      obj.prototype.completed_actions = function() {
        return $http.get(ENV.apiHost + "/policies/care_policies/" + this.guid + "/actions?filter=complete");
      };
      obj.prototype.historic_actions = function() {
        return $http.get(ENV.apiHost + "/policies/care_policies/" + this.guid + "/actions?filter=historic");
      };
      obj.prototype.schedule = function() {
        return $http.get(ENV.apiHost + "/policies/care_policies/" + this.guid + "/schedule");
      };
      obj.recommendation = function(data) {
        var amt, pre;
        if (data.recommend > 0) {
          amt = $filter('dollars')(data.recommend);
          pre = data.total > 0 ? 'Apply for an additional Long Term Care Policy with a ' : 'Apply for a Long Term Care Policy with a ';
          return pre + amt + ' Daily Benefit, Home Care: 100%, Elimination Period: 100 Days, Benefit Increase Option: 5% Simple, Benefit Period: Lifetime/Unlimited or 10 years';
        } else {
          return "No Policies Needed";
        }
      };
      obj.needs = function() {
        return $http.get(ENV.apiHost + "/policies/care_policies/needs");
      };
      obj.type = 'protection';
      obj.kind = 'care_policy';
      obj.dateTitle = '';
      obj.amountTitle = 'Cost Of Daily Care';
      obj.hasFinance = false;
      obj.isReserves = false;
      obj.attributes = [
        {
          title: 'Monthly Income',
          attribute: 'monthly_income',
          filter: 'dollars'
        }
      ];
      return obj;
    }
  ]);

}).call(this);

//# sourceMappingURL=policy-care.js.map
