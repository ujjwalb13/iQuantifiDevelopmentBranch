(function() {
  'use strict';
  angular.module('agera').directive('actionsList', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/actions-list.tpl.html',
      scope: {
        actions: '=',
      },
      link: function($scope, element, attributes) {

      }
    };
  });

}).call(this);
