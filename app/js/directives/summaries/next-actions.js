(function() {
  'use strict';
  angular.module('summaries').directive('summariesNextActions', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/summaries/next-actions.tpl.html',
      scope: {
        actions: '=',
      },

      link: function($scope, element, attributes) {

      }
    };
  });
}).call(this);
