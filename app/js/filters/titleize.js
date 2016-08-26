(function() {
  'use strict';
  angular.module('agera').filter('titleize', function() {
    return function(input) {
      return _.titleize(_.humanize(input));
    };
  });

}).call(this);

//# sourceMappingURL=titleize.js.map
