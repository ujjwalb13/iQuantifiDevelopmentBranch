(function() {
  'use strict';
  angular.module('goals').factory('PolicyDisability', [
    'Resource', '$http', '$filter', 'ENV', function($resource, $http, $filter, ENV) {
      var obj;
      obj = $resource(ENV.apiHost + "/policies/disability_policies/:guid", {
        guid: '@guid'
      });
      obj.prototype.actions = function() {
        return $http.get(ENV.apiHost + "/policies/disability_policies/" + this.guid + "/actions");
      };
      obj.prototype.completed_actions = function() {
        return $http.get(ENV.apiHost + "/policies/disability_policies/" + this.guid + "/actions?filter=complete");
      };
      obj.prototype.historic_actions = function() {
        return $http.get(ENV.apiHost + "/policies/disability_policies/" + this.guid + "/actions?filter=historic");
      };
      obj.prototype.schedule = function() {
        return $http.get(ENV.apiHost + "/policies/disability_policies/" + this.guid + "/schedule");
      };
      obj.recommendation = function(data) {
        var amt, pre;
        if (data.recommend > 0) {
          amt = $filter('dollars')(data.recommend);
          pre = data.total > 0 ? 'Apply for an additional Disability Insurance Policy with a ' : 'Apply for a Disability Insurance Policy with a ';
          return pre + amt + ' Monthly Benefit, ' + $filter('translate')(data.recommend_kind) + ' with a ' + data.recommend_wait + ' Day Wait, to Age ' + data.recommend_age;
        } else {
          return "No Policies Needed";
        }
      };
      obj.needs = function() {
        return $http.get(ENV.apiHost + "/policies/disability_policies/needs");
      };
      obj.type = 'protection';
      obj.kind = 'disability_policy';
      obj.dateTitle = '';
      obj.amountTitle = 'Monthly Total Needed';
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

//# sourceMappingURL=policy-disability.js.map
