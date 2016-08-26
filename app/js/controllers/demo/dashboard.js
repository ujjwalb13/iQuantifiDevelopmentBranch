(function() {
  'use strict';
  angular.module('agera').controller('DashboardCtrl', function($scope, $rootScope, $location, Scenario, ENV) {
    $scope.demo = $rootScope.demo;
    $scope.today = moment().format('MMMM d, YYYY');
    $scope.lastLogin = moment().subtract(1, 'week').format('MM/DD/YYYY @ hh:mm A');
    $scope.balanceDate = moment().format('MM/DD/YYYY');
    return $scope.timeline = function() {
      return $location.path('/');
    };
  });

}).call(this);

//# sourceMappingURL=dashboard.js.map
