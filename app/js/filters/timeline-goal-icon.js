(function() {
  'use strict';
  angular.module('agera').filter('timelineGoalIcon', function(debtIconClassFilter, goalIconClassFilter, protectionIconClassFilter) {
    return function(goal) {
      if (goal.category === 'debt') {
        return debtIconClassFilter(goal.kind);
      } else if (goal.category === 'goal') {
        return goalIconClassFilter(goal.type);
      } else {
        return protectionIconClassFilter(goal.kind) || protectionIconClassFilter(goal.type);
      }
    };
  });

}).call(this);

//# sourceMappingURL=timeline-goal-icon.js.map
