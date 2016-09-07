(function () {
  'use strict';
  angular.module('agera').controller('AccountsSummaryCtrl', function ($location, $scope, $rootScope, $mdDialog, Account) {
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

    $scope.goToAccountNew = function () {
      return $location.path("/my-money/accounts/new");
    };

    $scope.goToDebtNew = function () {
      return $location.path("/add-debts");
    };

    $scope.goToPolicyNew = function () {
      return $location.path("/add-protection");
    };


    $scope.goToDebtEdit = function (kind, guid) {
      var editUrl = "/debts/" + (_.pluralize(kind)).toLowerCase() + "/" + guid + "/edit";
      $location.path(editUrl);
    }

    var originatorEv;

    $scope.openMenu = function ($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
  });


}).call(this);

//# sourceMappingURL=accounts.js.map
