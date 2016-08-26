(function() {
  'use strict';
  angular.module('agera').controller('ExpensesCtrl', function($scope, $rootScope, Expense) {
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
    Expense.query().$promise.then(function(data) {
      var expense, j, k, len, len1, ref;
      for (j = 0, len = data.length; j < len; j++) {
        expense = data[j];
        data[expense.kind] = expense.amount;
      }
      ref = $scope.expenses;
      for (k = 0, len1 = ref.length; k < len1; k++) {
        expense = ref[k];
        expense.amount = data[expense.kind] || 0;
      }
      return $scope.showTotal();
    });
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
    return $scope.saveMonthlyExpenses = function() {
      $scope.submitted = true;
      $scope.processing = true;
      return Expense.save({
        expenses: $scope.expenses
      }).$promise.then(function(result) {
        $scope.processing = false;
        $rootScope.$broadcast('alert', {
          type: 'success',
          msg: 'Your expenses were updated successfully.'
        });
        return $rootScope.$broadcast('refresh');
      }, function(err) {
        $scope.processing = false;
        return $rootScope.$broadcast('alert', {
          type: 'danger',
          msg: 'There was an error updating your expenses.'
        });
      });
    };
  });

}).call(this);

//# sourceMappingURL=expenses.js.map
