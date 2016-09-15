(function() {
  'use strict';
  angular.module('summaries').controller('retirementSummaryCtrl', function($scope, $location, $routeParams, Retirement, $q) {

    Retirement.summary({guid: $routeParams.guid}).$promise
    .then(function(data) {
        console.log(data)
      $scope.goal = data.retirement;
      $scope.schedule = data.schedule;
      fetchGoalData($scope.goal, $scope.schedule);
    });

    $scope.goToEdit = function(goal) {
      var editUrl = "/" + (_.pluralize(goal.category)) + "/" + (_.pluralize(goal.goal_type.toLowerCase())) + "/" + goal.guid + "/edit";
      $location.path(editUrl);
    }

    var getNeed = function(current, target) {
      var amt;
      amt = target - current;
      return Math.max(amt, 0);
    };

    var getCurrentPeriod = function(schedule) {
      var i, len, month, ref;
      ref = schedule.data;
      for (i = 0, len = ref.length; i < len; i++) {
        month = ref[i];
        if (moment().startOf('month').isSame(month.date)) {
          return month;
        }
      }
      return {};
    };

    var getPercent = function(current, target) {
      var amt;
      if (!current || !target) {
        return 0;
      }
      amt = Math.round(current / target * 100);
      return getSafePercent(amt);
    };

    var getPercentIncomplete = function(current, target, complete) {
      var amt;
      amt = getPercent(current, target);
      return getSafePercent(Math.min(100 - complete, amt));
    };

    var getSafePercent = function(percent) {
      percent = Math.min(percent, 100);
      return Math.max(percent, 0);
    };

    var fetchGoalData = function(goal, schedule) {
      $scope.thisYear = moment().year();
      $scope.payment = schedule.payment;
      $scope.status = schedule.status;
      $scope.actions = goal.actions;
      var total = $scope.schedule.total_contributions_this_year;
      $scope.percentComplete = getPercent($scope.schedule.saved_this_year, total);
      $scope.percentIncomplete = getPercent($scope.schedule.saving_needed_this_year, total);
    };
  });
}).call(this);

//# sourceMappingURL=summary.js.map
