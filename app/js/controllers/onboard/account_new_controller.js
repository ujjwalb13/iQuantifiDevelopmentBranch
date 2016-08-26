(function() {
  'use strict';
  angular.module('onboard').controller('onboardAccountNewCtrl', function($scope, $rootScope, $window, $location, Account, Person, welcomeTextService) {
    $scope.account = new Account();
    $scope.people = Person.query();
    $scope.owners = $scope.people;
    $scope.currentStep = 3;
    $scope.welcome = welcomeTextService.account();
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
    $scope.goBack = function() {
      return $window.history.back();
    };
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        $scope.account.person_guid = $scope.account.person.guid;
        return $scope.account.$save().then(function(result) {
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The account was created successfully.'
          });
          $rootScope.$broadcast('refresh');
          return $location.path('/onboard/accounts');
        }, function(err) {
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error creating the account.'
          });
        })["finally"](function() {
          return $scope.processing = false;
        });
      }
    };
    return $scope.editMode = false;
  });

}).call(this);

//# sourceMappingURL=account_new_controller.js.map
