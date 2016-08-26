(function() {
  'use strict';
  angular.module('summaries').controller('summariesPolicyCtrl', function($rootScope, $scope, $routeParams, $location, configService, PolicyDisability, PolicyLife, PolicyCare) {
    var Obj, fetchCareData, fetchDisabilityData, fetchLifeData, getPercent, getPercentIncomplete, getSafePercent, getStatus, lookup;
    $scope.goal = '';
    $scope.goalType = '';
    $scope.action = {};
    $scope.completed_actions = [];
    $scope.schedule = [];
    lookup = {
      disability: PolicyDisability,
      life: PolicyLife,
      care: PolicyCare
    };
    $scope.addPolicies = function() {
      if ($rootScope.demo && $routeParams.type === 'life') {
        return $location.path('/zlife-insurance');
      }
    };
    $scope.cursor = function() {
      if ($rootScope.demo && $routeParams.type === 'life') {
        return true;
      } else {
        return false;
      }
    };
    Obj = lookup[$routeParams.type];
    if (Obj) {
      if ($routeParams.type === 'life') {
        Obj.needs().then(function(object) {
          return fetchLifeData(object.data);
        });
      } else if ($routeParams.type === 'care') {
        Obj.needs().then(function(object) {
          return fetchCareData(object.data);
        });
      } else if ($routeParams.type === 'disability') {
        Obj.needs().then(function(object) {
          return fetchDisabilityData(object.data);
        });
      }
    }
    fetchLifeData = function(data) {
      var d, i, len, ref, results;
      $scope.insuranceHeading = 'Life';
      $scope.data = data;
      $scope.goalType = PolicyLife.type;
      $scope.goalKind = PolicyLife.kind;
      $scope.amountTitle = PolicyLife.amountTitle;
      $scope.tableParts = PolicyLife.attributes;
      ref = $scope.data;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        d = ref[i];
        d.income = d.breakdown.income;
        d.expenses = d.breakdown.expenses;
        d.debt = d.breakdown.liabilities;
        d.college = d.breakdown.college;
        d.burial = d.breakdown.burial;
        d.need = Math.max(d.need, 0);
        d.needed = Math.max(d.need - d.total, 0);
        d.percentComplete = d.need <= 0 ? 100 : getPercent(d.total, d.need);
        d.percentIncomplete = getPercentIncomplete(d.need - d.total, d.total, d.percentComplete);
        results.push(d.action = PolicyLife.recommendation(d));
      }
      return results;
    };
    fetchDisabilityData = function(data) {
      var d, i, len, ref, results;
      $scope.insuranceHeading = 'Long Term Disability';
      $scope.data = data;
      $scope.goalType = PolicyDisability.type;
      $scope.goalKind = PolicyDisability.kind;
      $scope.amountTitle = PolicyDisability.amountTitle;
      $scope.tableParts = PolicyDisability.attributes;
      ref = $scope.data;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        d = ref[i];
        d.monthly_income = d.income / 12;
        d.need = Math.max(d.need, 0);
        d.needed = Math.max(d.need - d.total, 0);
        d.percentComplete = d.need <= 0 ? 100 : getPercent(d.total, d.need);
        d.percentIncomplete = getPercentIncomplete(d.need - d.total, d.total, d.percentComplete);
        results.push(d.action = PolicyDisability.recommendation(d));
      }
      return results;
    };
    fetchCareData = function(data) {
      var d, i, len, ref, results;
      $scope.insuranceHeading = 'Long Term Care';
      $scope.data = data;
      $scope.goalType = PolicyCare.type;
      $scope.goalKind = PolicyCare.kind;
      $scope.amountTitle = PolicyCare.amountTitle;
      $scope.tableParts = PolicyCare.attributes;
      ref = $scope.data;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        d = ref[i];
        d.monthly_income = d.income / 12;
        d.need = Math.max(d.need, 0);
        d.needed = Math.max(d.need - d.total, 0);
        d.percentComplete = d.need <= 0 ? 100 : getPercent(d.total, d.need);
        d.percentIncomplete = getPercentIncomplete(d.need - d.total, d.total, d.percentComplete);
        results.push(d.action = PolicyCare.recommendation(d));
      }
      return results;
    };
    getPercent = function(current, target) {
      var amt;
      if (!current) {
        return 0;
      }
      amt = Math.round(current / target * 100);
      return getSafePercent(amt);
    };
    getPercentIncomplete = function(current, target, complete) {
      var amt;
      amt = getPercent(current, target);
      return getSafePercent(Math.min(100 - complete, amt));
    };
    getSafePercent = function(percent) {
      percent = Math.min(percent, 100);
      return Math.max(percent, 0);
    };
    getStatus = function(oldestAction) {
      var actionDate;
      actionDate = oldestAction.assigned_on;
      if (moment(actionDate) > moment().subtract(31, 'days')) {
        return 'green-on-track';
      } else if (moment(actionDate) > moment().subtract(61, 'days')) {
        return 'yellow-off-track';
      } else {
        return 'red-off-track';
      }
    };
    return $scope.color = function(index) {
      return configService.color(index);
    };
  });

}).call(this);

//# sourceMappingURL=policy.js.map
