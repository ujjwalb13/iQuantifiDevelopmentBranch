(function() {
  'use strict';
  var hasProp = {}.hasOwnProperty;

  angular.module('timeline').controller('GoalFormCtrl', function($scope, $rootScope, $http, $q, Scenario, goalService, costsService, Person, items, Account, utilService, ENV, $location, $route) {
    var age, costs, date, downsize, end, fetchRelated, futureValue, gotoSummary, i, j, l, results, results1, setCollegeStartDate, socialSecurity, span, start, submitRelated, thisYear, yearDiff, years;
    fetchRelated = function() {
      return Scenario.related({
        type: $scope.type,
        guid: $scope.obj.guid
      }).$promise.then(function(data) {
        var j, k, len, r, ref, v;
        $scope.related = data;
        ref = $scope.related;
        for (k in ref) {
          if (!hasProp.call(ref, k)) continue;
          v = ref[k];
          for (j = 0, len = v.length; j < len; j++) {
            r = v[j];
            r.value = $scope.obj.guid && r.parent_guid === $scope.obj.guid ? true : false;
          }
        }
        return $scope.filterRelated();
      });
    };
    $scope.submitted = false;
    $scope.items = items;
    $scope.type = items[0].toLowerCase();
    $scope.action = items[1];
    $scope["class"] = items[2];
    $scope.obj = items[3];
    $scope.related = {
      debts: {},
      goals: {},
      expenses: {}
    };
    $scope.people = {};
    $scope.person = {};
    $scope.person.primary = {};
    $scope.person.spouse = {};
    Person.query().$promise.then(function(response) {
      return socialSecurity(response);
    });
    $scope.icon = function(type) {
      return 'icon-goal-sm-' + type;
    };
    $scope.title = function(type) {
      return type;
    };
    if ($scope.type === 'college') {
      $scope.$watch('obj.person.guid', function(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }
        return setCollegeStartDate(newVal);
      });
    }
    if (($scope.obj == null) || $scope.obj.hasOwnProperty('downsize')) {
      downsize = null;
      if (($scope.obj != null) && $scope.obj.hasOwnProperty('downsize')) {
        downsize = $scope.obj.downsize;
      }
      $scope.obj = {};
      $scope.obj.type = $scope.type;
      $scope.today = moment();
      $scope.thisYear = $scope.today.year();
      $scope.thisMonth = $scope.today.format('MMMM');
      $scope.formatMonth = moment().month($scope.thisMonth).format('MM');
      $scope.formatYear = $scope.thisYear;
      $scope.obj.FlexibleTimeFrameMonths = "0";
      $scope.obj.FlexibleAmountPercentage = "0";
      if (downsize != null) {
        angular.forEach(downsize, function(val, key) {
          return $scope.obj[key] = val;
        });
        $scope.formatMonth = downsize.transition_month;
        $scope.formatYear = downsize.transition_year;
      }
      if ($scope.type === 'college') {
        $scope.obj.tuition_total = 0;
        $scope.obj.percentage = 100;
        $scope.obj.years_attending = 4;
        $scope.obj.is_public = true;
        $scope.formatMonth = "08";
      } else if ($scope.type === 'baby') {
        $scope.obj.kind = 'birth';
      }
    } else {
      if ($scope.obj.original_amount) {
        $scope.obj.amount = $scope.obj.original_amount;
      }
      date = $scope.obj.transition_on;
      if ($scope.type === 'college') {
        $scope.obj.tuition_total = $scope.obj.projected_need;
      }
      $scope.thisMonth = moment().format('MM');
      $scope.thisYear = moment().year();
      $scope.formatYear = moment(date).year();
      $scope.formatMonth = moment(date).format('MM');
    }
    $scope.obj.transition_month = $scope.formatMonth;
    $scope.obj.transition_year = $scope.formatYear;
    span = null;
    if ($scope.type === 'college') {
      span = 31;
    } else if ($scope.type === 'retirement') {
      span = 40;
    } else if ($scope.type === 'car' || $scope.type === 'baby' || $scope.type === 'house') {
      span = 5;
    } else {
      span = 2;
    }
    years = [];
    i = 0;
    while (i <= span) {
      years.push($scope.thisYear + i);
      i++;
    }
    $scope.years = years;
    if ($scope.type === 'college') {
      costs = {};
      costsService.get().then(function(data) {
        var d, j, len, results;
        results = [];
        for (j = 0, len = data.length; j < len; j++) {
          d = data[j];
          results.push(costs[d.state] = d);
        }
        return results;
      });
    }
    if ($scope.type === 'car' || $scope.type === 'house' || $scope.type === 'rent') {
      fetchRelated();
    }
    setCollegeStartDate = function(personGuid) {
      var age, birthday, person;
      person = _.findWhere($scope.people, {
        guid: personGuid
      });
      birthday = person.dob;
      $scope.obj.transition_month = "08";
      if (moment().month() > 7) {
        $scope.obj.transition_year = $scope.thisYear + 1;
      } else {
        $scope.obj.transition_year = $scope.thisYear;
      }
      if (birthday) {
        age = utilService.getAge(birthday);
        if (age <= 18) {
          return $scope.obj.transition_year = moment(person.dob).year() + 18;
        }
      }
    };
    socialSecurity = function(data) {
      $scope.people = data;
      $scope.person.primary = _.findWhere(data, {
        relationship: 'primary'
      });
      $scope.person.spouse = _.findWhere(data, {
        relationship: 'spouse'
      });
      if ($scope.type === 'college' && $scope.obj.residence_state === void 0) {
        $scope.obj.residence_state = $scope.person.primary.state;
      }
      if ($scope.type === 'retirement') {
        $scope.showPrimarySocial = false;
        $scope.showSpouseSocial = false;
        if ($scope.person.primary && utilService.getAge($scope.person.primary.dob) >= 40) {
          $scope.showPrimarySocial = true;
        }
        if ($scope.person.spouse && utilService.getAge($scope.person.spouse.dob) >= 40) {
          return $scope.showSpouseSocial = true;
        }
      }
    };
    $scope.pensionAges = (function() {
      results = [];
      for (j = 50; j <= 75; j++){ results.push(j); }
      return results;
    }).apply(this);
    $scope.socialAges = [65, 66, 67];
    if ($scope.type === 'retirement') {
      $scope.has = {};
      $scope.has.rental = false;
      $scope.has.primaryPension = false;
      $scope.has.spousePension = false;
      $scope.has.socialSecurity = false;
      if ($scope.obj.rentals.length) {
        $scope.has.rental = true;
      }
      if ($scope.obj.pensions.primary.amount > 0) {
        $scope.has.primaryPension = true;
      }
      if ($scope.obj.pensions.spouse.amount > 0) {
        $scope.has.spousePension = true;
      }
    }
    $scope.$watch('has.rental', function(newValue, oldValue) {
      if (newValue && $scope.obj.rentals.length === 0) {
        return $scope.addRental();
      }
    });
    $scope.addRental = function() {
      return $scope.obj.rentals.push({
        name: null,
        amount: 0
      });
    };
    $scope.deleteRental = function(index) {
      return $scope.obj.rentals.splice(index, 1);
    };
    if ($scope.type.toLowerCase() === 'retirement' && ($scope.obj.person != null)) {
      age = utilService.getAge($scope.obj.person.dob) + 1;
      start = age < 60 ? 60 : age;
      end = age < 80 ? 80 : age;
      $scope.ages = (function() {
        results1 = [];
        for (var l = start; start <= end ? l <= end : l >= end; start <= end ? l++ : l--){ results1.push(l); }
        return results1;
      }).apply(this);
      $scope.obj.selected_age = age - utilService.getAge($scope.obj.transition_on);
    }
    $scope.filterRelated = function() {
      var debt, expense, goal, len, len1, len2, m, n, o, objDate, ref, ref1, ref2, results2;
      objDate = moment([$scope.obj.transition_year, $scope.obj.transition_month]);
      ref = $scope.related.debts;
      for (m = 0, len = ref.length; m < len; m++) {
        debt = ref[m];
        if (objDate > moment(debt.start_on) && objDate < moment(debt.end_on)) {
          debt.filtered = true;
        } else {
          debt.filtered = false;
        }
      }
      ref1 = $scope.related.goals;
      for (n = 0, len1 = ref1.length; n < len1; n++) {
        goal = ref1[n];
        if ((goal.goal_type === 'Rent' && objDate > moment(goal.start_on) && objDate < moment(goal.end_on)) || (objDate > moment(goal.transition_on) && objDate < moment(goal.end_on))) {
          goal.filtered = true;
        } else {
          goal.filtered = false;
        }
      }
      ref2 = $scope.related.expenses;
      results2 = [];
      for (o = 0, len2 = ref2.length; o < len2; o++) {
        expense = ref2[o];
        if (expense.kind === 'rent') {
          results2.push(expense.filtered = true);
        } else {
          results2.push(expense.filtered = false);
        }
      }
      return results2;
    };
    $scope.updateCosts = function() {
      var data, inState, isPublic;
      isPublic = $scope.obj.is_public;
      inState = $scope.obj.residence_state === $scope.obj.college_state;
      $scope.obj.in_state = inState;
      data = costs[$scope.obj.college_state];
      if (data) {
        if (isPublic && inState) {
          $scope.obj.tuition = data.in_state_total;
        } else if (isPublic) {
          $scope.obj.tuition = data.out_of_state_total;
        } else {
          $scope.obj.tuition = data.private_total;
        }
        return $scope.updateTuitionTotal();
      }
    };
    $scope.updateTuitionTotal = function() {
      var amt, inState, isPublic, m, ref, v, y, year;
      isPublic = $scope.obj.is_public;
      inState = $scope.obj.residence_state === $scope.obj.college_state;
      $scope.obj.tuition_total = 0;
      v = 0;
      date = new Date($scope.obj.transition_month + '/01/' + $scope.obj.transition_year);
      year = date.getFullYear();
      amt = $scope.obj.tuition || 0;
      if (amt === 0) {
        return $scope.obj.tuition_total = 0;
      } else {
        for (y = m = 0, ref = $scope.obj.years_attending - 1; 0 <= ref ? m <= ref : m >= ref; y = 0 <= ref ? ++m : --m) {
          date.setYear(year + y);
          v += futureValue(amt, date);
        }
        return $scope.obj.tuition_total = (v * $scope.obj.percentage) / 100;
      }
    };
    yearDiff = function(d1, d2) {
      if (d2 > d1) {
        return d2.getFullYear() - d1.getFullYear();
      } else {
        return d1.getFullYear() - d2.getFullYear();
      }
    };
    futureValue = function(amount, date) {
      var amt, periods, rate;
      amt = 0;
      rate = 0.06;
      periods = yearDiff(new Date(), date);
      return Math.round((amount * Math.pow(1 + rate, periods)) + 0.5);
    };
    $scope.updateLoanAmt = function() {
      $scope.obj.loanamt = 0;
      if ($scope.obj.amount) {
        $scope.obj.loanamt += $scope.obj.amount;
      }
      if ($scope.obj.trade_in) {
        $scope.obj.loanamt -= $scope.obj.trade_in;
      }
      if ($scope.obj.downpayment) {
        $scope.obj.loanamt -= $scope.obj.downpayment;
      }
      if ($scope.obj.loanamt < 0) {
        return $scope.obj.loanamt = 0;
      }
    };
    $scope.updateLoanAmt();
    $scope.modalUrl = function() {
      var hyphenateType;
      hyphenateType = _.trim(_.dasherize($scope.obj.type), '-');
      if (hyphenateType) {
        return "/views/newgoal/" + $scope["class"] + "-" + hyphenateType + ".html";
      }
    };
    submitRelated = function() {
      var debt, goal, k, len, m, r, ref, v;
      ref = $scope.related;
      for (k in ref) {
        if (!hasProp.call(ref, k)) continue;
        v = ref[k];
        for (m = 0, len = v.length; m < len; m++) {
          r = v[m];
          r.parent_guid = r.value && r.filtered ? $scope.obj.guid : null;
        }
      }
      return $q.all([
        (function() {
          var len1, n, ref1, results2;
          ref1 = $scope.related.debts;
          results2 = [];
          for (n = 0, len1 = ref1.length; n < len1; n++) {
            debt = ref1[n];
            results2.push(goalService.put(debt));
          }
          return results2;
        })(), (function() {
          var len1, n, ref1, results2;
          ref1 = $scope.related.goals;
          results2 = [];
          for (n = 0, len1 = ref1.length; n < len1; n++) {
            goal = ref1[n];
            results2.push(goalService.put(goal));
          }
          return results2;
        })()
      ]);
    };
    $scope.save = function(isValid) {
      var dob;
      $scope.submitted = true;
      if (isValid) {
        $scope.obj.transition_on = $scope.obj.transition_year + '-' + $scope.obj.transition_month + '-01';
        $scope.obj.type = _.underscored($scope.type);
        if ($scope.obj.type === 'car' || $scope.obj.type === 'house') {
          if (!$scope.obj.trade_in) {
            $scope.obj.tradeIn = 0;
          }
          if (!$scope.obj.downpayment) {
            $scope.obj.downpayment = 0;
          }
        }
        if ($scope.obj.type === 'retirement') {
          dob = moment($scope.obj.owner.dob);
          $scope.obj.transition_on = dob.add($scope.obj.selected_age, 'years').format('YYYY-MM-01');
          $scope.has.rental;
          if (!$scope.has.rental) {
            $scope.obj.rentals = [];
          }
          if (!$scope.has.primaryPension) {
            $scope.obj.pensions.primary.amount = 0;
            $scope.obj.pensions.primary.age_must_take_amount = 0;
          }
          if (!$scope.has.spousePension) {
            $scope.obj.pensions.spouse.amount = 0;
            $scope.obj.pensions.spouse.age_must_take_amount = 0;
          }
        }
        $scope.pending = true;
        if ($scope.action === 'New') {
          return goalService.post($scope.obj).then(function(goal) {
            $scope.obj = goal;
            return submitRelated().then(function() {
              $rootScope.$broadcast('refresh');
              return gotoSummary(goal);
            });
          }, function(response) {
            $scope.errors = response.data.errors;
            return $scope.pending = false;
          });
        } else {
          return goalService.put($scope.obj).then(function(goal) {
            $scope.obj = goal;
            return submitRelated().then(function() {
              $rootScope.$broadcast('refresh');
              return gotoSummary(goal);
            });
          }, function(response) {
            $scope.errors = response.data.errors;
            return $scope.pending = false;
          });
        }
      }
    };
    gotoSummary = function(goal) {
      return $location.path("/summaries/" + (_.pluralize(goal.type.toLowerCase())) + "/" + goal.guid);
    };
    $scope.cancel = function() {
      return $location.path("/progress");
    };
    $scope["delete"] = function(goal) {
      $scope.obj.type = $scope.selection;
      goal.deleted = true;
      $scope.deleting = true;
      return goalService["delete"](goal).then(function(response) {
        return $rootScope.$broadcast('refresh');
      }, function(response) {
        goal.deleted = false;
        return response.data;
      })["finally"](function() {
        return $scope.deleting = false;
      });
    };
    if ($scope.type === "downsizing") {
      thisYear = moment().year();
      $scope.years = [thisYear, thisYear + 1];
      $scope.obj.transition_month = moment().format('MM');
      $scope.obj.transition_year = moment().year();
      console.log("init downsizing..", $scope.obj);
      $scope.updateProceedsAmt = function() {
        return $scope.obj.amount = Math.ceil(($scope.obj.home_sale_price * .94) - $scope.obj.loan_balance);
      };
      $scope.next = function(valid) {
        $scope.submitted = true;
        if (valid) {
          if ($scope.obj.next_step === 'buy') {
            $scope.$broadcast('newHouse', {
              name: $scope.obj.name,
              trade_in: $scope.obj.amount,
              transition_month: $scope.obj.transition_month,
              transition_year: $scope.obj.transition_year
            });
          }
          if ($scope.obj.next_step === 'rent') {
            return $scope.$broadcast('newRent', {
              name: $scope.obj.name,
              transition_month: $scope.obj.transition_month,
              transition_year: $scope.obj.transition_year
            });
          }
        }
      };
      $scope.$on('newHouse', function(event, obj) {
        console.log("on newHouse", event, obj);
        return $scope.open('house', 'new', 'goals', {
          downsize: obj
        });
      });
      $scope.$on('newRent', function(event, obj) {
        console.log("on newRent", event, obj);
        return $scope.open('rent', 'new', 'goals', {
          downsize: obj
        });
      });
      return $scope.open = function(type, action, category, obj) {
        $route.previousObj = obj;
        return $location.path(["", category, type, action].join("/"));
      };
    }
  });

}).call(this);

//# sourceMappingURL=goal-form.js.map
