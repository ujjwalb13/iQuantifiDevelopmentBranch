(function() {
  'use strict';
  angular.module('agera').factory('Scenario', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/scenario", {}, {
        goals: {
          method: 'GET',
          isArray: false,
          url: ENV.apiHost + "/scenario/goals"
        },
        protections: {
          method: 'GET',
          isArray: false,
          url: ENV.apiHost + "/scenario/protections"
        },
        amortization: {
          method: 'GET',
          isArray: true,
          url: ENV.apiHost + "/scenario/amortization"
        },
        compare: {
          method: 'GET',
          isArray: true,
          url: ENV.apiHost + "/scenario/compare"
        },
        save: {
          method: 'PUT',
          isArray: false,
          url: ENV.apiHost + "/scenario/save"
        },
        undo: {
          method: 'PUT',
          isArray: false,
          url: ENV.apiHost + "/scenario/undo"
        },
        related: {
          method: 'GET',
          isArray: false,
          url: ENV.apiHost + "/scenario/related"
        },
        shortage: {
          method: 'GET',
          isArray: false,
          url: ENV.apiHost + "/scenario/shortage"
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=scenario.js.map
