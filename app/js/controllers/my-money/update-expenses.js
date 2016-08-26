(function() {
  'use strict';
  angular.module('myMoney').controller('MyMoneyUpdateExpensesSheetCtrl', function($scope, $routeParams, $location, Expense, $http, ENV, $rootScope) {
    var getExpenseName, getPercentage, hideAllSubCategories, updateExpenseValues;
    getExpenseName = function(kind) {
      var kind_formatted;
      kind_formatted = kind.replace('hobbies_travel', 'Hobbies / Travel').replace('cable_internet', 'Cable / Internet').replace('other', 'Other Expenses');
      return _.titleize(_.humanize(kind_formatted));
    };
    getPercentage = function(value, max_value) {
      if (max_value === 0) {
        return 0;
      }
      return Math.round(100.0 * value / max_value);
    };
    updateExpenseValues = function() {
      return Expense.query().$promise.then(function(response) {
        var data, expense, j, len, max_value, ref;
        ref = $scope.expenses;
        for (j = 0, len = ref.length; j < len; j++) {
          expense = ref[j];
          data = _.detect(response, function(item) {
            return item.kind === expense.kind;
          });
          expense.amount = data.amount || 0;
          expense.three_month_average_amount = data.three_month_average_amount || 0;
          expense.human_name = getExpenseName(expense.kind);
          max_value = Math.max(expense.amount, expense.three_month_average_amount);
          expense.amount_percent = getPercentage(expense.amount, max_value);
          expense.three_month_average_amount_percent = getPercentage(expense.three_month_average_amount, max_value);
        }
        return $scope.showTotal();
      });
    };
    hideAllSubCategories = function() {
      return _.each($scope.expenses, function(expense) {
        return $scope.expenseSubcategories[expense.kind]["showed"] = false;
      });
    };
    $scope.expenses = [
      {
        kind: 'car_insurance',
        amount: ''
      }, {
        kind: 'cell_phone',
        amount: ''
      }, {
        kind: 'education',
        amount: ''
      }, {
        kind: 'health_insurance',
        amount: ''
      }, {
        kind: 'rent',
        amount: ''
      }, {
        kind: 'groceries',
        amount: ''
      }, {
        kind: 'transportation',
        amount: ''
      }, {
        kind: 'utilities',
        amount: ''
      }, {
        kind: 'cable_internet',
        amount: ''
      }, {
        kind: 'healthcare',
        amount: ''
      }, {
        kind: 'charitable_giving',
        amount: ''
      }, {
        kind: 'clothing',
        amount: ''
      }, {
        kind: 'entertainment',
        amount: ''
      }, {
        kind: 'hobbies_travel',
        amount: ''
      }, {
        kind: 'personal_care',
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
    $scope.showTotal = function() {
      var expense, i, j, len, ref;
      i = 0;
      ref = $scope.expenses;
      for (j = 0, len = ref.length; j < len; j++) {
        expense = ref[j];
        i += parseInt(expense.amount, 10);
      }
      return $scope.monthlyExpenses = i;
    };
    $scope.saveMonthlyExpenses = function() {
      $scope.submitted = true;
      $scope.processing = true;
      return Expense.save({
        expenses: $scope.expenses
      }).$promise.then(function(result) {
        $scope.processing = false;
        $rootScope.expensesView = "monthly_expenses";
        return $rootScope.$broadcast('alert', {
          type: 'success',
          msg: 'Your expenses were updated successfully.'
        });
      }, function(err) {
        $scope.processing = false;
        return $rootScope.$broadcast('alert', {
          type: 'danger',
          msg: 'There was an error updating your expenses.'
        });
      });
    };
    $scope.dislaySubcategories = function(expenseKind) {
      if (!$scope.expenseSubcategories[expenseKind]['loadDone']) {
        $http.get(ENV.apiHost + "/finance/expenses/subcategories/" + expenseKind).then(function(response) {
          $scope.expenseSubcategories[expenseKind]['categories'] = response.data;
          return $scope.expenseSubcategories[expenseKind]['loadDone'] = true;
        });
      }
      hideAllSubCategories();
      return $scope.expenseSubcategories[expenseKind]['showed'] = true;
    };
    $scope.cancelSavingExpenses = function() {
      updateExpenseValues();
      return $rootScope.expensesView = "monthly_expenses";
    };
    $scope.expenseSubcategories = {};
    _.each($scope.expenses, function(expense) {
      $scope.expenseSubcategories[expense.kind] = {};
      $scope.expenseSubcategories[expense.kind]['categories'] = [];
      $scope.expenseSubcategories[expense.kind]['showed'] = false;
      return $scope.expenseSubcategories[expense.kind]['loadDone'] = false;
    });
    return updateExpenseValues();
  });

}).call(this);

//# sourceMappingURL=update-expenses.js.map
