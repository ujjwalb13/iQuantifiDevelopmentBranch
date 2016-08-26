(function() {
  'use strict';
  angular.module('timeline').directive('grabSlideBrush', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.addClass('mouseUp');
        elem.on('mousedown', function(e) {
          e.preventDefault();
          return $(this).addClass('mouseDown');
        }).on('mouseup', function() {
          return $(this).removeClass('mouseDown');
        });
        return elem.on('mouseup', function(e) {
          e.preventDefault();
          return $(this).addClass('mouseUp');
        }).on('mousedown', function() {
          return $(this).removeClass('mouseUp');
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=grab-slide-brush.js.map
