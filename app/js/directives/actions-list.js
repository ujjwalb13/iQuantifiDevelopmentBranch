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
        $scope.getActionStatus = function(action) {
          if (action.is_complete) {
            return 'complete-status';
          } else if (moment(action.assigned_on).utc().isSame(moment().utc(), 'month') || moment(action.assigned_on).utc().isAfter(moment())) {
            return 'pending-status';
          } else if (moment(action.assigned_on).utc().isSame(moment().utc().subtract(1, 'months'), 'month')) {
            return 'warning-status-yellow';
          } else {
            return 'warning-status';
          }
        };

        $scope.showRationale = function (action) {
          Action.getRationale({guid: action.guid}).$promise.then(function (rationaleResult) {

            $rootScope.rationaleResults = null;
            $rootScope.rationaleResults = rationaleResult;

            if (rationaleResult != null && rationaleResult.RationaleSections != null && rationaleResult.RationaleSections.length > 0) {
              $rootScope.rationaleResults.SelectedSection = rationaleResult.RationaleSections[0].SectionKey;
              $("#rationaleModal").modal({ backdrop: false });
            }
          });
          return true;
        };

        $scope.openUrl = function(action) {
          if (action.actionable_href.match(/^http/)) {
            return action.actionable_href;
          } else {
            return "/#/actions/" + action.guid + "/open";
          }
        };

        $scope.target = function(href) {
          if (href.match(/^http/)) {
            return '_blank';
          } else {
            return '_self';
          }
        };

        $scope.completeAction = function(action) {
          var option;
          if (action.positions != null) {
            option = angular.element("#action-" + action.guid + " div.slick-active.slick-center div.slide").data('option-id') || angular.element("#action-" + action.guid + " div.slick-center div.slide").data('option-id');
          }
          return Action.update({
            guid: action.guid,
            option: option
          }).$promise.then(function() {
            action.is_complete = true;
            return $rootScope.$broadcast('refreshActionsCount');
          });
        };
      }
    };
  });
}).call(this);
