(function() {
  'use strict';
  angular.module('agera').factory('Account', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/finance/accounts/:guid", {
        guid: '@guid'
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=account.js.map
