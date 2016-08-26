(function() {
  'use strict';
  angular.module('agera').filter('monthYear', function() {
    return function(input) {
      var value;
      if (input !== null) {
        value = moment(input).format('MMM, YYYY');
      } else {
        value = 'null';
      }
      return value;
    };
  });

}).call(this);

//# sourceMappingURL=month-year.js.map
