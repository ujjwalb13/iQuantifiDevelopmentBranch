(function() {
  'use strict';
  angular.module('timeline').controller('AlertsCtrl', function($scope, $timeout, $location) {
    $scope.alerts = [];
    $scope.$on('alert', function(scope, alert) {
      return $scope.addAlert(alert);
    });
    $scope.$on('clearAlerts', function(scope, alerts) {
      return $scope.alerts = [];
    });
    $scope.addAlert = function(alert) {
      if (alert.id && _.findWhere($scope.alerts, {
        id: alert.id
      })) {
        return;
      }
      $scope.alerts.push(alert);
      if (alert.type === 'warning' || alert.type === 'success') {
        return $timeout(function() {
          return $scope.closeAlert(alert.$index);
        }, 10000);
      }
    };
    $scope.closeAlert = function(index) {
      return $scope.alerts.splice(index, 1);
    };
    return $scope.goToCashfinder = function() {
      return $location.path('/cashfinder');
    };
  });

}).call(this);

//# sourceMappingURL=alerts.js.map
