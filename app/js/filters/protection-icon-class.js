(function() {
  'use strict';
  angular.module('agera').filter('protectionIconClass', function() {
    return function(input) {
      if (input === "lifepolicy") {
        return "icon-pt-life";
      }
      if (input === "disabilitypolicy") {
        return "icon-pt-disability";
      }
      if (input === "carepolicy") {
        return "icon-pt-longterm-care";
      }
      if (input === "cr1") {
        return "icon-pt-moth-case-reserve";
      }
      if (input === "cr3") {
        return "icon-pt-3-moth-case-reserve";
      }
      if (input === "cr6") {
        return "icon-pt-6-moth-case-reserve";
      }
    };
  });

}).call(this);

//# sourceMappingURL=protection-icon-class.js.map
