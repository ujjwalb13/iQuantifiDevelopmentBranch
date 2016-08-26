(function() {
  'use strict';
  angular.module('timeline', ['ui.grid', 'ui.grid.pinning']).controller('AddItemsCtrl', function($scope, $rootScope, $modal) {
    $scope.types = ['baby', 'car', 'college', 'house', 'relocation', 'rent', 'ring', 'travel', 'wedding'];
    $scope.icon = function(type) {
      if (type === 'wedding') {
        return 'icon-goal-sm-purchase';
      } else {
        return 'icon-goal-sm-' + type;
      }
    };
    $scope.mobileIcon = function(type) {
      if (type === 'wedding') {
        return 'purchase';
      } else {
        return type;
      }
    };
    $scope.tooltip = function(type) {
      if (type === 'wedding') {
        return 'purchase';
      } else {
        return type;
      }
    };
    if ($rootScope.firstTime) {
      $scope.expanderOpen = true;
    }
    $scope.$on('newHouse', function(event, obj) {
      return $scope.open('house', 'New', 'goal', {
        downsize: obj
      });
    });
    $scope.$on('newRent', function(event, obj) {
      return $scope.open('rent', 'New', 'goal', {
        downsize: obj
      });
    });
    return $scope.open = function(type, action, category, obj) {
      var modalInstance;
      $scope.items = [];
      $scope.items.push(type, action, category, obj);
      return modalInstance = $modal.open({
        templateUrl: "/views/timeline/" + category + "-modal.html",
        controller: 'GoalModalCtrl',
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });
    };
  });

}).call(this);

//# sourceMappingURL=add-items.js.map
