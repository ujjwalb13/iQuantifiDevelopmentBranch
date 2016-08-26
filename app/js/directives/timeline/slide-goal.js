(function() {
  'use strict';
  angular.module('timeline').directive('slideGoal', function($rootScope) {
    return {
      restrict: 'EAC',
      link: function(scope, element, attrs) {
        var convertDistanceToDate, hideDimScreen, isDragging, isValidDate, originalDate, setNewGoalDate, showDimScreen;
        if (scope.goal.category === "debt") {
          return;
        }
        scope.$watch('goal.date', function(newVal, oldVal) {
          var effectiveDate;
          if (newVal === oldVal) {
            return;
          }
          effectiveDate = isDragging() ? newVal : scope.goal.groupDate;
          return scope.goal.focus.x = scope.$parent.focus.xscale(new Date(effectiveDate));
        });
        originalDate = null;
        scope.showConfirm = false;
        element.on('dragstart', function(e) {
          element.removeClass('dragging');
          element.addClass('dragging');
          originalDate = scope.goal.date;
          scope.showConfirm = false;
          return showDimScreen();
        });
        element.on('dragend', function(e) {
          scope.showConfirm = true;
          return scope.$$phase || scope.$apply();
        });
        element.on('drag', function(e) {
          var distance, newDate, timelineOffset;
          timelineOffset = element.closest('.timeline-focus').offset().left;
          distance = e.pageX - timelineOffset;
          newDate = convertDistanceToDate(distance);
          if (!isValidDate(newDate)) {
            return;
          }
          return setNewGoalDate(newDate);
        });
        isDragging = function() {
          return element.hasClass('dragging');
        };
        showDimScreen = function() {
          return $rootScope.$broadcast('screen:dim');
        };
        hideDimScreen = function() {
          return $rootScope.$broadcast('screen:undim');
        };
        isValidDate = function(date) {
          var endOn, startOn;
          startOn = scope.$parent.context.startOn;
          endOn = scope.$parent.context.endOn;
          return startOn.isBefore(date) && endOn.isAfter(date);
        };
        convertDistanceToDate = function(positionX) {
          var newDate;
          newDate = moment(scope.$parent.focus.xscale.invert(positionX, 0));
          return newDate.startOf('month');
        };
        setNewGoalDate = function(date) {
          var dateStr;
          dateStr = date.format('YYYY-MM-DD');
          scope.goal.date = dateStr;
          scope.goal.start_on = dateStr;
          scope.goal.transition_on = dateStr;
          return scope.$apply();
        };
        scope.save = function() {
          element.removeClass('dragging');
          scope.showConfirm = false;
          hideDimScreen();
          scope.goal.onTop = false;
          scope.buildGoalsStack();
          return scope.saveGoal(scope.goal);
        };
        return scope.cancel = function() {
          scope.goal.date = originalDate;
          scope.goal.onTop = false;
          scope.showConfirm = false;
          element.removeClass('dragging');
          return hideDimScreen();
        };
      }
    };
  });

}).call(this);

//# sourceMappingURL=slide-goal.js.map
