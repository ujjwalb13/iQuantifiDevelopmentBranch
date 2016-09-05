(function() {
  'use strict';
  angular.module('agera').controller('TimelineDashboardCtrl', function(Person,$scope, $modal, $filter, $rootScope, $location, $timeout, $cacheFactory, goalService, Action, Scenario, CashfinderService, ENV, ProfileItem, $mdToast) {
    var assignGoalOntop, broadcastShortage, buildGroups, calculateGoalPositionBasedOnGroup, calculateGoalStackedIndex, calculateGroupPosition, contextAxis, contextXScale, fetchIncompleteActionsCount, focusAxis, focusXScale, groupDefaultSize, gutter, modalInstance, partitionGoalsByMonth, refreshTimeline, renderTimeline, updateStackIndexWithinGroup;
    $rootScope.onTimeline = true;
    $scope.demo = $rootScope.demo;
    gutter = 40;
    groupDefaultSize = 3;
    $scope.gotoAddPage = function(type) {
      return $location.path("/add-" + type);
    };
    $scope.gotoProgressPage = function(type) {
      return $location.path("/progress/" + type);
    };
    $scope.gotoCashFinder = function() {
      return $location.path("/cashfinder");
    };
    $scope.gotoCompleteMyProfile = function() {
      return $location.path("/complete-my-profile");
    };
    $scope.gotoMyActions = function() {
      return $location.path("/actions");
    };
    $scope.gotoAchievementsPage = function() {
      return $location.path("/achievements");
    };
    var getActionCount = function() {
      return Action.count().$promise.then(function(response) {
        return $scope.incompleteActionsCount = response.count;
      });
    }
    fetchIncompleteActionsCount = function() {
      ProfileItem.count().$promise.then(function(response){
        if(response.incomplete > 0) {
          $scope.profileIncompleteCount = response.incomplete
        } else {
          getActionCount();
        }
      });
    }
    $scope.positionX = function(left, width) {
      var data;
      data = {
        transform: "translate3d(" + left + "px, 0px, 0px)"
      };
      if (width) {
        data.width = width + 'px';
      }
      return data;
    };
    $scope.icon = function(type) {
      type = type.toLowerCase();
      if (type === 'wedding') {
        return "purchase";
      } else {
        return type;
      }
    };
    $scope.goToSummary = function(goal) {
      if (goal.type == null) {
        return;
      }
      return $location.path("/summaries/" + (_.pluralize(goal.type.toLowerCase())) + "/" + goal.guid);
    };
    broadcastShortage = function(shortage) {
      $rootScope.expenses = null;
      $rootScope.$broadcast('alert', {
        type: 'danger',
        msg: shortage,
        id: 'shortage'
      });
      return CashfinderService.showModal = true;
    };
    $scope.buildGoalsStack = function() {
      var debtGroup, goalGroup, goalPartition;
      if (!($scope.goals && $scope.goals.length > 0)) {
        return false;
      }
      goalPartition = _.partition($scope.goals, function(goal) {
        return goal.category === 'debt';
      });
      goalGroup = debtGroup = {};
      if (goalPartition[0].length > 0) {
        goalGroup = partitionGoalsByMonth(goalPartition[0], 3);
      }
      if (goalPartition[1].length > 0) {
        debtGroup = partitionGoalsByMonth(goalPartition[1], 3);
      }
      $scope.groupHash = _.extend(goalGroup, debtGroup);
      calculateGoalStackedIndex();
      calculateGoalPositionBasedOnGroup();
      return buildGroups();
    };
    partitionGoalsByMonth = function(goals, groupVariant) {
      var category, groupDate;
      goals = _.sortBy(goals, 'date');
      groupDate = goals[0].date;
      category = goals[0].category;
      _.each(goals, function(goal) {
        if (moment(goal.date).diff(groupDate, 'months') > groupVariant) {
          groupDate = goal.date;
        }
        goal.groupDate = groupDate;
        return goal.groupKey = category + "-" + (moment(groupDate).format('YYYY-MM-DD'));
      });
      return _.groupBy(goals, 'groupKey');
    };
    calculateGoalStackedIndex = function() {
      return _.each($scope.groupHash, function(group) {
        if (group.length === 1) {
          return group[0].stackIndex = 1;
        } else {
          return updateStackIndexWithinGroup(group);
        }
      });
    };
    updateStackIndexWithinGroup = function(group) {
      return _.each(group, function(goal, index) {
        return goal.stackIndex = index + 1;
      });
    };
    calculateGoalPositionBasedOnGroup = function() {
      return _.each($scope.goals, function(goal) {
        return goal.focus = {
          x: $scope.focus.xscale(new Date(goal.groupDate))
        };
      });
    };
    buildGroups = function() {
      $scope.groups = [];
      _.each($scope.groupHash, function(group) {
        if (group.length < 2) {
          return;
        }
        return $scope.groups.push({
          category: group[0].category,
          date: group[0].groupDate,
          goals: group,
          size: group.length,
          tooltipShow: false,
          limit: Math.min(groupDefaultSize, group.length),
          hasMore: group.length > groupDefaultSize,
          showMore: true
        });
      });
      return calculateGroupPosition();
    };
    calculateGroupPosition = function() {
      return _.each($scope.groups, function(group) {
        return group.focus = {
          x: $scope.focus.xscale(new Date(group.date))
        };
      });
    };
    $scope.toggleTooltip = function(group) {
      group.tooltipShow = !group.tooltipShow;
      _.each($scope.groups, function(group) {
        return group.onTop = false;
      });
      return group.onTop = true;
    };
    $scope.showLess = function(group) {
      group.limit = groupDefaultSize;
      return group.showMore = true;
    };
    $scope.showMore = function(group) {
      group.limit = group.size;
      return group.showMore = false;
    };
    $scope.stackIcon = function(goal) {
      var active, goalPos, top;
      goalPos = active = top = '';
      if (goal.stackIndex > 0) {
        goalPos = "point" + goal.stackIndex;
      }
      if (goal.stackIndex === 1) {
        active = 'active-point';
      }
      if (goal.onTop) {
        top = 'on-top';
      }
      return goalPos + " " + active + " " + top;
    };
    $scope.bringGoalForward = function(targetGoal) {
      var group, key;
      key = targetGoal.category + "-" + (moment(targetGoal.groupDate).format('YYYY-MM-DD'));
      group = $scope.groupHash[key];
      _.each(group, function(goal) {
        if (goal.stackIndex < targetGoal.stackIndex) {
          return goal.stackIndex++;
        }
      });
      targetGoal.stackIndex = 1;
      return assignGoalOntop(targetGoal);
    };
    assignGoalOntop = function(targetGoal) {
      _.each($scope.goals, function(goals) {
        return goals.onTop = false;
      });
      return targetGoal.onTop = true;
    };
    renderTimeline = function(timeline) {
      var dates, goals, retirementGoal, setEndX;
      if (timeline.shortage !== "" && timeline.shortage !== 0 && timeline.shortage !== null) {
        broadcastShortage(timeline.shortage);
      }
      dates = _.pluck(timeline.goals, "startOn");
      goals = timeline.goals;
      $scope.goals = _.reject(goals, function(obj) {
        return obj.type === 'Profile';
      });
      retirementGoal = _.find(goals, function(goal) {
        return goal.type === 'retirement';
      });
      fetchIncompleteActionsCount();
      $scope.focus = {};
      $scope.context = {};
      $scope.context.brush = {};
      $scope.focus.startOn = moment(timeline.era[0].start_on).subtract(2, 'years');
      $scope.focus.endOn = moment(retirementGoal.date).add(2, 'years');
      $scope.context.startOn = $scope.focus.startOn;
      $scope.context.endOn = $scope.focus.endOn;
      $scope.startX = gutter;
      $scope.endX = parseInt(angular.element('.timeline-btm').width(), 10) - gutter;
      $scope.context.brush.startOn = $scope.context.startOn;
      $scope.context.brush.endOn = $scope.context.endOn;
      $scope.context.brush.startX = $scope.startX;
      $scope.context.brush.endX = $scope.endX;
      (setEndX = function() {
        var $timeline;
        $timeline = angular.element('.timeline-btm');
        $scope.endX = parseInt($timeline.width(), 10) - gutter;
        return $scope.$$phase || $scope.$apply();
      })();
      $(window).on('resize', setEndX);
      $scope.$watch('focus.xscale', function() {
        return $scope.buildGoalsStack();
      });
      $scope.$watch('context.xscale', function() {
        return $scope.context.brush.endX = $scope.context.xscale($scope.context.brush.endOn.toDate());
      });
      ($scope.focus.newScale = function() {
        return d3.select(".focus-ticks .x-axis").transition().duration(0).call(focusAxis());
      })();
      ($scope.context.newScale = function() {
        return d3.select('.context-ticks .x-axis').transition().duration(0).call(contextAxis());
      })();
      $scope.$watch('focus.startOn + focus.endOn + endX', $scope.focus.newScale);
      $scope.$watch('context.startOn + context.endOn + endX', $scope.context.newScale);
      d3.select('.focus-ticks svg').append('g').attr('transform', 'translate(0, 30)').attr('class', 'x-axis').call(focusAxis());
      return d3.select('.context-ticks svg').append('g').attr('class', 'x-axis').attr('transform', 'translate(0, 0)').attr('class', 'x-axis').call(contextAxis());
    };
    Scenario.goals().$promise.then(function(scenario) {
      return renderTimeline(scenario);
    });
    contextXScale = function() {
      return $scope.context.xscale = d3.time.scale().range([$scope.startX, $scope.endX]).domain([$scope.context.startOn, $scope.context.endOn]);
    };
    focusXScale = function() {
      return $scope.focus.xscale = d3.time.scale().range([$scope.startX, $scope.endX]).domain([$scope.focus.startOn, $scope.focus.endOn]);
    };
    focusAxis = function() {
      return $scope.focusAxis = d3.svg.axis().scale(focusXScale()).orient('top').innerTickSize(10).outerTickSize(0).tickPadding(5);
    };
    contextAxis = function() {
      return $scope.contextAxis = d3.svg.axis().scale(contextXScale()).orient('bottom').innerTickSize(10).outerTickSize(0).tickPadding(5);
    };
    refreshTimeline = function(timeline) {
      var goals;
      goals = timeline.goals;
      $scope.goals = _.reject(goals, function(obj) {
        return obj.type === 'Profile';
      });
      fetchIncompleteActionsCount();
      return $scope.buildGoalsStack();
    };
    $scope.refreshTimeline = function() {
      return Scenario.goals().$promise.then(function(scenario) {
        var timeline;
        timeline = scenario;
        if (timeline.is_dirty) {
          $rootScope.$broadcast('dirty-timeline');
        } else {
          $rootScope.$broadcast('clean-timeline');
        }
        if (timeline.shortage !== "" && timeline.shortage !== 0 && timeline.shortage !== null) {
          broadcastShortage(timeline.shortage);
        }
        return refreshTimeline(timeline);
      });
    };
    $scope.saveGoal = function(goal) {
      $rootScope.$broadcast('clearAlerts');
      $rootScope.loading = true;
      if (goal.original_amount) {
        goal.amount = goal.original_amount;
      }
      return goalService.put(goal).then(function(response) {
        $rootScope.loading = false;
        return $scope.refreshTimeline();
      }, function(response) {
        var msg;
        $rootScope.loading = false;
        $scope.refreshTimeline();
        if (response.data.errors && response.data.errors.transition_on && response.data.errors.transition_on[0]) {
          msg = 'Date ' + response.data.errors.transition_on[0];
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: msg
          });
        } else {
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'Invalid date for goal'
          });
        }
      });
    };
    $scope.saveGoalDate = function (goal) {
      $rootScope.$broadcast('clearAlerts');
      $rootScope.loading = true;
      if (goal.original_amount) {
        goal.amount = goal.original_amount;
      }
      return goalService.updateDate(goal).then(function (response) {
        $rootScope.loading = false;
        return $scope.refreshTimeline();
      }, function (response) {
        var msg;
        $rootScope.loading = false;
        $scope.refreshTimeline();
        if (response.data.errors && response.data.errors.transition_on && response.data.errors.transition_on[0]) {
          msg = 'Date ' + response.data.errors.transition_on[0];
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: msg
          });
        } else {
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'Invalid date for goal'
          });
        }
      });
    };
    $scope.$on('refresh', function(scope, data) {
      return $scope.refreshTimeline();
    });
    $scope.$on('refreshActionsCount', function() {
      return fetchIncompleteActionsCount();
    });
    if ($rootScope.firstTime) {
      $rootScope.firstTime = false;
      return modalInstance = $modal.open({
        templateUrl: 'guidedModalContent',
        controller: 'GuidedScreensCtrl',
        backdrop: "static",
        windowClass: "guided-modal",
        resolve: {
          items: function() {}
        }
      });
    }
  });

  angular.module('timeline').controller('GuidedScreensCtrl', function($scope, $modalInstance, items) {
    return $scope.finishedWizard = function() {
      return $modalInstance.close();
    };
  });

}).call(this);

//# sourceMappingURL=dashboard.js.map
