(function() {
  'use strict';
  angular.module('agera').directive('carSoldRadio', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/goals/car-sold-radio.tpl.html',
      scope: {
        amount: '='
      },
      link: function(scope) {
        return scope.amountEntered = function() {
          return _.isNumber(scope.amount);
        };
      }
    };
  });

}).call(this);

//# sourceMappingURL=flexible-percentages.js.map
