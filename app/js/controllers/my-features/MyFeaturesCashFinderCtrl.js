(function () {
  'use strict';
  angular.module('agera').controller('MyFeaturesCashFinderCtrl', function($scope, $routeParams, $rootScope, $http, $location, $modal, Expense, Scenario, CashfinderService, ENV) {
    var TaxModalInstanceCtrl;
    $rootScope.$broadcast('clearAlerts');

    var setDefaultSelectExpense = function() {
      $scope.selectedExpense = $rootScope.expenses[0]
    }

    CashfinderService.fetchData().then(function(){
      if ($rootScope.shortage > 0) {
        $rootScope.showExpenses = true
        setDefaultSelectExpense();
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
          setDefaultSelectExpense();
        } else {
          $rootScope.showExpenses = false;
        }
        $scope.processing = false;
        $scope.submitted = false;
      })
    }

    $scope.reducibleExpenseFilter = function(){
      if($scope.showAllExpenses) {
        return {}
      } else {
        return function(item) {
          return item.amount > 0;
        }
      }
    }

    $scope.toggleExpenseView = function() {
      $scope.showAllExpenses = !$scope.showAllExpenses;
    }
    $scope.selectExpense = function(expense) {
      $scope.selectedExpense = expense
    }

    $scope.isOriginalRecommendation = function(expense) {
      return expense.new_amount === expense.recommended_amount
    }
    $scope.reset = function() {
      $scope.selectedExpense = {};
      $rootScope.overrides = {};
      $rootScope.showAllExpenses = false;
      _.each($rootScope.expenses, function(expense){
        expense.new_amount = expense.recommended_amount || expense.amount;
      })
      _.defer(function(){
        setDefaultSelectExpense();
      })
    };

    $scope.save = function() {
      $rootScope.processing = true;
      _.each($rootScope.expenses, function(expense){
        expense.amount = expense.new_amount;
      });

      Expense.save({expenses: $rootScope.expenses})
        .$promise
        .then(function(result) {
          return Scenario.shortage().$promise.then(function(data) {
            var newShortage;
            newShortage = data.shortage;
            $rootScope.processing = false;
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
        $scope.beingEditExpense = {amount: $scope.expense.new_amount};
        fetchSubcategories($scope.expense.kind);
      }
    })

    $scope.keep = function() {
      $scope.selectedExpense.new_amount = $scope.selectedExpense.amount;
      $scope.beingEditExpense.amount = $scope.selectedExpense.amount;
      $rootScope.overrides[$scope.selectedExpense.kind] = $scope.selectedExpense.new_amount;
    };

    return $scope.save = function() {
      $scope.selectedExpense.new_amount = $scope.beingEditExpense.amount
      $rootScope.overrides[$scope.selectedExpense.kind] = $scope.selectedExpense.new_amount;
    };
  });

}).call(this);

//# sourceMappingURL=cashfinder.js.map
