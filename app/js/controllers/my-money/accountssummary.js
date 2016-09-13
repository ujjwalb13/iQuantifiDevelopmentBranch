(function () {
  'use strict';
  angular.module('agera').controller('AccountsSummaryCtrl', function ($location, $scope, $rootScope, $mdDialog, Account) {
    $scope.cashaccounts = {}
    $scope.investments = {};
    $scope.policies = {};
    $scope.debts = {};

    Account.AccountsSummary().$promise.then(function (data) {

      while (data.CashAccounts.length < 3) {
        data.CashAccounts.push({});
      };
      while (data.Investments.length < 3) {
        data.Investments.push({ AccountName: "&nbsp;", AccountSubText: "&nbsp;" });
      };
      while (data.Policies.length < 3) {
        data.Policies.push({ AccountName: "&nbsp; ", AccountSubText: "&nbsp; " });
      };
      while (data.Debts.length < 3) {
        data.Debts.push({ AccountName: "&nbsp; ", AccountSubText: " &nbsp;" });
      };



      $scope.cashaccounts = data.CashAccounts;
      $scope.investments = data.Investments;
      $scope.policies = data.Policies;
      $scope.debts = data.Debts;
    });


    $scope.categoryFilter = {};
    $scope.noFilter = true
    $scope.changeCategoryFilter = function (category) {
      if (category == '') {
        $scope.categoryFilter = {}
        $scope.noFilter = true
        return
      } else {
        $scope.categoryFilter = { category: category }
      }
      $scope.noFilter = false
    }






    $scope.goToAccountEdit = function (guid) {
      return $location.path("/my-money/accounts/" + guid);
    };

    $scope.goToAccountNewCash = function () {
      return $location.path("/my-money/accounts/new/cash");
    };
    $scope.goToAccountNewInvestment = function () {
      return $location.path("/my-money/accounts/new/investment");
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
    $scope.goToPolicyEdit = function (kind, guid) {
      var editUrl = "/policies/" + (_.pluralize(kind)).toLowerCase() + "/" + guid;
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
