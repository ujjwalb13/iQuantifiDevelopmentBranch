(function() {
  'use strict';
  var hasProp = {}.hasOwnProperty;

  angular.module('progress').controller('DebtFormCtrl', function ($window, $scope, $rootScope, $routeParams, $q, $modal, $location, Scenario, Person, Loan, Credit, MyProgress, utilService, goalService, ENV) {
    var Debt, ModalInstanceCtrl, base, date, downsize, fetchRelated, gotoSummary, i, lookup, socialSecurity, span, submitRelated, years;
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
    $scope.type = 'debt';
    $scope.editMode = !!$routeParams.guid;
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
    lookup = {
      loans: Loan,
      creditcards: Credit
    };
    if ($routeParams.type) {
      Debt = lookup[$routeParams.type];
      Debt.get({
        guid: $routeParams.guid
      }).$promise.then(function(object) {
        return $scope.obj = object;
      });
    }
    if (($scope.obj == null) || $scope.obj.hasOwnProperty('downsize')) {
      downsize = null;
      if (($scope.obj != null) && $scope.obj.hasOwnProperty('downsize')) {
        downsize = $scope.obj.downsize;
      }
      $scope.obj = {};
      $scope.obj.type = $scope.type;
      $scope.obj.kind = $routeParams.kind;
      $scope.today = moment();
      $scope.thisYear = $scope.today.year();
      $scope.thisMonth = $scope.today.format('MMMM');
      $scope.formatMonth = moment().month($scope.thisMonth).format('MM');
      $scope.formatYear = $scope.thisYear;
      if (downsize != null) {
        angular.forEach(downsize, function(val, key) {
          return $scope.obj[key] = val;
        });
        $scope.formatMonth = downsize.transition_month;
        $scope.formatYear = downsize.transition_year;
      }
    } else {
      if ($scope.obj.original_amount) {
        $scope.obj.amount = $scope.obj.original_amount;
      }
      date = $scope.obj.transition_on;
      $scope.thisMonth = moment().format('MM');
      $scope.thisYear = moment().year();
      $scope.formatYear = moment(date).year();
      $scope.formatMonth = moment(date).format('MM');
    }
    $scope.obj.transition_month = $scope.formatMonth;
    $scope.obj.transition_year = $scope.formatYear;
    (base = $scope.obj).is_credit_card_debt || (base.is_credit_card_debt = true);
    years = [];
    span = 31;
    i = 0;
    while (i <= span) {
      years.push($scope.thisYear - i);
      i++;
    }
    if ($scope.obj.selling === true) {
      $scope.obj.is_selling = true;
    } else {
      $scope.obj.is_selling = false;
    }
    $scope.years = years;
    socialSecurity = function(data) {
      $scope.people = data;
      $scope.person.primary = _.findWhere(data, {
        relationship: 'primary'
      });
      return $scope.person.spouse = _.findWhere(data, {
        relationship: 'spouse'
      });
    };
    $scope.filterRelated = function() {
      var debt, expense, goal, j, l, len, len1, len2, m, objDate, ref, ref1, ref2, results;
      objDate = moment([$scope.obj.transition_year, $scope.obj.transition_month]);
      ref = $scope.related.debts;
      for (j = 0, len = ref.length; j < len; j++) {
        debt = ref[j];
        if (objDate > moment(debt.start_on) && objDate < moment(debt.end_on)) {
          debt.filtered = true;
        } else {
          debt.filtered = false;
        }
      }
      ref1 = $scope.related.goals;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        goal = ref1[l];
        if ((goal.goal_type === 'Rent' && objDate > moment(goal.start_on) && objDate < moment(goal.end_on)) || (objDate > moment(goal.transition_on) && objDate < moment(goal.end_on))) {
          goal.filtered = true;
        } else {
          goal.filtered = false;
        }
      }
      ref2 = $scope.related.expenses;
      results = [];
      for (m = 0, len2 = ref2.length; m < len2; m++) {
        expense = ref2[m];
        if (expense.kind === 'rent') {
          results.push(expense.filtered = true);
        } else {
          results.push(expense.filtered = false);
        }
      }
      return results;
    };
    $scope.isInstallment = function() {
      return $scope.obj.kind === 'mortgage' || $scope.obj.kind === 'car' || $scope.obj.kind === 'student_loan' || $scope.obj.kind === 'heloc' || $scope.obj.kind === 'line_of_credit';
    };
    $scope.isHeloc = function() {
      return $scope.obj.kind === 'heloc';
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
    submitRelated = function() {
      var debt, goal, j, k, len, r, ref, v;
      ref = $scope.related;
      for (k in ref) {
        if (!hasProp.call(ref, k)) continue;
        v = ref[k];
        for (j = 0, len = v.length; j < len; j++) {
          r = v[j];
          r.parent_guid = r.value && r.filtered ? $scope.obj.guid : null;
        }
      }
      return $q.all([
        (function() {
          var l, len1, ref1, results;
          ref1 = $scope.related.debts;
          results = [];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            debt = ref1[l];
            results.push(goalService.put(debt));
          }
          return results;
        })(), (function() {
          var l, len1, ref1, results;
          ref1 = $scope.related.goals;
          results = [];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            goal = ref1[l];
            results.push(goalService.put(goal));
          }
          return results;
        })()
      ]);
    };
    $scope.save = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        if ($scope.obj.type === 'debt' && $scope.obj.kind === 'credit_card') {

        } else if ($scope.obj.type === 'debt') {
          $scope.obj.originate_on = $scope.obj.transition_year + '-' + $scope.obj.transition_month + '-01';
        }
        if ($scope.obj.kind === 'heloc') {
          $scope.obj.minimum_payment = 0;
        }
        $scope.pending = true;
        if ($scope.editMode) {
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
        } else {
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
        }
      }
    };
    $scope.cancel = function () {
      return $window.history.back();
    };
    gotoSummary = function(debt) {
      var type;
      type = debt.kind === 'credit_card' ? 'creditcard' : 'loan';

      return $window.history.back();
      //return $location.path("/summaries/" + (_.pluralize(type)) + "/" + debt.guid);
    };
    $scope.openDeleteModal = function(debt) {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'deleteDebtModal',
        controller: ModalInstanceCtrl,
        backdrop: 'static',
        resolve: {
          debt: function() {
            return debt;
          }
        }
      });
    };
    return ModalInstanceCtrl = [
      '$location', '$scope', '$modalInstance', 'goalService', 'debt', function($location, $scope, $modalInstance, goalService, debt) {
        $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
        $scope.debt = debt;
        return $scope.deleteDebt = function() {
          $scope.pending = true;
          return goalService["delete"]($scope.debt).then(function(response) {
            $rootScope.$broadcast('refresh');
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: 'The debt was deleted successfully.'
            });
            return $location.path('/progress');
          }, function(response) {
            return $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: 'There was an error deleting the debt.'
            });
          })["finally"](function() {
            $scope.pending = false;
            return $modalInstance.close("okay");
          });
        };
      }
    ];
  });

}).call(this);

//# sourceMappingURL=form.js.map
