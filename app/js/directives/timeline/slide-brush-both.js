(function() {
  'use strict';
  angular.module('timeline').directive('slideBrushBoth', function() {
    return {
      restrict: 'EAC',
      link: function(scope, element, attrs) {
        var dragstartx;
        dragstartx = null;
        element.on('dragstart', function(e) {
          return dragstartx = element.offset().left - e.pageX;
        });
        return element.on('drag', function(e) {
          var endInvalid, moveX, newEndOn, newEndX, newStartOn, newStartX, startInvalid, timelinex;
          timelinex = element.offset().left - e.pageX;
          moveX = dragstartx - timelinex;
          newStartX = scope.context.brush.startX + moveX;
          newEndX = scope.context.brush.endX + moveX;
          newStartOn = moment(scope.context.xscale.invert(newStartX, 0));
          newEndOn = moment(scope.context.xscale.invert(newEndX, 0));
          startInvalid = newStartOn.isBefore(scope.context.startOn);
          endInvalid = newEndOn.isAfter(scope.context.endOn);
          if (startInvalid || endInvalid) {
            if (startInvalid) {
              newStartOn = scope.context.startOn;
              newStartX = scope.context.xscale(newStartOn);
              newEndOn = scope.context.endOn;
              newEndX = scope.context.brush.endX;
            }
            if (endInvalid) {
              newStartOn = scope.context.startOn;
              newStartX = scope.context.brush.startX;
              newEndOn = scope.context.endOn;
              newEndX = scope.context.xscale(newEndOn);
            }
          }
          if (newStartOn.isAfter(scope.context.startOn) && newEndOn.isBefore(scope.context.endOn)) {
            scope.context.brush.startOn = scope.focus.startOn = newStartOn;
            scope.context.brush.endOn = scope.focus.endOn = newEndOn;
            scope.context.brush.startX = newStartX;
            scope.context.brush.endX = newEndX;
          }
          scope.context.brush.startX = newStartX;
          scope.context.brush.endX = newEndX;
          return scope.$apply();
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=slide-brush-both.js.map
