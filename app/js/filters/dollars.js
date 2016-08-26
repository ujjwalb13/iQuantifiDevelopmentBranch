(function() {
  'use strict';
  angular.module('agera').filter('dollars', function($filter) {
    return function(input) {
      var str;
      str = input || '';
      if ((str + '').match(/^\d*\.?\d*$/)) {
        str = Math.round(str);
        str = $filter('currency')(str);
        return str.substring(0, str.length - 3);
      } else {
        return str;
      }
    };
  });

}).call(this);

//# sourceMappingURL=dollars.js.map
