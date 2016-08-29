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
      return Scenario.save().$promise.then(function() {
        $rootScope.$broadcast('refresh');
        return $scope.saveMenu = false;
      });
    };
    $scope.$on('dirty-timeline', function() {
      return $scope.saveMenu = true;
    });
    $scope.$on('clean-timeline', function() {
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
