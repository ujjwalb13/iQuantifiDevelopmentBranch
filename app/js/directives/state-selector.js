(function() {
  'use strict';
  angular.module('agera').directive('stateSelector', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/state-selector.tpl.html',
      scope: {
        model: '=',
        name: '@',
        label: '@',
        stateChanged: '&'
      },
      link: function($scope, element, attributes) {
        return $scope.emptyName = attributes.emptyname || 'Select State';
      },
      controller: [
        "$scope", function($scope) {
        }
      ]
    };
  });

}).call(this);

//# sourceMappingURL=state-selector.js.map
