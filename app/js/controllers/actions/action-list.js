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
  });

}).call(this);

//# sourceMappingURL=action-list.js.map
