(function() {
  'use strict';
  angular.module('agera').directive('reservesProgressBar', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/_reserves-progress-bar.html',
      scope: {
        balance: '=',
        amount: '=',
        impulse: '=',
        oneCr: '=',
        threeCr: '=',
        sixCr: '='
      },
      link: function(scope, element, attrs) {
        return scope.$watch('amount', function(newValue, oldValue) {
          if (newValue == null) {
            return;
          }
          scope.reservesPrePercentage = (scope.balance / scope.amount) * 100;
          scope.impulsePercentage = (scope.impulse / scope.amount) * 100;
          return scope.reservesPostPercentage = scope.reservesPrePercentage - scope.impulsePercentage;
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=reserves-progress-bar.js.map
