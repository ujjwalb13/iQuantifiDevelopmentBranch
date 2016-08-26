(function() {
  'use strict';
  angular.module('agera').filter('newProtectionIconClass', function() {
    return function(input) {
      if (input === "life") {
        return "icon-pt-life";
      }
      if (input === "disability") {
        return "icon-pt-disability";
      }
      if (input === "care") {
        return "icon-pt-longterm-care";
      }
    };
  });

}).call(this);

//# sourceMappingURL=new-protection-icon-class.js.map
