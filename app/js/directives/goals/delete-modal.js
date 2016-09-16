(function() {
  'use strict';
  angular.module('agera').directive('goalsDeleteModal', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/goals/delete-modal.tpl.html',
      scope: {
        goal: '='
      },
      link: function(scope) {
        scope.showModal = function () {
        }
      }
    };
  });

}).call(this);

