(function() {
  'use strict';
  angular.module('agera').factory('Income', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/finance/incomes/:guid", {
        guid: '@guid'
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=income.js.map
