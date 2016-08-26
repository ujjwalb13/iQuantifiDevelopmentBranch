(function() {
  'use strict';
  angular.module('agera').factory('utilService', function() {
    var utilService;
    return utilService = {
      getAge: function(dob) {
        var a, b;
        a = moment(dob);
        b = moment();
        return b.diff(a, 'years');
      }
    };
  });

}).call(this);

//# sourceMappingURL=utils.js.map
