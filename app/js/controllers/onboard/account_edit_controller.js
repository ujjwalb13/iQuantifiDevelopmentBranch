(function() {
  'use strict';
  angular.module('onboard').controller('onboardAccountEditCtrl', function($scope, $routeParams, $rootScope, $location, $q, $window, Account, Person, welcomeTextService) {
    $scope.currentStep = 3;
    $scope.welcome = welcomeTextService.account();
    $q.all([
      Account.get({
        guid: $routeParams.accountId
      }).$promise, Person.query().$promise
    ]).then(function(data) {
      $scope.account = data[0];
      return $scope.owners = $scope.people = data[1];
    });
    $scope.goBack = function() {
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
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The account was updated successfully.'
          });
          $rootScope.$broadcast('refresh');
          return $location.path('/onboard/accounts');
        }, function(err) {
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error updating the account.'
          });
        })["finally"](function() {
          return $scope.processing = false;
        });
      }
    };
    $scope.editMode = true;
    return $scope.remove = function() {
      $scope.deleting = true;
      return $scope.account.$delete().then(function(result) {
        $rootScope.$broadcast('alert', {
          type: 'success',
          msg: 'The account was removed successfully.'
        });
        $rootScope.$broadcast('refresh');
        return $location.path('/onboard/accounts');
      }, function(err) {
        return $rootScope.$broadcast('alert', {
          type: 'danger',
          msg: 'There was an error removing the account.'
        });
      })["finally"](function() {
        return $scope.deleting = false;
      });
    };
  });

}).call(this);

//# sourceMappingURL=account_edit_controller.js.map
