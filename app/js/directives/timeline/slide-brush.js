(function() {
  'use strict';
  angular.module('timeline').directive('slideBrush', function() {
    return {
      restrict: 'EAC',
      link: function(scope, element, attrs) {
        var side;
        side = attrs["class"].indexOf('brush-start') !== -1 ? 'start' : 'end';
        return element.on('drag', function(e) {
          var centerDelta, endOn, focusEndOn, focusStartOn, newDate, opositeElement, oppositeElementLeft, startOn, timelineOffset, timelinex;
          startOn = scope.context.startOn;
          endOn = scope.context.endOn;
          focusStartOn = scope.focus.startOn;
          focusEndOn = scope.focus.endOn;
          timelineOffset = element.closest('.timeline-context').offset().left;
          centerDelta = side === 'start' ? 20 : -20;
          timelinex = e.pageX - timelineOffset + centerDelta;
          opositeElement = side === 'start' ? angular.element('.brush-end') : angular.element('.brush-start');
          oppositeElementLeft = opositeElement.offset().left - timelineOffset;
          if (side === 'start' && timelinex >= oppositeElementLeft) {
            return;
          }
          if (side === 'end' && timelinex <= oppositeElementLeft + 40) {
            return;
          }
          newDate = moment(scope.context.xscale.invert(timelinex, 0));
          if (startOn.isAfter(newDate)) {
            newDate = startOn;
          }
          if (endOn.isBefore(newDate)) {
            newDate = endOn;
          }
          scope.context.brush[side + 'X'] = scope.context.xscale(newDate);
          scope.context.brush[side + 'On'] = newDate;
          scope.focus[side + 'On'] = newDate;
          return scope.$apply();
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=slide-brush.js.map
