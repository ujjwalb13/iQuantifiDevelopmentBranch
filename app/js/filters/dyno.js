(function() {
  'use strict';
  angular.module('agera').filter('dyno', function($filter) {
    return function(input, name) {
      var str;
      str = input || '';
      if (name !== null) {
        try {
          str = $filter(name)(str);
        } catch (_error) {
          str = str + name;
        }
      }
      return str;
    };
  });

}).call(this);

//# sourceMappingURL=dyno.js.map
