(function() {
  'use strict';
  angular.module('agera').directive('goalsDeleteModal', function($modal) {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/goals/delete-modal.tpl.html',
      scope: {
        goal: '='
      },
      link: function(scope) {
        var ModalInstanceCtrl = [
          '$location', '$scope', '$modalInstance', 'goalService', 'goal', function($location, $scope, $modalInstance, goalService, goal) {
            $scope.goal = goal;

            $scope.close = function() {
              return $modalInstance.dismiss('cancel');
            };

            $scope.delete = function() {
              $scope.pending = true;
              return goalService["delete"]($scope.goal).then(function(response) {
                $modalInstance.close("okay");
                $rootScope.$broadcast('alert', {
                  type: 'success',
                  msg: 'The goal was deleted successfully.'
                });
              }, function(response) {
                $modalInstance.dismiss('cancel');
                return $rootScope.$broadcast('alert', {
                  type: 'danger',
                  msg: 'There was an error deleting the goal.'
                });
              })["finally"](function() {
                return $scope.pending = false;
              });
            };
          }
        ];

        scope.showModal = function (goal) {
          var modalInstance;
          return modalInstance = $modal.open({
            templateUrl: 'deleteGoalModal',
            controller: ModalInstanceCtrl,
            resolve: {
              goal: function() {
                return goal;
              }
            }
          });
        }
      }
    };
  });

}).call(this);

