(function() {
  'use strict';
  angular.module('agera').controller('WhatIfCtrl', function($scope, $rootScope, $location, $modal, Scenario, goalService, ENV) {
    var screenWidth;
    $scope.goalTypes = ['baby', 'car', 'house', 'relocation', 'rent', 'ring', 'travel', 'wedding'];
    $scope.icon = function(type) {
      type = type.toLowerCase();
      if (type === 'wedding') {
        return "purchase";
      } else {
        return type;
      }
    };
    $scope.title = function(type) {
      if (type === 'wedding') {
        return "purchase";
      } else {
        return type;
      }
    };
    $scope.slidesToShow = 3;
    $scope.addPartition = 3;
    screenWidth = window.innerWidth;
    if (screenWidth >= 768) {
      $scope.slidesToShow = 9;
      $scope.addPartition = 6;
    }
    Scenario.goals().$promise.then(function(scenario) {
      var goals;
      goals = _.where(scenario.goals, {
        category: 'goal'
      });
      goals.push({
        guid: 'new'
      });
      $scope.goals = _.reject(goals, function(obj) {
        return obj.type === 'Retirement' || obj.type === 'College' || obj.type === 'Profile';
      });
      while (!($scope.goals.length > $scope.slidesToShow)) {
        $scope.goals = $scope.goals.concat($scope.goals);
      }
      $scope.selectedGoal = $scope.goals[0];
      return $scope.selectedGoal.transition_on = moment($scope.selectedGoal.transition_on).toDate();
    });
    $scope.selectedAttribute = 'amount';
    $scope.setSelectedGoal = function(guid) {
      var goalGuid;
      goalGuid = guid || (goalGuid = angular.element('.what-if-slider .slick-center h3').data('guid'));
      if (goalGuid === 'new') {
        return $scope.selectedGoal = 'new';
      } else {
        $scope.selectedGoal = _.findWhere($scope.goals, {
          guid: goalGuid
        });
        return $scope.selectedGoal.transition_on = moment($scope.selectedGoal.transition_on).toDate();
      }
    };
    $scope.runScenario = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.running = true;
        $scope.errors = null;
        return goalService.put($scope.selectedGoal).then(function() {
          return Scenario.compare().$promise.then(function(data) {
            return $scope.results = _.reject(data, function(r) {
              return r.category === 'protection';
            });
          });
        }, function(error) {
          return $scope.errors = error.data.errors;
        })["finally"](function() {
          return $scope.running = false;
        });
      }
    };
    $scope.reset = function() {
      $scope.errors = null;
      return Scenario.undo().$promise.then(function() {
        return Scenario.goals().$promise.then(function(scenario) {
          var goal, i, len, newGoals, ref;
          newGoals = _.indexBy(scenario.goals, 'name');
          ref = $scope.goals;
          for (i = 0, len = ref.length; i < len; i++) {
            goal = ref[i];
            if (goal.name in newGoals) {
              goal = _.extend(goal, newGoals[goal.name]);
            }
          }
          $scope.selectedGoal = $scope.goals[0];
          return $scope.results = null;
        });
      });
    };
    $scope.save = function() {
      $scope.saving = true;
      return Scenario.save().$promise.then(function() {
        $rootScope.$broadcast('refresh');
        $scope.saving = false;
        return $location.path('/');
      });
    };
    return $scope.openGoalModal = function(type, action, category, obj) {
      var modalInstance;
      $scope.items = [type, action, category, obj];
      modalInstance = $modal.open({
        templateUrl: "/views/timeline/" + category + "-modal.html",
        controller: 'GoalModalCtrl',
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });
      return modalInstance.result.then(function(goal) {
        goal.type = goal.goalType;
        $scope.selectedGoal = goal;
        return Scenario.compare().$promise.then(function(data) {
          return $scope.results = _.reject(data, function(r) {
            return r.category === 'protection';
          });
        });
      });
    };
  });

}).call(this);

//# sourceMappingURL=what-if.js.map
