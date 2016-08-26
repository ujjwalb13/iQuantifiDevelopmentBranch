(function() {
  'use strict';
  angular.module('onboard').controller('onboardGoalCtrl', function($scope, $location, Scenario) {
    return Scenario.goals().$promise.then(function(scenario) {
      return $scope.goals = scenario.goals;
    });
  });

}).call(this);

//# sourceMappingURL=goals_controller.js.map
