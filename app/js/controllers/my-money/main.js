(function() {
  'use strict';
  angular.module('myMoney').controller('MyMoneyExpenseCtrl', function($scope, $routeParams, $location, Expense, DebtAndPolicyPayment, $http, ENV, $rootScope) {
    var setDefaultData, updateCategoryFilter;
    setDefaultData = function() {
      $scope.noFilter = true;
      $rootScope.expensesView = "monthly_expenses";
      $scope.categoryFilter = {
        income: false,
        expenses: false,
        accounts: false,
        "net-worth": false
      };
      return $scope.categories = {
        overview: {
          text: "Overview",
          icon: "icon-al-my-progress",
          position: 0
        },
        income: {
          text: "Income",
          icon: "icon-mm-income",
          position: 1
        },
        expenses: {
          text: "Expenses",
          icon: "icon-mm-expenses",
          position: 2
        },
        accounts: {
          text: "Accounts",
          icon: "icon-mm-accounts",
          position: 3
        },
        "net-worth": {
          text: "Net Worth",
          icon: "icon-mm-net-worth",
          position: 4
        }
      };
    };
    updateCategoryFilter = function() {
      var selectedCategoryKey;
      selectedCategoryKey = _.contains(Object.keys($scope.categories), $routeParams.type) ? $routeParams.type : "overview";
      _.each(_.keys($scope.categoryFilter), function(key) {
        return $scope.categoryFilter[key] = false;
      });
      if (selectedCategoryKey === "overview") {
        $scope.noFilter = true;
      } else {
        $scope.noFilter = false;
        $scope.categoryFilter[selectedCategoryKey] = true;
      }
      return $scope.selectedCategory = $scope.categories[selectedCategoryKey];
    };
    $scope.toogleDropdown = function() {
      return $scope.dropdownActive = !$scope.dropdownActive;
    };
    $scope.categories_array = function() {
      var categories, result;
      result = [];
      categories = _.clone($scope.categories);
      _.each(categories, function(category, key) {
        category["key"] = key;
        return result.push(category);
      });
      return result;
    };
    $scope.isActive = function(categoryKey) {
      if ($scope.noFilter && categoryKey === "overview") {
        return true;
      }
      return $scope.selectedCategory === $scope.categories[categoryKey];
    };
    $scope.navigateToCategory = function(selectedCategoryKey) {
      return $location.path(["", "my-money", selectedCategoryKey].join("/"));
    };
    $scope.updateExpensesView = function(view) {
      return $rootScope.expensesView = view;
    };
    $scope.isCurrentView = function(viewName) {
      return $rootScope.expensesView === viewName;
    };
    setDefaultData();
    updateCategoryFilter();
    function roundDebtsAndPolicy(response) {
      _.each(response, function(item){
        item.total_amount = Math.round(100.0 * item.total_amount) / 100;
        _.each(item.Detail, function(detail){
          detail.amount = Math.round(100.0 * detail.amount) / 100;
        });
      });
      return response;
    }
    function roundExpenses(response) {
      _.each(response, function(item){
        item.amount = Math.round(100.0 * item.amount) / 100;
        item.three_month_average_amount = Math.round(100.0 * item.three_month_average_amount) / 100;
      });
      return response;
    }
    Expense.query().$promise.then(function(response) {
      $scope.expenses = response; //roundExpenses(response);
    });
    DebtAndPolicyPayment.query().$promise.then(function(response) {
      $scope.debtsAndPolicyPayments = roundDebtsAndPolicy(response);
    });
  });

}).call(this);

//# sourceMappingURL=main.js.map
