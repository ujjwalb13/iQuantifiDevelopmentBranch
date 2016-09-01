(function() {
  'use strict';
  angular.module('summaries').controller('summariesSummaryCtrl', function($scope, $rootScope, $routeParams, $http, $location, ENV, configService, Car, College, Credit, Baby, House, Loan, Relocation, Rent, Reserve, Retirement, Ring, Travel, Wedding, Purchase) {
    var Obj, fetchCollegeData, fetchData, fetchGoalData, fetchRentData, fetchReservesData, fetchRetirementData, getCurrentPeriod, getNeed, getPercent, getPercentIncomplete, getSafePercent, lookup;
    $scope.goal = {};
    $scope.goalType = '';
    $scope.nextAction = {};
    $scope.completedActions = [];
    $scope.schedule = [];
    $scope.status = 'safe';
    $scope.ontrackStatus = "ontrack";
    $scope.behindOneMonthStatus = "behindOneMonth";
    $scope.behindTwoMonthStatus = "behindTwoMonth";
    lookup = {
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
    Obj = lookup[$routeParams.type];
    $scope.goalType = Obj.type;
    $scope.goalKind = Obj.kind;

    $scope.currentRightSummary = "downpayment";
    $scope.downpaymentActive = function() {
      return $scope.currentRightSummary === "downpayment";
    }

    $scope.financeRecommendationsActive = function() {
      return $scope.currentRightSummary === "financeRecommendations";
    }

    if (Obj) {
      Obj.get({
        guid: $routeParams.guid
      }).$promise.then(function(object) {
        $scope.goal = object;
        $rootScope.summaryGoal = object;
        switch ($routeParams.type) {
          case 'colleges':
            return fetchCollegeData(object);
          case 'rents':
            return fetchRentData(object);
          case 'reserves':
            return fetchReservesData(object);
          case 'retirements':
            return fetchRetirementData(object);
          default:
            return fetchGoalData(object);
        }
      });
    }
    $scope.gotoProgressPage = function(type) {
      return $location.path("/progress/" + type);
    };
    $scope.icon = function(type) {
      type = type.toLowerCase();
      if (type === 'wedding') {
        return "purchase";
      } else {
        return type;
      }
    };
    $scope.addMortgage = function() {
      if ($rootScope.demo && $routeParams.type === 'houses') {
        return $location.path('/zlife-mortgage');
      }
    };
    $scope.cursor = function() {
      if ($rootScope.demo && $routeParams.type === 'houses') {
        return true;
      } else {
        return false;
      }
    };
    fetchData = function(goal) {
      $scope.thisYear = moment().year();
      $scope.dateTitle = Obj.dateTitle;
      $scope.amountTitle = Obj.amountTitle;
      $scope.tableParts = Obj.attributes;
      $scope.hasFinance = Obj.hasFinance;
      $scope.isReserves = Obj.isReserves;
      $scope.donutPart = Obj.donutAttribute;
      goal.actions().success(function(actions) {
        if (actions.length) {
          return $scope.actions = _.filter(actions, {
            is_complete: false
          });
        } else {
          return $scope.actions = [
            {
              description: "You're currently on track! No action needed at this time."
            }
          ];
        }
      });
      return goal.historic_actions().success(function(actions) {
        return $scope.completedActions = actions;
      });
    };
    fetchGoalData = function(goal) {
      fetchData(goal);
      return goal.schedule().success(function(schedule) {
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
          return $scope.percentIncomplete = 0;
        } else {
          return $scope.percentIncomplete = getPercentIncomplete(currentPeriod.projected - $scope.schedule.balance - $scope.payment, total, $scope.percentComplete);
        }
      });
    };
    fetchRentData = function(goal) {
      fetchGoalData(goal);
      return $scope.goal.security_deposit = $scope.goal.amount;
    };
    fetchReservesData = function(goal) {
      fetchData(goal);
      $scope.amountTitle = goal.name.substring(0, 1) + Obj.amountTitle;
      goal.schedule().success(function(schedule) {
        var currentPeriod, i, len, s, total;
        for (i = 0, len = schedule.length; i < len; i++) {
          s = schedule[i];
          if (s.name[0] === '1') {
            $scope.oneCR = s.total;
          }
          if (s.name[0] === '3') {
            $scope.threeCR = s.total;
          }
          if (s.name[0] === '6') {
            $scope.sixCR = s.total;
          }
          if (s.guid === goal.guid) {
            $scope.schedule = s;
          }
        }
        $scope.payment = $scope.schedule.payment;
        $scope.status = $scope.schedule.status;
        $scope.needed = getNeed($scope.schedule.balance, goal.amount);
        $scope.saved = $scope.schedule.balance;
        currentPeriod = getCurrentPeriod($scope.schedule);
        total = $scope.goal.downpayment || $scope.goal.amount;
        $scope.percentComplete = getPercent($scope.schedule.balance, $scope.goal.amount);
        if ($scope.status === 'safe' || !currentPeriod) {
          return $scope.percentIncomplete = 0;
        } else {
          return $scope.percentIncomplete = getPercentIncomplete(currentPeriod.projected - $scope.schedule.balance - $scope.payment, total, $scope.percentComplete);
        }
      });
      return $http.get(ENV.apiHost + "/goals/reserves/progress").then(function(response) {
        var amount1CR, amount3CR, amount6CR, balance1CR, balance3CR, balance6CR, reservesData;
        reservesData = response.data;
        balance1CR = reservesData['1CR'].balance;
        amount1CR = reservesData['1CR'].amount;
        if (balance1CR > amount1CR) {
          balance1CR = amount1CR;
        }
        $scope.percentage1CR = balance1CR / amount1CR * 100;
        balance3CR = reservesData['3CR'].balance;
        amount3CR = reservesData['3CR'].amount;
        $scope.percentage3CR = balance3CR / amount3CR * 100;
        balance6CR = reservesData['6CR'].balance;
        amount6CR = reservesData['6CR'].amount;
        $scope.percentage6CR = balance6CR / amount6CR * 100;
        $scope.reservesTotalSaved = balance1CR + balance3CR + balance6CR;
        return $scope.reservesTotal = amount1CR + amount3CR + amount6CR;
      });
    };
    fetchCollegeData = function(goal) {
      fetchData(goal);
      $scope.isCollege = true;
      $scope.collegeType = goal.is_public ? 'Public' : 'Private';
      return goal.schedule().success(function(schedule) {
        var currentPeriod, d, i, len, ref;
        $scope.schedule = schedule;
        $scope.payment = schedule.payment;
        $scope.status = schedule.status;
        goal.amount = goal.projected_need;
        $scope.goal.total = $scope.schedule.balance;
        $scope.goal.current = 0;
        $scope.saved = 0;
        ref = $scope.schedule.data;
        for (i = 0, len = ref.length; i < len; i++) {
          d = ref[i];
          if (moment(d.date).isSame(moment(), 'year') && (d.status === 'pay' || d.status === 'pay_pend')) {
            $scope.goal.current += d.payment;
            if (d.status === 'pay') {
              $scope.saved += d.payment;
            }
          }
        }
        $scope.needed = getNeed($scope.saved, $scope.goal.current);
        currentPeriod = getCurrentPeriod(schedule);
        $scope.percentComplete = getPercent($scope.saved, $scope.goal.current);
        if ($scope.status === 'safe') {
          $scope.percentIncomplete = 0;
        } else {
          $scope.percentIncomplete = getPercentIncomplete(currentPeriod.projected - $scope.saved - $scope.payment, $scope.goal.total, $scope.percentComplete);
        }
        return goal.accounts().success(function(accounts) {
          var a, j, len1, results;
          $scope.accounts = accounts;
          results = [];
          for (j = 0, len1 = accounts.length; j < len1; j++) {
            a = accounts[j];
            results.push(a.percent = getPercent(a.balance, $scope.schedule.balance));
          }
          return results;
        });
      });
    };
    $scope.titleAmount = function(goal) {
      if (goal.category === 'retirement') {
        return goal.title_amount;
      } else {
        return goal.amount;
      }
    };
    $scope.leftAmount = function(goal) {
      if (goal.category === 'retirement') {
        return goal.title_today_amount;
      } else {
        return goal.amount;
      }
    };
    fetchRetirementData = function(goal) {
      fetchData(goal);
      $scope.person = goal.person;
      $scope.spouse = goal.spouse;
      $scope.people = {};
      if ($scope.person.relationship === 'primary') {
        $scope.people.primary = $scope.person.first_name;
        if ($scope.spouse) {
          $scope.people.spouse = $scope.spouse.first_name;
        }
      } else {
        $scope.people.primary = $scope.spouse.first_name;
        $scope.people.spouse = $scope.person.first_name;
      }
      $scope.goal.name = $scope.goal.name + " Goal";
      $scope.end_year = moment(goal.end_on).year();
      $scope.person.retirement_age = $scope.end_year - moment(goal.person.dob).year();
      $scope.hasPension = false;
      if (goal.pensions && (((goal.pensions.primary.used != null) && goal.pensions.primary.used.amount) || ((goal.pensions.spouse != null) && (goal.pensions.spouse.used != null) && goal.pensions.spouse.used.amount))) {
        $scope.hasPension = true;
      }
      $scope.hasSocial = false;
      if (goal.social && (((goal.social.primary.used != null) && goal.social.primary.used.amount) || ((goal.social.spouse != null) && (goal.social.spouse.used != null) && goal.social.spouse.used.amount))) {
        $scope.hasSocial = true;
      }
      $scope.hasRental = false;
      if (goal.rentals.length) {
        $scope.hasRental = true;
      }
      return goal.schedule().success(function(schedule) {
        var currentPeriod, d, i, len, ref;
        $scope.schedule = schedule;
        $scope.isRetirement = true;
        $scope.goal.total = $scope.schedule.balance;
        $scope.goal.current = 0;
        $scope.saved = 0;
        ref = $scope.schedule.data;
        for (i = 0, len = ref.length; i < len; i++) {
          d = ref[i];
          if (moment(d.date).isSame(moment(), 'year') && (d.status === 'pay' || d.status === 'pay_pend')) {
            $scope.goal.current += d.projected_payment;
            if (d.status === 'pay') {
              $scope.saved += d.projected_payment;
            }
          }
        }
        $scope.payment = schedule.payment > 20 ? schedule.payment : 0;
        $scope.status = schedule.status;
        $scope.needed = getNeed($scope.saved, $scope.goal.current);
        currentPeriod = getCurrentPeriod(schedule);
        if ($scope.goal.current < 20) {
          $scope.percentComplete = 100;
          $scope.needed = 0;
          $scope.goal.current = 0;
        } else {
          $scope.percentComplete = getPercent($scope.saved, $scope.goal.current);
        }
        if ($scope.status === 'safe' || !currentPeriod) {
          $scope.percentIncomplete = 0;
        } else {
          $scope.percentIncomplete = getPercentIncomplete(currentPeriod.projected - $scope.saved - $scope.payment, $scope.goal.total, $scope.percentComplete);
        }
        return goal.accounts().success(function(accounts) {
          var a, j, len1, results;
          $scope.primaryAccounts = [];
          $scope.spouseAccounts = [];
          $scope.pieData = [];
          results = [];
          for (j = 0, len1 = accounts.length; j < len1; j++) {
            a = accounts[j];
            a.percent = getPercent(a.balance, $scope.schedule.balance);
            if (a.person.relationship === 'primary') {
              $scope.primaryAccounts.push(a);
            } else {
              $scope.spouseAccounts.push(a);
            }
            results.push($scope.pieData.push(a.balance));
          }
          return results;
        });
      });
    };
    getPercent = function(current, target) {
      var amt;
      if (!current || !target) {
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
    getCurrentPeriod = function(schedule) {
      // var i, len, month, ref;
      // ref = schedule.data;
      // for (i = 0, len = ref.length; i < len; i++) {
      //   month = ref[i];
      //   if (moment().startOf('month').isSame(month.date)) {
      //     return month;
      //   }
      // }
      return {};
    };
    getNeed = function(current, target) {
      var amt;
      amt = target - current;
      return Math.max(amt, 0);
    };
    $scope.color = function(index) {
      return configService.color(index);
    };
    return $scope.goToEdit = function(goal) {
      var editUrl;
      editUrl = "/" + (_.pluralize(goal.category)) + "/" + (_.pluralize(goal.goal_type.toLowerCase())) + "/" + goal.guid + "/edit";
      return $location.path(editUrl);
    };
  });

}).call(this);

//# sourceMappingURL=summary.js.map
