(function() {
  'use strict';
  angular.module('agera').directive('flexibleMonths', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/goals/flexible-months.tpl.html',
      scope: {
        model: '='
      }
    };
  });

}).call(this);

//# sourceMappingURL=flexible-months.js.map
