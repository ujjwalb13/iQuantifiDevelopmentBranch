(function() {
  'use strict';
  angular.module('agera').filter('protectionTypeName', function() {
    return function(input) {
      if (input === "life") {
        return "Life";
      }
      if (input === "disability") {
        return "Disability";
      }
      if (input === "care") {
        return "Long Term Care";
      }
    };
  });

}).call(this);

//# sourceMappingURL=protection-type-name.js.map
