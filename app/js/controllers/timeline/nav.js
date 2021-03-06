(function() {
  'use strict';
  angular.module('timeline').controller('NavCtrl', function ($scope, $rootScope, $location, $http, $q, $modal, Auth, Action, Scenario, goalService, ENV) {
    
    var fetchIncompleteActionsCount;
    fetchIncompleteActionsCount = function() {
      return Action.count().$promise.then(function(data) {
        return $scope.incompleteActionsCount = data.count;
      });
    };
    $scope.saveMenu = false;
    $rootScope.$watch('currentUser', function(newValue, oldValue) {
      if (newValue && !oldValue) {
        return fetchIncompleteActionsCount();
      }
    });
    $scope.$on('refreshActionsCount', function() {
      return fetchIncompleteActionsCount();
    });
    $scope.$on('refresh', function() {
      return fetchIncompleteActionsCount();
    });
    $scope.logout = function() {
      return Auth.logout().then(function(oldUser) {
        if ($rootScope.demo) {
          $rootScope.showDashboard = true;
        }
        $rootScope.currentUser = null
        $rootScope.$broadcast('clearAlerts');
        return $location.path('/login');
      });
    };
    $scope.cancel = function() {
      $scope.saveMenu = false;
      return Scenario.undo().$promise.then(function() {
        $rootScope.$broadcast('refresh');
        return $scope.saveMenu = false;
      });
    };
    $scope.organizationSlug = function() {
      if ($rootScope.currentUser) {
        return $rootScope.currentUser.organization_slug;
      } else {
        return 'iquantifi';
      }
    };
    $scope.save = function() {
      $scope.saveMenu = false;
      //$rootScope.$broadcast('refresh');
      return true;

      //return Scenario.save().$promise.then(function() {
      //  $rootScope.$broadcast('refresh');
      //  return $scope.saveMenu = false;
      //});
    };


    $scope.PlanGoalWidth = function (goalDate) {
      var dNow = new Date();
      var dGoalDate = new Date(goalDate);
      var nMonthYear = (dGoalDate.getMonth() / 12) + (dGoalDate.getYear() - dNow.getYear());

      var nShowYears = 5;
      var nMaxGoalWidth = 115 * nShowYears;

      var nGoalRatio = nMonthYear / nShowYears;

      if (nGoalRatio > 1) nGoalRatio = 1.0;

      return nMaxGoalWidth * nGoalRatio;
    };

    $scope.PlanGoalBackgroundColor = function (goalChange, goalChangePlan) {
      if (goalChange.GoalCategoryType !== 'debt') {
        // goal - green
        if (goalChangePlan.isCurrent) {
          return "#dcedc5";
        }
        else {
          return "#8ec249";
        }
      }
      else {
        // debt - red
        if (goalChangePlan.isCurrent) {
          return "#f9ccca";
        }
        else {
          return "#ed564d";
        }
      }
    };

    $scope.PlanGoalImageColor = function (goalChange) {
      if (goalChange.GoalCategoryType !== 'debt') {
        // goal - green
        return "green";
      }
      else {
        // debt - red
        return "red";
      }
    };


    $scope.PlanGoalYear = function (yearOffset) {
      var dNow = new Date();
      return (1900 + dNow.getYear() + yearOffset);
    };

    $scope.planChanges = null;
    $scope.$on('dirty-timeline', function () {

      Scenario.planChanges().$promise.then(function (planChangeResult) {

        $scope.planChanges = null;
        $scope.planChanges = planChangeResult;

        if (planChangeResult !== null) {
          if (planChangeResult.DataChanges.length > 0
            || planChangeResult.FinanceGoalChanges.length > 0
            || planChangeResult.RentGoalChanges.length > 0
            || planChangeResult.GeneralGoalChanges.length > 0) {

            if (planChangeResult.DataChanges.length == 0 || planChangeResult.DataChanges[0].DataType !== "nochanges") {
              $scope.saveMenu = true;
            }

          }
        }
      });

      return true;

    });

    $scope.PlanGoalHasShortage = function (planChangeResult) {
      if (planChangeResult !== null && planChangeResult.DataChanges.length > 0 && planChangeResult.DataChanges[0].DataType === "shortage") {
        return true;
      }
      else {
        return false;
      }
    };


    $scope.RationaleGraphSectionHeight = function (graphDataItem) {
      var height = (graphDataItem.AmountPercentage * 100) + '%';
      return height;
    };

    $scope.RationaleGraphSectionBackgroundColor = function (graphDataItem) {

      if (graphDataItem.Goal != null) {
        if (graphDataItem.Goal.category === "goal" || graphDataItem.Goal.category === "retirement") {
          return "#8ec54a";
        }
        else if (graphDataItem.Goal.category === "debt") {
          return "#e47b5a";
        }
        else if (graphDataItem.Goal.category === "expenses") {
          return "#e79546";
        }
        else if (graphDataItem.Goal.category === "protection") {
          return "#71aba9";
        }
      }

      return '#e6e6e6';
    };

    $scope.setTabTo = function (selectedCategory) {
      $rootScope.rationaleResults.SelectedSection = selectedCategory;
    };

    $scope.$on('clean-timeline', function () {
      return $scope.saveMenu = false;
    });
    $scope.openEditModal = function(type, action, category, obj) {
      if (category === 'retirement') {
        category = 'goal';
        obj.owner = obj.person;
      }
      return goalService.get(obj).then(function(goal) {
        var hyphenateType, modalInstance;
        obj = _.extend(obj, goal);
        obj.type = obj.goal_type;
        $scope.items = [];
        hyphenateType = _.trim(_.dasherize(type), '-');
        $scope.items.push(hyphenateType, action, category, obj);
        modalInstance = $modal.open({
          templateUrl: "/views/timeline/" + category + "-modal.html",
          controller: 'GoalModalCtrl',
          resolve: {
            items: function() {
              return $scope.items;
            }
          }
        });
        return modalInstance.result.then(function() {
          $location.path('/');
          return $rootScope.$broadcast('dirty-timeline');
        });
      });
    };
    return $scope.toggleMainMenu = function() {
      return $rootScope.showMainMenu = !$rootScope.showMainMenu;
    };
  });

}).call(this);

//# sourceMappingURL=nav.js.map
