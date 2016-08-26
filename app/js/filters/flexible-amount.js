(function() {
  'use strict';
  angular.module('agera').filter('flexibleAmount', function() {
    return function(input) {
      return "(" + input + ")";
    };
  });

}).call(this);

//# sourceMappingURL=flexible-amount.js.map
