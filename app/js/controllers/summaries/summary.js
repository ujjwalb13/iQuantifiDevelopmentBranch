(function() {
  'use strict';
  angular.module('summaries').controller('summariesSummaryCtrl', function($scope, $rootScope, $routeParams, $http, $location, ENV, configService, Car, College, Credit, Baby, House, Loan, Relocation, Rent, Reserve, Retirement, Ring, Travel, Wedding, Purchase) {
    var lookup = {
      cars: Car,
      colleges: College,
      babies: Baby,
      houses: House,
      loans: Loan,
      relocations: Relocation,
      rents: Rent,
      reserves: Reserve,
      retirements: Retirement,
      creditcards: Credit,
      rings: Ring,
      travels: Travel,
      weddings: Wedding,
      purchases: Purchase
    };
    var Obj = lookup[$routeParams.type];
    if (Obj) {
      Obj.get({
        guid: $routeParams.guid
      }).$promise.then(function(object) {
        $scope.goal = object;
      });
    }

    $scope.ontrackStatus = "ontrack";
    $scope.behindOneMonthStatus = "behindOneMonth";
    $scope.behindTwoMonthStatus = "behindTwoMonth";
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
    $scope.dummyStatus = "safe";
    $scope.dummyBubbleText = "Saved $7,200";

    if ($routeParams.behind == 1) {
      $scope.dummyScheduleData[0]["balance"] = 100;
      $scope.dummyScheduleData[3]["balance"] = 200;
      $scope.dummyScheduleData[6]["balance"] = 200;
      $scope.dummyScheduleData[9]["balance"] = 300;
      $scope.dummyScheduleData[12]["balance"] = 300;
      $scope.dummyStatus = "warning";
      $scope.dummyBubbleText = "Need $2,143";
    } else if ($routeParams.behind == 2) {
      $scope.dummyScheduleData[0]["balance"] = 100;
      $scope.dummyScheduleData[3]["balance"] = 200;
      $scope.dummyScheduleData[6]["balance"] = 200;
      $scope.dummyScheduleData[9]["balance"] = 200;
      $scope.dummyScheduleData[12]["balance"] = 200;
      $scope.dummyStatus = "danger";
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
