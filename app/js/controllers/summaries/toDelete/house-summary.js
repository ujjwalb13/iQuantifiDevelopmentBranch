(function() {
  'use strict';
  angular.module('summaries').controller('houseSummaryCtrl', function($scope, $location, $routeParams, HouseSummary) {
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
      var currentPeriod, total;
      $scope.schedule = schedule;
      $scope.payment = schedule.payment;
      $scope.status = schedule.status;
      $scope.needed = getNeed($scope.schedule.balance, goal.downpayment || goal.amount);
      $scope.saved = schedule.balance;
      currentPeriod = getCurrentPeriod(schedule);
      total = $scope.goal.downpayment || $scope.goal.amount;
      $scope.percentComplete = getPercent($scope.schedule.balance, total);
      if ($scope.status === 'safe') {
        $scope.percentIncomplete = 0;
      } else {
        $scope.percentIncomplete = getPercentIncomplete(currentPeriod.projected - $scope.schedule.balance - $scope.payment, total, $scope.percentComplete);
      }
    };

    HouseSummary.get({
      guid: $routeParams.guid
    }).$promise.then(function(object) {
      $scope.goal = object.goal();
      fetchGoalData($scope.goal, object.schedule);
      $scope.completedActions = object.completed_actions;
      $scope.actions = object.actions;
      $scope.goal.icon = "icon-gl-house";
    });

    $scope.goToEdit = function(goal) {
      var editUrl = ["/goals/houses/", goal.guid, "/edit"].join("");
      $location.path(editUrl);
    }

    $scope.currentRightSummary = "downpayment";
    $scope.downpaymentActive = function() {
      return $scope.currentRightSummary === "downpayment";
    }

    $scope.financeRecommendationsActive = function() {
      return $scope.currentRightSummary === "financeRecommendations";
    }

    $scope.changeRightSummayContent = function(contentType) {
      $scope.currentRightSummary = contentType;
    }

  });
}).call(this);

//# sourceMappingURL=summary.js.map
