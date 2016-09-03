(function() {
  'use strict';
  angular.module('actions').controller('ActionListCtrl', function($scope, $rootScope, $modal, $filter, $location, $window, $q, matchmedia, Scenario, goalService, Action) {
    var filterActionables, unregister;

    $scope.categoryFilter = {};
    $scope.noFilter = true
    $scope.changeCategoryFilter = function(category) {
      if (category == '') {
        $scope.categoryFilter = {}
        $scope.noFilter = true
        return
      } else if (category == 'completed') {
        $scope.categoryFilter = {is_completed: true}
      } else {
        $scope.categoryFilter = {category: category}
      }
      $scope.noFilter = false
    }

    if ($location.path() === '/actions') {
      $rootScope.$broadcast('clearAlerts');
    }

    unregister = matchmedia.onPhone(function(mediaQueryList) {
      $scope.iconSize = mediaQueryList.matches ? 'sm' : 'med';
    });

    $scope.summaryPath = function(goal) {
      return "/#/summaries/" + (_.pluralize(goal.type.toLowerCase())) + "/" + goal.guid;
    };

    filterActionables = function(actionables) {
      return _.filter(actionables, function(a) {
        return a.actions.length;
      });
    };

    $scope.fetchData = function() {
      $scope.loading = true;
      return Scenario.get().$promise.then(function(scenario) {
        var goals, impulseItems, taxRefunds;
        impulseItems = filterActionables(scenario.impulse_items);
        taxRefunds = filterActionables(scenario.tax_refunds);
        goals = filterActionables(scenario.goals);
        $scope.actionables = impulseItems.concat(taxRefunds.concat(goals));
        $scope.completedCount = _.filter($scope.actionables, function(item) {
          item.is_completed == true;
        }).length
      })["finally"](function() {
        return $scope.loading = false;
      });
    };

    $scope.fetchData();
    $scope.$on('refresh', function() {
      return $scope.fetchData();
    });

    $scope.target = function(action) {
      if (action.match(/^http/)) {
        return '_blank';
      } else {
        return '_self';
      }
    };
    $scope.openUrl = function(action) {
      if (action.actionable_href.match(/^http/)) {
        return action.actionable_href;
      } else {
        return "/#/actions/" + action.guid + "/open";
      }
    };
    $scope.open = function(type, action, category, obj) {
      return goalService.get(obj).then(function(goal) {
        var hyphenateType, modalInstance;
        obj = _.extend(obj, goal);
        $scope.items = [];
        hyphenateType = _.trim(_.dasherize(obj.type), '-');
        $scope.items.push(hyphenateType, action, category, obj);
        return modalInstance = $modal.open({
          templateUrl: "/views/timeline/" + category + "-modal.html",
          controller: 'GoalModalCtrl',
          resolve: {
            items: function() {
              return $scope.items;
            }
          }
        });
      });
    };
    $scope.goToSingleAction = function(action) {
      if (matchmedia.isPhone()) {
        return $location.path("/actions/" + action.guid);
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

    $scope.showRationale = function (action) {

      Action.getRationale({guid: action.guid}).$promise.then(function (rationaleResult) {

        $rootScope.rationaleResults = null;
        $rootScope.rationaleResults = rationaleResult;

        if (rationaleResult != null) {
          $("#rationaleModal").modal({ backdrop: false });
        }
      });

      return true;

    };

    $scope.getActionStatus = function(action) {
      if (action.is_complete) {
        return 'complete-status';
      } else if (moment(action.assigned_on).isSame(moment(), 'month') || moment(action.assigned_on).isAfter(moment())) {
        return 'pending-status';
      } else if (moment(action.assigned_on).isSame(moment().subtract(1, 'months'), 'month')) {
        return 'warning-status-yellow';
      } else {
        return 'warning-status';
      }
    };
  });

}).call(this);

//# sourceMappingURL=action-list.js.map
