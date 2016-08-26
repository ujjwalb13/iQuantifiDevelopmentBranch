(function() {
  'use strict';
  angular.module('actions').controller('ActionDetailCtrl', function($scope, $rootScope, $routeParams, Action, goalService) {
    Action.get({
      guid: $routeParams.actionId
    }).$promise.then(function(action) {
      $scope.action = action;
      return goalService.get({
        href: $scope.action.actionable_href
      }).then(function(actionable) {
        return $scope.actionable = actionable;
      });
    });
    return $scope.completeAction = function() {
      return $scope.action.$save({
        option: 0
      }).then(function() {
        $scope.action.is_complete = true;
        return $rootScope.$broadcast('refreshActionsCount');
      });
    };
  });

}).call(this);

//# sourceMappingURL=action-detail.js.map
