(function() {
  'use strict';
  angular.module('agera').factory('Product', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/advice/products/:id", {
        id: '@id'
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=product.js.map
