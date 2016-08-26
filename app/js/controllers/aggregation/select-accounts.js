(function() {
  'use strict';
  angular.module('aggregation').controller('SelectAccountsCtrl', function(onboarding, $scope, $routeParams, $location, $q, Institution, Account, welcomeTextService) {
    $scope.currentStep = 3;
    $scope.welcome = welcomeTextService.account();
    Institution.get({
      id: $routeParams.institutionId
    }).$promise.then(function(data) {
      return $scope.institution = data;
    });
    return $scope.submit = function() {
      var account;
      $scope.processing = true;
      return $q.all((function() {
        var i, len, ref, results;
        ref = $scope.institution.accounts;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          account = ref[i];
          results.push(Account.update(account).$promise);
        }
        return results;
      })()).then(function(data) {
        if (onboarding) {
          return $location.path("onboard/accounts");
        } else {
          return $location.path("accounts");
        }
      })["finally"](function() {
        return $scope.processing = false;
      });
    };
  });

}).call(this);

//# sourceMappingURL=select-accounts.js.map
