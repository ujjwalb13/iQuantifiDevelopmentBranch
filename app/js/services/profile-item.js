'use strict';
angular.module('agera').factory('ProfileItem', ['Resource', '$http', 'ENV',
  function(resource, http, ENV) {
    return resource(
      ENV.apiHost + "/ProfileItems/:itemId", {
        itemId: '@itemId'
      }, {
        query: {
          isArray: false
        }
      }

    );
  }]
);
