(function() {
  'use strict';
  angular.module('agera').controller('AddGoalCtrl', function($scope, $location) {
    $scope.types = ['baby', 'car', 'college', 'downsizing', 'house', 'purchase', 'relocation', 'rent', 'ring', 'travel', 'wedding'];
    return $scope.addNewGoal = function(type) {
      return $location.path("/goals/" + type + "/new");
    };
  });

}).call(this);

//# sourceMappingURL=add-goal.js.map
