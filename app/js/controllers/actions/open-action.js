(function() {
  'use strict';
  angular.module('actions').controller('OpenActionCtrl', function($scope, $rootScope, $routeParams, $location, Action, goalService) {
    Action.get({
      guid: $routeParams.actionId
    }).$promise.then(function(action) {
      $scope.action = action;
      return goalService.validAccounts(action.actionable_href, action.account_type).then(function(response) {
        return $scope.accounts = response.data;
      });
    });
    $scope.linkAccount = function(accountGuid, goalHref) {
      return goalService.link(goalHref, accountGuid).then(function(response) {
        $scope.action.is_complete = true;
        $rootScope.$broadcast('refreshActionsCount');
        $rootScope.$broadcast('alert', {
          type: 'success',
          msg: "The account was linked successfully."
        });
        return $location.path('/');
      });
    };
    return $scope.createAccount = function() {
      return $scope.action.$save({
        option: 0
      }).then(function() {
        $scope.action.is_complete = true;
        $rootScope.$broadcast('refreshActionsCount');
        $rootScope.$broadcast('alert', {
          type: 'success',
          msg: "This account has been added for you."
        });
        return $location.path('/accounts');
      });
    };
  });

}).call(this);

//# sourceMappingURL=open-action.js.map
