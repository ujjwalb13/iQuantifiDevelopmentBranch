(function () {
  'use strict';
  angular.module('agera').controller('AccountsSummaryCtrl', function ($location, $scope, $rootScope, Account) {
    $scope.cashaccounts = {}
    $scope.investments = {};
    $scope.policies = {};
    $scope.debts = {};

    Account.AccountsSummary().$promise.then(function (data) {
      $scope.cashaccounts = data.CashAccounts;
      $scope.investments = data.Investments;
      $scope.policies = data.Policies;
      $scope.debts = data.Debts;
    });


  });


}).call(this);

//# sourceMappingURL=accounts.js.map
