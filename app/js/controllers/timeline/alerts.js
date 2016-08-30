(function() {
  'use strict';
  angular.module('timeline').controller('AlertsCtrl', function ($scope, $rootScope,$timeout, $location) {

    return $scope.goToCashfinder = function() {
      return $location.path('/cashfinder');
    };
  });

}).call(this);

//# sourceMappingURL=alerts.js.map
