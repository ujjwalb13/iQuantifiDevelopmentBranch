(function() {
  "use strict";
  angular.module('onboard').controller('onboardAccountCtrl', function($scope, $rootScope, $location, $q, $modal, matchmedia, onboardService, Account, Person, welcomeTextService, Institution, Member, Job) {
    var DisableModalInstanceCtrl, completeSetup, getLinkedAccounts, getManualAccounts, partitionAccounts;
    $rootScope.step = 3;
    $scope.currentStep = 3;
    $scope.welcome = welcomeTextService.account();
    $scope.accounts = [];
    $q.all([Person.query().$promise, Account.query().$promise]).then(function(data) {
      $scope.people = data[0];
      $scope.accounts = data[1];
      return partitionAccounts();
    });
    partitionAccounts = function() {
      $scope.linkedAccounts = getLinkedAccounts($scope.accounts);
      return $scope.manualAccounts = getManualAccounts($scope.accounts);
    };
    getLinkedAccounts = function(data) {
      return _.filter(data, function(account) {
        return account.mx_guid;
      });
    };
    getManualAccounts = function(data) {
      return _.filter(data, function(account) {
        return !account.mx_guid;
      });
    };
    $scope.goToAccountEdit = function(accountGuid) {
      return $location.path("/onboard/accounts/" + accountGuid);
    };
    $scope.next = function() {
      if (!_.findWhere($scope.accounts, {
        kind: 'checking'
      })) {
        $rootScope.$broadcast('alert', {
          type: 'danger',
          msg: 'A checking account is required'
        });
        return;
      }
      $scope.pending = true;
      return onboardService.process_transactions().then(function() {
        return onboardService.is_complete().then(function(data) {
          return completeSetup();
        }, function(data) {
          if (!data.accounts) {
            return;
          }
          if (!data.income) {
            return $location.path('/onboard/manual-income');
          }
          if (!data.expenses) {
            return $location.path('/onboard/manual-expenses');
          }
        });
      })["finally"](function() {
        return $scope.pending = false;
      });
    };
    completeSetup = function() {
      $rootScope.firstTime = true;
      return onboardService.finish().then(function(data) {
        var d, i, len, results;
        $rootScope.$broadcast('refresh');
        if (("" + data).trim() === "") {
          $rootScope.currentUser.is_setup_complete = true;
          if (matchmedia.isPhone()) {
            return $location.path('/onboard/goals');
          } else {
            return $location.path('/');
          }
        } else {
          $scope.errors = [];
          results = [];
          for (i = 0, len = data.length; i < len; i++) {
            d = data[i];
            results.push($scope.errors.push(d[0] + ": " + d[1]));
          }
          return results;
        }
      });
    };
    $scope.disabled = function($event) {
      if ($location.host() === 'pilot.iquantifi.com') {
        $event.preventDefault();
        return $modal.open({
          templateUrl: 'linkDisabled',
          controller: DisableModalInstanceCtrl
        });
      }
    };
    DisableModalInstanceCtrl = [
      '$scope', '$modalInstance', function($scope, $modalInstance) {
        return $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
      }
    ];
    $scope.searchInstitutions = function(value) {
      $scope.complete = false;
      return Institution.search({
        q: value
      }).$promise.then(function(institutions) {
        return institutions;
      });
    };
    $scope.goToInstitution = function($item, $model, $label) {
      return $location.path("/onboard/accounts/link/" + $item.guid + "/" + $label);
    };
    return $scope.remove = function(account) {
      account.deleting = true;
      return account.$delete().then(function(result) {
        $rootScope.$broadcast('alert', {
          type: 'success',
          msg: 'The account was removed successfully.'
        });
        $rootScope.$broadcast('refresh');
        $scope.accounts = _.reject($scope.accounts, function(item) {
          return item === account;
        });
        return partitionAccounts();
      }, function(err) {
        return $rootScope.$broadcast('alert', {
          type: 'danger',
          msg: 'There was an error removing the account.'
        });
      })["finally"](function() {
        return account.deleting = false;
      });
    };
  });

}).call(this);

//# sourceMappingURL=account_controller.js.map
