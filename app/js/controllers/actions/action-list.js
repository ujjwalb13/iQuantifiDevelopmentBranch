(function() {
  'use strict';
  angular.module('actions').controller('ActionListCtrl', function($scope, $rootScope, $modal, $filter, $location, $window, $q, matchmedia, Scenario, goalService, Action) {
    var filterActionables, unregister;
    $scope.categoryFilter = {};
    $scope.lastDayOfMonth = moment().endOf('month').format('MMMM D');
    if ($location.path() === '/actions') {
      $rootScope.$broadcast('clearAlerts');
    }
    unregister = matchmedia.onPhone(function(mediaQueryList) {
      $scope.iconSize = mediaQueryList.matches ? 'sm' : 'med';
    });
    $scope.summaryPath = function(goal) {
      return "/#/summaries/" + (_.pluralize(goal.type.toLowerCase())) + "/" + goal.guid;
    };
    $scope.getWindowHeight = function() {
      return $window.innerHeight;
    };
    $scope.icon = function(size, type) {
      type = type.toLowerCase();
      if (type === 'wedding') {
        return "icon-goal-" + size + "-purchase";
      } else {
        return "icon-goal-" + size + "-" + type;
      }
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
        return $scope.actionables = impulseItems.concat(taxRefunds.concat(goals));
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
    $scope.toggleCategoryFilter = function(category) {
      if (($scope.categoryFilter.category != null) && $scope.categoryFilter.category === category) {
        return $scope.categoryFilter = {};
      } else {
        return $scope.categoryFilter = {
          category: category
        };
      }
    };
    $scope.toggleAlertFilter = function() {
      return $scope.alertFilterOn = !$scope.alertFilterOn;
    };
    $scope.getActionStatus = function(action) {
      if (action.is_complete) {
        return 'success';
      } else if (moment(action.assigned_on).isSame(moment(), 'month') || moment(action.assigned_on).isAfter(moment())) {
        return 'default';
      } else if (moment(action.assigned_on).isSame(moment().subtract(1, 'months'), 'month')) {
        return 'yellow-alert';
      } else {
        return 'alert';
      }
    };
    return $scope.alertFilter = function(goal) {
      var action, i, len, ref;
      if (!$scope.alertFilterOn) {
        return true;
      }
      ref = goal.actions;
      for (i = 0, len = ref.length; i < len; i++) {
        action = ref[i];
        if ($scope.getActionStatus(action) === 'alert') {
          return true;
        }
      }
      return false;
    };
  });

}).call(this);

//# sourceMappingURL=action-list.js.map
