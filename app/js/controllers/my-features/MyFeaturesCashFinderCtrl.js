(function () {
  'use strict';
  angular.module('agera').controller('MyFeaturesCashFinderCtrl', function($scope, $routeParams, $rootScope, $http, $location, $modal, Expense, Scenario, CashfinderService, ENV) {
    var TaxModalInstanceCtrl;
    $rootScope.$broadcast('clearAlerts');
    if ($rootScope.expenses == null) {
      CashfinderService.fetchData().then(function(){
        $scope.selectedExpense = $rootScope.expenses[0];
      });
    }

    $scope.selectExpense = function(expense) {
      $scope.selectedExpense = expense
    }

    $scope.openNeedTaxModal = function() {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'needTaxModal',
        controller: TaxModalInstanceCtrl,
        windowClass: 'new-iq-modal yellow'
      });
    };
    $scope.openHaveTaxModal = function() {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'haveTaxModal',
        controller: TaxModalInstanceCtrl,
        windowClass: 'new-iq-modal yellow'
      });
    };
    TaxModalInstanceCtrl = [
      '$scope', '$modalInstance', '$http', function($scope, $modalInstance, $http) {
        $scope.taxRefundAmount = 0;
        $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
        $scope.submit = function(amt) {
          $scope.processing = true;
          return $http.post(ENV.apiHost + "/tax_refunds", {
            year: moment().subtract(1, 'years').year(),
            amount: amt
          }).then(function() {
            return Scenario.shortage().$promise.then(function(data) {
              var newShortage;
              newShortage = data.shortage;
              if (newShortage > 0) {
                return $scope.openNotEnoughModal();
              } else {
                return $scope.openEnoughModal();
              }
            });
          })["finally"](function() {
            var processing;
            return processing = false;
          });
        };
        $scope.openTaxRefundModal = function() {
          var modalInstance;
          $modalInstance.close();
          return modalInstance = $modal.open({
            templateUrl: 'taxRefundModal',
            controller: TaxModalInstanceCtrl,
            windowClass: 'new-iq-modal yellow'
          });
        };
        $scope.openEnoughModal = function() {
          var modalInstance;
          $modalInstance.close();
          return modalInstance = $modal.open({
            templateUrl: 'enoughModal',
            controller: TaxModalInstanceCtrl,
            windowClass: 'new-iq-modal yellow'
          });
        };
        $scope.openNotEnoughModal = function() {
          var modalInstance;
          $modalInstance.close();
          return modalInstance = $modal.open({
            templateUrl: 'notEnoughModal',
            controller: TaxModalInstanceCtrl,
            windowClass: 'new-iq-modal yellow'
          });
        };
        $scope.openNoRefundModal = function() {
          var modalInstance;
          $http.post(ENV.apiHost + "/tax_refunds", {
            year: moment().subtract(1, 'years').year(),
            amount: 0
          });
          $modalInstance.close();
          return modalInstance = $modal.open({
            templateUrl: 'noRefundModal',
            controller: TaxModalInstanceCtrl,
            windowClass: 'new-iq-modal yellow'
          });
        };
        $scope.goToDashboard = function() {
          $modalInstance.close();
          return $location.path('/');
        };
        return $scope.goToWhatIf = function() {
          $modalInstance.close('close');
          return $location.path('/what-if');
        };
      }
    ];
    $scope.taxRefundAmount = 0;
    $http.get(ENV.apiHost + "/tax_refunds/current").then(function(data) {
      $scope.taxRefundAmount = data.data;
      if (CashfinderService.showModal) {
        if (!$scope.taxRefundAmount) {
          return $scope.openNeedTaxModal();
        } else {
          return $scope.openHaveTaxModal();
        }
      }
    });
    $scope.goToEdit = function(id) {
      return $location.path("/cashfinder/" + id);
    };
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
        console.log('sub', response)
        return $scope.subcategories = response.data;
      });
    };
    $scope.$watch('selectedExpense', function(newValue, oldValue){
      console.log(newValue, oldValue);
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
