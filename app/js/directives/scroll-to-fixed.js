(function() {
  'use strict';
  angular.module('agera').directive('scrollToFixed', function() {
    return {
      restrict: 'A',
      scope: {
        marginTop: '@'
      },
      link: function(scope, element, attrs) {
        return angular.element(document).ready(function() {
          return angular.element(element).scrollToFixed({
            marginTop: scope.marginTop || 55
          });
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=scroll-to-fixed.js.map
