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

    $scope.goToAccountEdit = function (guid) {
      return $location.path("/my-money/accounts/" + guid);
    };

    $scope.goToDebtEdit = function (kind, guid) {
      var editUrl = "/debts/" + (_.pluralize(kind)).toLowerCase() + "/" + guid + "/edit";
      $location.path(editUrl);
    }
  });


}).call(this);

//# sourceMappingURL=accounts.js.map
