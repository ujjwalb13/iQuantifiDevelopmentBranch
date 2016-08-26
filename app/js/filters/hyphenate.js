(function() {
  'use strict';
  angular.module('agera').filter('hyphenate', function() {
    return function(input) {
      if (input) {
        return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      } else {
        return input;
      }
    };
  });

}).call(this);

//# sourceMappingURL=hyphenate.js.map
