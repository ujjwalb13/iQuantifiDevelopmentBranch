(function() {
  'use strict';
  angular.module('summaries').controller('collegeSummaryCtrl', function($scope, $location, $routeParams, CollegeSummary, Action, $rootScope) {
   
    var fetchGoalData = function(goal, schedule) {
      $scope.schedule = schedule;
      $scope.collegeType = goal.is_public ? 'Public' : 'Private'
    };

    CollegeSummary.get({
      guid: $routeParams.guid
    }).$promise.then(function(object) {
      $scope.goal = object.goal();
      fetchGoalData($scope.goal, object.schedule);
      $scope.completedActions = object.completed_actions;
      $scope.actions = object.actions;
      $scope.accounts = object.associated_accounts;
    });

    $scope.goToEdit = function(goal) {
      var editUrl = "/" + (_.pluralize(goal.category)) + "/" + (_.pluralize(goal.goal_type.toLowerCase())) + "/" + goal.guid + "/edit";
      $location.path(editUrl);
    }
   
  });
}).call(this);

