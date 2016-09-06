(function() {
  'use strict';
  angular.module('agera').factory('Account', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/finance/accounts/:guid", {
        guid: '@guid'
      },
      {
          updateList: {
              method: 'POST',
              isArray: true
          },
          AccountsSummary: {
            method: 'GET',
            isArray: false,
            url: ENV.apiHost + "/finance/accounts/Summary"

          }
      }
      );
    }
  ]);

}).call(this);

//# sourceMappingURL=account.js.map
