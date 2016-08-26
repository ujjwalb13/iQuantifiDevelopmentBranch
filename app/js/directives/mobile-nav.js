(function() {
  'use strict';
  angular.module('agera').directive('mobileNav', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.mmenu();
        return element.find('a').click(function() {
          $('.mm-menu').slice(1).remove();
          return $('#my-menu').trigger('close.mm');
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=mobile-nav.js.map
