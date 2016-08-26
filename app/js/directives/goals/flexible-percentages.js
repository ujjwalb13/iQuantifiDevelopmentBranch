(function() {
  'use strict';
  angular.module('agera').directive('flexiblePercentages', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/goals/flexible-percentages.tpl.html',
      scope: {
        model: '=',
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
