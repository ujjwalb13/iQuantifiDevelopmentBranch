(function() {
  'use strict';
  angular.module('summaries').controller('houseSummaryCtrl', function($scope, $location, $routeParams, HouseSummary) {

    var donutStatus = function(scheduleStatus) {
      if (scheduleStatus === "safe") {
        return "ontrack";
      } else if (scheduleStatus === "warning") {
        return "behindOneMonth";
      } else {
        return "behindTwoMonth";
      }
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
      $scope.donutStatus = donutStatus($scope.schedule.status);
      console.log($scope);
      // $scope.schedule = object.schedule;
      //
      // $scope.complete = $scope.schedule.saved * 100 / $scope.schedule.total;
      //$scope.donutAmount = $scope.goal.projected_payment;
      //console.log($scope.donutStatus );
      //console.log("goal", $scope.goal);
      //console.log("schedule", $scope.schedule);
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

    $scope.dummyScheduleData = [{
        "date": "2016-08-01",
        "projected_payment": 27,
        "projected_balance": 27,
        "status": "pay_pend",
        "balance": 0,
        "payment": 0
    }, {
        "date": "2016-09-01",
        "projected_payment": 27,
        "projected_balance": 54,
        "status": "pay_pend",
        "balance": 0,
        "payment": 54
    }, {
        "date": "2016-10-01",
        "projected_payment": 27,
        "projected_balance": 81,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2016-11-01",
        "projected_payment": 27,
        "projected_balance": 108,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2016-12-01",
        "projected_payment": 27,
        "projected_balance": 135,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-01-01",
        "projected_payment": 27,
        "projected_balance": 162,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-02-01",
        "projected_payment": 27,
        "projected_balance": 189,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-03-01",
        "projected_payment": 27,
        "projected_balance": 216,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-04-01",
        "projected_payment": 27,
        "projected_balance": 243,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-05-01",
        "projected_payment": 27,
        "projected_balance": 270,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-06-01",
        "projected_payment": 27,
        "projected_balance": 297,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-07-01",
        "projected_payment": 27,
        "projected_balance": 324,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-08-01",
        "projected_payment": 27,
        "projected_balance": 351,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-09-01",
        "projected_payment": 27,
        "projected_balance": 378,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-10-01",
        "projected_payment": 27,
        "projected_balance": 405,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-11-01",
        "projected_payment": 27,
        "projected_balance": 432,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2017-12-01",
        "projected_payment": 27,
        "projected_balance": 459,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-01-01",
        "projected_payment": 27,
        "projected_balance": 486,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-02-01",
        "projected_payment": 27,
        "projected_balance": 513,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-03-01",
        "projected_payment": 27,
        "projected_balance": 540,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-04-01",
        "projected_payment": 27,
        "projected_balance": 567,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-05-01",
        "projected_payment": 27,
        "projected_balance": 594,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-06-01",
        "projected_payment": 27,
        "projected_balance": 621,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-07-01",
        "projected_payment": 27,
        "projected_balance": 648,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-08-01",
        "projected_payment": 27,
        "projected_balance": 675,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-09-01",
        "projected_payment": 27,
        "projected_balance": 702,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-10-01",
        "projected_payment": 27,
        "projected_balance": 729,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-11-01",
        "projected_payment": 27,
        "projected_balance": 756,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2018-12-01",
        "projected_payment": 27,
        "projected_balance": 783,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2019-01-01",
        "projected_payment": 27,
        "projected_balance": 810,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2019-02-01",
        "projected_payment": 27,
        "projected_balance": 837,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2019-03-01",
        "projected_payment": 27,
        "projected_balance": 864,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2019-04-01",
        "projected_payment": 27,
        "projected_balance": 891,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2019-05-01",
        "projected_payment": 27,
        "projected_balance": 918,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2019-06-01",
        "projected_payment": 27,
        "projected_balance": 945,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2019-07-01",
        "projected_payment": 27,
        "projected_balance": 972,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2019-08-01",
        "projected_payment": 27,
        "projected_balance": 999,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }, {
        "date": "2019-09-01",
        "projected_payment": 27,
        "projected_balance": 1026,
        "status": "pay_pend",
        "balance": 0,
        "payment": 27
    }];

    $scope.dummyScheduleData[0]["balance"] = 100;
    $scope.dummyScheduleData[3]["balance"] = 200;
    $scope.dummyScheduleData[6]["balance"] = 200;
    $scope.dummyScheduleData[9]["balance"] = 300;
    $scope.dummyScheduleData[12]["balance"] = 400;
    $scope.scheduleStatus = "safe";
    $scope.dummyBubbleText = "Saved $7,200";

    if ($routeParams.behind == 1) {
      $scope.dummyScheduleData[0]["balance"] = 100;
      $scope.dummyScheduleData[3]["balance"] = 200;
      $scope.dummyScheduleData[6]["balance"] = 200;
      $scope.dummyScheduleData[9]["balance"] = 300;
      $scope.dummyScheduleData[12]["balance"] = 300;
      $scope.scheduleStatus = "warning";
      $scope.dummyBubbleText = "Need $2,143";
    } else if ($routeParams.behind == 2) {
      $scope.dummyScheduleData[0]["balance"] = 100;
      $scope.dummyScheduleData[3]["balance"] = 200;
      $scope.dummyScheduleData[6]["balance"] = 200;
      $scope.dummyScheduleData[9]["balance"] = 200;
      $scope.dummyScheduleData[12]["balance"] = 200;
      $scope.scheduleStatus = "danger";
      $scope.dummyBubbleText = "Need $2,143";
    }

    $scope.dummyScheduleData = _.map($scope.dummyScheduleData, function(d){
      var result = d;
      result.date = moment(d.date).subtract(12, "months").format("YYYY-MM-DD");
      return result;
    });

    $scope.dummyBaseline = 0;
  });
}).call(this);

//# sourceMappingURL=summary.js.map
