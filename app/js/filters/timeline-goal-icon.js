(function() {
  'use strict';
  angular.module('agera').filter('timelineGoalIcon', function(debtIconClassFilter, goalIconClassFilter) {
    return function(goal) {
      if (goal.category === 'debt') {
        return debtIconClassFilter(goal.kind);
      } else {
        return goalIconClassFilter(goal.type);
      }
    };
  });

}).call(this);

//# sourceMappingURL=timeline-goal-icon.js.map
