(function() {
  'use strict';
  angular.module('agera').controller('AccountsCtrl', function($location, $scope, $rootScope, Account) {
    $scope.accounts = Account.query();
    $scope.goToAccountEdit = function(guid) {
      return $location.path("/my-money/accounts/" + guid);
    };
    return $scope.disabled = function() {
      if ($location.host() === 'pilot.iquantifi.com') {
        return "my-money/accounts/new";
      } else {
        return "#my-money/accounts/link";
      }
    };
  });

  angular.module('agera').controller('AccountFormCtrl', function ($window,$modal, $scope, $routeParams, $rootScope, $location, $q, Account, Person) {
    var ModalInstanceCtrl;
    $scope.addMode = "cash";
    $routeParams.accountId
    if ($routeParams.accountId) {
      $q.all([
        Account.get({
          guid: $routeParams.accountId
        }).$promise, Person.query().$promise
      ]).then(function(data) {
        $scope.account = data[0];
        $scope.editMode = true;
        return $scope.people = data[1];
      });
    } else {
      $scope.addmode = $routeParams.addmode;
      $scope.account = new Account();
      $scope.people = Person.query();
      $scope.editMode = false;
    }
    $scope.owners = $scope.people;
    $scope.$watch('account.kind', function(newValue) {
      if (newValue === 'education') {
        $scope.owners = _.filter($scope.people, function(person) {
          return person.relationship === 'child';
        });
        if ($scope.owners.length === 0) {
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: "529 plans can only owned by a child. Please add a child before adding a 529 plan."
          });
        }
      } else {
        return $scope.owners = $scope.people;
      }
    });

    $scope.gotoAccounts = function () {
      return $window.history.back();
    };

    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        $scope.account.person_guid = $scope.account.person.guid;
        var accounts = [];
        accounts.push($scope.account);
        return Account.updateList(accounts).$promise.then(function (result) {
          $scope.processing = false;
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The account was saved successfully.'
          });
          $rootScope.$broadcast('refresh');
          return $scope.gotoAccounts();
        }, function(err) {
          $scope.processing = false;
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error saving the account.'
          });
        });
      }
    };

    $scope.openDeleteModal = function(account) {
      var modalInstance;
      $rootScope.savable = false;
      return modalInstance = $modal.open({
        templateUrl: 'deleteAccountModal',
        controller: ModalInstanceCtrl,
        resolve: {
          account: function() {
            return account;
          }
        }
      });
    };

    return ModalInstanceCtrl = [
      '$location', '$scope', '$modalInstance', 'account', function($location, $scope, $modalInstance, account) {
        $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
        return $scope.deleteAccount = function () {
          $scope.deleting = true;
          var errorVerb, successVerb;
          if ('guid' in account) {
            successVerb = 'unlinked';
            errorVerb = 'unlinking';
          } else {
            successVerb = 'deleted';
            errorVerb = 'deleting';
          }
          return account.$delete().then(function(result) {
            $modalInstance.close(account);
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: "The account was " + successVerb + " successfully."
            });
            return $location.path('my-money/accounts');
          }, function(err) {
            $modalInstance.dismiss('cancel');
            return $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: "There was an error " + errorVerb + " the account."
            });
          })["finally"](function () {
            return $scope.deleting = false;
          });
        };
      }
    ];
  });

}).call(this);

//# sourceMappingURL=accounts.js.map
