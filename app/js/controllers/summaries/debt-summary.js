(function () {
  'use strict';

  angular.module('summaries').controller('debtSummaryCtrl', function ($scope, $location, $routeParams, summaryService, Action) {
    var getNeed = function (current, target) {
      var amt;
      amt = target - current;
      return Math.max(amt, 0);
    };

    var getCurrentPeriod = function (schedule) {
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

    var getPercent = function (current, target) {
      var amt;
      if (!current || !target) {
        return 0;
      }
      amt = Math.round(current / target * 100);
      return getSafePercent(amt);
    };

    var getPercentIncomplete = function (current, target, complete) {
      var amt;
      amt = getPercent(current, target);
      return getSafePercent(Math.min(100 - complete, amt));
    };

    var getSafePercent = function (percent) {
      percent = Math.min(percent, 100);
      return Math.max(percent, 0);
    };

    var fetchDebtData = function (debt, schedule) {
      var currentPeriod, total;
      $scope.schedule = schedule;
      $scope.payment = schedule.payment;
      $scope.status = schedule.status;
      $scope.topmessage = "Completed!";
      $scope.needed = getNeed($scope.schedule.balance, debt.amount);
      $scope.saved = schedule.balance;
      currentPeriod = getCurrentPeriod(schedule);
      total = $scope.debt.amount;
      $scope.percentComplete = getPercent($scope.schedule.balance, total);
      if ($scope.status === 'safe') {
        $scope.percentIncomplete = 0;
      } else {
        $scope.percentIncomplete = getPercentIncomplete(currentPeriod.projected - $scope.schedule.balance - $scope.payment, total, $scope.percentComplete);
      }
    };

    summaryService.get({
      guid: $routeParams.guid,
    }).$promise.then(function (object) {
      $scope.debt = object.debt;
      fetchDebtData($scope.debt, object.schedule);
      $scope.completedActions = object.completed_actions
      $scope.actions = object.actions;
    });

    $scope.goToEdit = function (debt) {
      var editUrl = "/" + (_.pluralize(debt.category)) + "/" + (_.pluralize(debt.goal_type.toLowerCase())) + "/" + debt.guid + "/edit";
      $location.path(editUrl);
    }

    $scope.currentRightSummary = "downpayment";
    $scope.downpaymentActive = function () {
      return $scope.currentRightSummary === "downpayment";
    }

    $scope.financeRecommendationsActive = function () {
      return $scope.currentRightSummary === "financeRecommendations";
    }

    $scope.changeRightSummayContent = function (contentType) {
      $scope.currentRightSummary = contentType;
    }
  });



}).call(this);

//# sourceMappingURL=summary.js.map
