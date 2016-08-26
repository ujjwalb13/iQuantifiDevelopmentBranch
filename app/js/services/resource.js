(function() {
  'use strict';
  angular.module('agera').factory('Resource', function($resource) {
    return function(url, params, methods) {
      var defaults, resource;
      defaults = {
        update: {
          method: 'PUT',
          isArray: false
        },
        create: {
          method: 'POST'
        }
      };
      methods = angular.extend(defaults, methods);
      resource = $resource(url, params, methods);
      resource.prototype.$save = function() {
        if (!(this.id || this.guid)) {
          return this.$create();
        } else {
          return this.$update();
        }
      };
      return resource;
    };
  });

}).call(this);

//# sourceMappingURL=resource.js.map
