(function() {
  'use strict';
  angular.module('summaries').controller('collegeSummaryCtrl', function($scope, $location, $routeParams, CollegeSummary, Action, $rootScope) {
    
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
      $scope.schedule = schedule;
      $scope.collegeType = goal.is_public ? 'Public' : 'Private';
      $scope.status = schedule.status;
      $scope.thisYear = moment().year();
      $scope.payment = schedule.payment;
      $scope.goal.icon = "icon-gl-college";
      var total = schedule.total_contributions_this_year;
      $scope.percentComplete = getPercent(schedule.saved_this_year, total);
      $scope.percentIncomplete = getPercent(schedule.saving_needed_this_year, total);
      $scope.projectedAreaLabel = 'Projected Growth';
      $scope.contributionAreaLabel = 'College Contributions';
    };

    CollegeSummary.get({
      guid: $routeParams.guid
    }).$promise.then(function(object) {
      $scope.goal = object.goal();
      fetchGoalData($scope.goal, object.schedule);
      $scope.completedActions = object.completed_actions;
      $scope.actions = object.actions;
      $scope.accounts = object.associated_accounts;
    });

    $scope.goToEdit = function(goal) {
      var editUrl = "/" + (_.pluralize(goal.category)) + "/" + (_.pluralize(goal.goal_type.toLowerCase())) + "/" + goal.guid + "/edit";
      $location.path(editUrl);
    }
   
  });
}).call(this);

