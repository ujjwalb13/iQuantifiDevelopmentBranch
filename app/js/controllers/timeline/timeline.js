(function() {
  'use strict';
  angular.module('timeline').controller('TimelineCtrl', function($scope, $modal, $filter, $rootScope, $location, $timeout, $cacheFactory, goalService, Action, Scenario, CashfinderService, ENV) {
    var broadcastShortage, fetchIncompleteActionsCount, modalInstance, renderTimeline;
    $rootScope.onTimeline = true;
    $scope.demo = $rootScope.demo;
    fetchIncompleteActionsCount = function() {
      return Action.count().$promise.then(function(response) {
        return $scope.incompleteActionsCount = response.count;
      });
    };
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
    $scope.tooltipShow = function(tooltip, element_id) {
      tooltip = !tooltip;
      if (tooltip) {
        if (!angular.element('#' + element_id).data('collision')) {
          $timeout(function() {
            return $rootScope.$broadcast('tooltipCollision', {
              id: element_id
            }, 1000);
          });
        }
      }
      return tooltip;
    };
    $rootScope.$on('tooltipCollision', function(scope, object) {
      var $element, left, newLeft, offset, windowWidth;
      $element = angular.element('#' + object.id + ' .tooltip');
      offset = $element.offset();
      if (offset.left < 0) {
        left = parseInt($element.css('left'));
        $element.css('left', left + Math.abs(offset.left) + 'px');
      }
      windowWidth = angular.element(window).width();
      if (offset.left + $element.width() > windowWidth) {
        newLeft = ($element.width() / 2 + 20) * -1;
        return $element.css('left', newLeft + 'px');
      }
    });
    $scope.open = function(type, action, category, obj) {
      return goalService.get(obj).then(function(goal) {
        var hyphenateType;
        obj = _.extend(obj, goal);
        $scope.items = [];
        hyphenateType = _.trim(_.dasherize(type), '-');
        if (category === 'retirement') {
          category = 'goal';
        }
        $scope.items.push(hyphenateType, action, category, obj);
        return $modal.open({
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
    renderTimeline = function(timeline) {
      var dates, goal, goals, i, len, setEndX;
      if (timeline.shortage !== 0 && timeline.shortage !== null) {
        broadcastShortage(timeline.shortage);
      }
      dates = _.pluck(timeline.goals, "startOn");
      goals = timeline.goals;
      for (i = 0, len = goals.length; i < len; i++) {
        goal = goals[i];
        goal.focus = {};
        goal.context = {};
      }
      $scope.goals = _.reject(goals, function(obj) {
        return obj.type === 'Profile';
      });
      fetchIncompleteActionsCount();
      $scope.focus = {};
      $scope.context = {};
      $scope.context.brush = {};
      $scope.focus.startOn = moment(timeline.era[0].start_on).subtract(2, 'years');
      $scope.focus.endOn = moment(timeline.era[0].end_on).add(5, 'years');
      $scope.context.startOn = $scope.focus.startOn;
      $scope.context.endOn = $scope.focus.endOn;
      $scope.startX = 0;
      $scope.endX = 0;
      $scope.context.brush.startOn = $scope.context.startOn;
      $scope.context.brush.endOn = $scope.context.endOn;
      $scope.context.brush.startX = $scope.startX;
      $scope.context.brush.endX = parseInt(angular.element('.timeline').width(), 10);
      (setEndX = function() {
        var $timeline;
        $timeline = angular.element('.timeline');
        $scope.endX = parseInt($timeline.width(), 10);
        return $scope.$$phase || $scope.$apply();
      })();
      $(window).on('resize', setEndX);
      $scope.$watch('focus.xscale', function() {
        var j, len1, ref, results;
        ref = $scope.goals;
        results = [];
        for (j = 0, len1 = ref.length; j < len1; j++) {
          goal = ref[j];
          results.push(goal.focus.x = $scope.focus.xscale(new Date(goal.date)));
        }
        return results;
      });
      $scope.$watch('context.xscale', function() {
        var j, len1, ref;
        ref = $scope.goals;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          goal = ref[j];
          goal.context.x = $scope.context.xscale(new Date(goal.date));
        }
        return $scope.context.brush.endX = $scope.context.xscale($scope.context.brush.endOn.toDate());
      });
      ($scope.focus.newScale = function() {
        $scope.focus.xscale = d3.time.scale().range([$scope.startX, $scope.endX]).domain([$scope.focus.startOn, $scope.focus.endOn]);
        $scope.focusAxis = d3.svg.axis().scale($scope.focus.xscale).orient('top').innerTickSize(50).outerTickSize(30).tickPadding(5);
        return d3.select(".timeline-focus .x-axis").transition().duration(0).call($scope.focusAxis);
      })();
      ($scope.context.newScale = function() {
        $scope.context.xscale = d3.time.scale().range([$scope.startX, $scope.endX]).domain([$scope.context.startOn, $scope.context.endOn]);
        $scope.contextAxis = d3.svg.axis().scale($scope.context.xscale).orient('bottom').innerTickSize(20).outerTickSize(0).tickPadding(5);
        return d3.select('.timeline-context .x-axis').transition().duration(0).call($scope.contextAxis);
      })();
      $scope.$watch('focus.startOn + focus.endOn + endX', $scope.focus.newScale);
      $scope.$watch('context.startOn + context.endOn + endX', $scope.context.newScale);
      $scope.focusAxis = d3.svg.axis().scale($scope.focus.xscale).orient('top').innerTickSize(40).outerTickSize(30).tickPadding(10);
      $scope.contextAxis = d3.svg.axis().scale($scope.context.xscale).orient('bottom').innerTickSize(40).outerTickSize(30).tickPadding(10);
      d3.select('.timeline-focus svg').append('g').attr('transform', 'translate(0, 100)').attr('class', 'x-axis').call($scope.focusAxis);
      return d3.select('.timeline-context svg').append('g').attr('class', 'x-axis').attr('transform', 'translate(0, 35)').attr('class', 'x-axis').call($scope.contextAxis);
    };
    Scenario.goals().$promise.then(function(scenario) {
      return renderTimeline(scenario);
    });
    $scope.refreshTimeline = function() {
      return Scenario.goals().$promise.then(function(scenario) {
        var goal, i, len, ref, timeline;
        timeline = scenario;
        if (timeline.is_dirty) {
          $rootScope.$broadcast('dirty-timeline');
        } else {
          $rootScope.$broadcast('clean-timeline');
        }
        if (timeline.shortage !== 0 && timeline.shortage !== null) {
          broadcastShortage(timeline.shortage);
        }
        ref = timeline.goals;
        for (i = 0, len = ref.length; i < len; i++) {
          goal = ref[i];
          goal.focus = {};
          goal.context = {};
        }
        $scope.goals = timeline.goals;
        return fetchIncompleteActionsCount();
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
    $scope.openModal = function(type, action, category, obj) {
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

//# sourceMappingURL=timeline.js.map
