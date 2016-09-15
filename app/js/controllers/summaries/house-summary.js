(function() {
  'use strict';
  angular.module('summaries').controller('houseSummaryCtrl', function($scope, $location, $routeParams, HouseSummary, Action, $rootScope) {
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
      $scope.actions = [
        {
          actionable_href: "/goals/houses/f4d98ea9-57cd-4c32-b55b-2882bbde613f",
          amount: 1120,
          assigned_on: "2016-09-01T00:00:00+00:00",
          description: "Deposit $1,120 this month into New Market Account",
          goal_guid: "f4d98ea9-57cd-4c32-b55b-2882bbde613f",
          guid: "4a3026c6-b4ca-4ae6-b538-56bb20300c9f",
          is_completable: true,
          is_complete: false,
          name: "pay",
          short_desc: "Deposit $1,120 this month into New Market Account",
          transaction_type: "Cashflow"
        }
      ];
    });

    $scope.goToEdit = function(goal) {
      var editUrl = "/" + (_.pluralize(goal.category)) + "/" + (_.pluralize(goal.goal_type.toLowerCase())) + "/" + goal.guid + "/edit";
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
    // for action list
    $scope.getActionStatus = function(action) {
      if (action.is_complete) {
        return 'complete-status';
      } else if (moment(action.assigned_on).utc().isSame(moment().utc(), 'month') || moment(action.assigned_on).utc().isAfter(moment())) {
        return 'pending-status';
      } else if (moment(action.assigned_on).utc().isSame(moment().utc().subtract(1, 'months'), 'month')) {
        return 'warning-status-yellow';
      } else {
        return 'warning-status';
      }
    };

    $scope.showRationale = function (action) {
      Action.getRationale({guid: action.guid}).$promise.then(function (rationaleResult) {

        $rootScope.rationaleResults = null;
        $rootScope.rationaleResults = rationaleResult;

        if (rationaleResult != null && rationaleResult.RationaleSections != null && rationaleResult.RationaleSections.length > 0) {
          $rootScope.rationaleResults.SelectedSection = rationaleResult.RationaleSections[0].SectionKey;
          $("#rationaleModal").modal({ backdrop: false });
        }
      });
      return true;
    };

    $scope.openUrl = function(action) {
      if (action.actionable_href.match(/^http/)) {
        return action.actionable_href;
      } else {
        return "/#/actions/" + action.guid + "/open";
      }
    };

    $scope.target = function(href) {
      if (href.match(/^http/)) {
        return '_blank';
      } else {
        return '_self';
      }
    };

    $scope.completeAction = function(action) {
      var option;
      if (action.positions != null) {
        option = angular.element("#action-" + action.guid + " div.slick-active.slick-center div.slide").data('option-id') || angular.element("#action-" + action.guid + " div.slick-center div.slide").data('option-id');
      }
      return Action.update({
        guid: action.guid,
        option: option
      }).$promise.then(function() {
        action.is_complete = true;
        return $rootScope.$broadcast('refreshActionsCount');
      });
    };
  });
}).call(this);

//# sourceMappingURL=summary.js.map
