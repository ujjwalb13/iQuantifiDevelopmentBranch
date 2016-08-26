(function() {
  'use strict';
  angular.module('onboard').controller('onboardManualExpensesCtrl', function($scope, $rootScope, $modal, $location, matchmedia, Expense, onboardService, welcomeTextService, $http, ENV) {
    var ModalInstanceCtrl, completeSetup, prepareExpenses;
    $rootScope.step = 2;
    $scope.submitted = false;
    $scope.currentStep = 5;
    $scope.welcome = welcomeTextService.expense();
    $rootScope.savable = true;
    $rootScope.expenses = {};
    Expense.query().$promise.then(function(data) {
      var d, expense, i, j, k, len, len1, ref;
      i = 0;
      d = [];
      for (j = 0, len = data.length; j < len; j++) {
        expense = data[j];
        i += expense.amount;
        d[expense.kind] = expense.amount;
      }
      ref = $rootScope.expenses;
      for (k = 0, len1 = ref.length; k < len1; k++) {
        expense = ref[k];
        expense.amount = d[expense.kind] || '';
      }
      if (i !== 0) {
        return $rootScope.monthlyExpenses = parseInt(i, 10);
      }
    });
    $scope.isExpensesFieldDisabled = function() {
      var expense, j, len, ref;
      ref = $rootScope.expenses;
      for (j = 0, len = ref.length; j < len; j++) {
        expense = ref[j];
        if (expense.amount && expense.kind !== 'other') {
          return true;
        }
      }
      return false;
    };
    $scope.updateOtherExpenses = function() {
      var expense, j, len, ref, results;
      ref = $rootScope.expenses;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        expense = ref[j];
        if (expense.kind === 'other') {
          results.push(expense.amount = $rootScope.monthlyExpenses);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    $rootScope.showTotal = function() {
      var expense, i, j, len, ref;
      i = 0;
      ref = $rootScope.expenses;
      for (j = 0, len = ref.length; j < len; j++) {
        expense = ref[j];
        i += parseInt(expense.amount, 10) || 0;
      }
      return $rootScope.monthlyExpenses = i;
    };
    $scope.processForm = function(form) {
      var data;
      $scope.submitted = true;
      if (form.$valid) {
        $scope.pending = true;
        data = prepareExpenses($rootScope.expenses);
        return Expense.save({
          expenses: data
        }).$promise.then(function() {
          return onboardService.is_complete().then(function(data) {
            return completeSetup();
          }, function(data) {
            if (!data.accounts) {
              return $location.path('/onboard/accounts');
            }
            if (!data.income) {
              return $location.path('/onboard/manual-income');
            }
            if (!data.expenses) {
              return $location.path('/onboard/manual-expenses');
            }
          });
        }, function(response) {
          return data.errors = response.errors;
        })["finally"](function() {
          return $scope.pending = false;
        });
      }
    };
    completeSetup = function() {
      $rootScope.firstTime = true;
      return onboardService.finish().then(function(data) {
        var d, j, len, results;
        $rootScope.$broadcast('refresh');
        if (("" + data).trim() === "") {
          $rootScope.currentUser.is_setup_complete = true;
          if (matchmedia.isPhone()) {
            return $location.path('/onboard/goals');
          } else {
            return $location.path('/');
          }
        } else {
          $scope.errors = [];
          results = [];
          for (j = 0, len = data.length; j < len; j++) {
            d = data[j];
            results.push($scope.errors.push(d[0] + ": " + d[1]));
          }
          return results;
        }
      });
    };
    prepareExpenses = function(data) {
      var cleanedData, d, j, len;
      cleanedData = [];
      for (j = 0, len = data.length; j < len; j++) {
        d = data[j];
        d.amount = +d.amount;
        if (angular.isNumber(d.amount)) {
          cleanedData.push(d);
        }
      }
      return cleanedData;
    };
    ModalInstanceCtrl = [
      '$scope', '$rootScope', '$modalInstance', function($scope, $rootScope, $modalInstance) {
        return $scope.closeDialog = function() {
          $rootScope.savable = true;
          return $modalInstance.dismiss('cancel');
        };
      }
    ];
    $scope.dislaySubcategories = function(expenseKind) {
      $scope.expenseSubcategories[expenseKind]['showed'] = true;
      if (!$scope.expenseSubcategories[expenseKind]['loadDone']) {
        return $http.get(ENV.apiHost + "/finance/expenses/subcategories/" + expenseKind).then(function(response) {
          $scope.expenseSubcategories[expenseKind]['categories'] = response.data;
          return $scope.expenseSubcategories[expenseKind]['loadDone'] = true;
        });
      }
    };
    $rootScope.expenses = [
      {
        kind: 'car_insurance',
        amount: ''
      }, {
        kind: 'cable_internet',
        amount: ''
      }, {
        kind: 'cell_phone',
        amount: ''
      }, {
        kind: 'healthcare',
        amount: ''
      }, {
        kind: 'education',
        amount: ''
      }, {
        kind: 'charitable_giving',
        amount: ''
      }, {
        kind: 'health_insurance',
        amount: ''
      }, {
        kind: 'clothing',
        amount: ''
      }, {
        kind: 'rent',
        amount: ''
      }, {
        kind: 'entertainment',
        amount: ''
      }, {
        kind: 'groceries',
        amount: ''
      }, {
        kind: 'hobbies_travel',
        amount: ''
      }, {
        kind: 'transportation',
        amount: ''
      }, {
        kind: 'personal_care',
        amount: ''
      }, {
        kind: 'utilities',
        amount: ''
      }, {
        kind: 'home_maintenance',
        amount: ''
      }, {
        kind: 'dining',
        amount: ''
      }, {
        kind: 'other',
        amount: ''
      }
    ];
    $scope.expenseSubcategories = {};
    return _.each($rootScope.expenses, function(expense) {
      $scope.expenseSubcategories[expense.kind] = {};
      $scope.expenseSubcategories[expense.kind]['categories'] = [];
      $scope.expenseSubcategories[expense.kind]['showed'] = false;
      return $scope.expenseSubcategories[expense.kind]['loadDone'] = false;
    });
  });

}).call(this);

//# sourceMappingURL=manual_expenses_controller.js.map
