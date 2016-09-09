(function () {
  'use strict';
  angular.module('agera').controller('MyFeaturesCashFinderCtrl', function($scope, $routeParams, $rootScope, $http, $location, $modal, Expense, Scenario, CashfinderService, ENV) {
    var TaxModalInstanceCtrl;
    $rootScope.$broadcast('clearAlerts');

    CashfinderService.fetchData().then(function(){
      if ($rootScope.shortage > 0) {
        $rootScope.showExpenses = true
      } else {
        $rootScope.showExpenses = false
      }
    });
    $scope.showAllExpenses = false;
    $scope.cashfinder = {}

    $scope.findCash = function(isValid) {
      $scope.submitted = true
      if (!isValid)
        return false
      $scope.processing = true;

      CashfinderService.fetchData().then(function(){
        $rootScope.expenses = _.filter($rootScope.expenses, function(expense){
          return expense.amount <= $scope.cashfinder.amount;
        })
        if ($rootScope.expenses.length > 0) {
          $rootScope.showExpenses = true;
        } else {
          $rootScope.showExpenses = false;
        }
        $scope.processing = false;
        $scope.submitted = false;
      })
    }

    $scope.reducibleExpenseFilter = function(item){
      return function() {
        console.log(item);
          return item.amount != item.new_amount

      }
    }

    $scope.selectExpense = function(expense) {
      $scope.selectedExpense = expense
    }

    $scope.reset = function() {
      $rootScope.overrides = {};
      $rootScope.showAllExpenses = false;
      return CashfinderService.fetchData();
    };
    $scope.save = function() {
      var expense, i, len, ref;
      $rootScope.loading = true;
      ref = $rootScope.expenses;
      for (i = 0, len = ref.length; i < len; i++) {
        expense = ref[i];
        expense.amount = expense.new_amount;
      }
      return Expense.save({
        expenses: $rootScope.expenses
      }).$promise.then(function(result) {
        return Scenario.shortage().$promise.then(function(data) {
          var newShortage;
          newShortage = data.shortage;
          $rootScope.loading = false;
          if (newShortage > 0) {
            return $scope.openDoneModal();
          } else {
            return $location.path('/');
          }
        });
      });
    };
    return $scope.openDoneModal = function() {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'doneModal',
        controller: TaxModalInstanceCtrl,
        windowClass: 'new-iq-modal yellow'
      });
    };
  });

  angular.module('agera').controller('CashfinderEditCtrl', function($scope, $routeParams, $rootScope, $http, $location, CashfinderService, ENV) {
    var fetchSubcategories;
    fetchSubcategories = function(name) {
      return $http.get(ENV.apiHost + "/finance/expenses/subcategories/" + name).then(function(response) {
        return $scope.subcategories = response.data;
      });
    };
    $scope.$watch('selectedExpense', function(newValue, oldValue){
      if (newValue != null && newValue != oldValue) {
        $scope.expense = newValue;
        fetchSubcategories($scope.expense.kind);
      }
    })

    $scope.keep = function() {
      $scope.selectedExpense.new_amount = $scope.selectedExpense.amount;
      $rootScope.overrides[$scope.selectedExpense.kind] = $scope.selectedExpense.new_amount;
    };

    return $scope.save = function() {
      $scope.saving = true;
      $rootScope.overrides[$scope.selectedExpense.kind] = $scope.selectedExpense.new_amount;
      return CashfinderService.fetchData().then(function() {
        $scope.saving = false;
      });
    };
  });

}).call(this);

//# sourceMappingURL=cashfinder.js.map
