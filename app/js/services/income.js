(function() {
  'use strict';
  angular.module('agera').factory('Income', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/finance/incomes/:guid", {
        guid: '@guid'
      },
      {
          updateList: {
              method: 'POST',
              isArray: true
          }
      }
      );
    }
  ]);

}).call(this);

//# sourceMappingURL=income.js.map
