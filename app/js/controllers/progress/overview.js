(function() {
  'use strict';
  angular.module('progress').controller('ProgressOverviewCtrl', function($scope, MyProgress, $location, $routeParams) {
    var buildDebtProperties, buildGoalInfo, progress;
    $scope.categoryFilter = {
      "goal": true,
      "debt": true,
      "protection": true
    };
    $scope.noFilter = true;
    $scope.sectionsAttributes = {
      "overview": {
        "text": "Overview",
        "icon": "icon-al-my-progress"
      },
      "goal": {
        "text": "My Goals",
        "icon": "icon-gl-custom-goal"
      },
      "debt": {
        "text": "My Debts",
        "icon": "icon-db-debt"
      },
      "protection": {
        "text": "My Protections",
        "icon": "icon-pt-protection"
      },
      "achievements": {
        "text": "My Achievements",
        "icon": "icon-al-my-archivement"
      }
    };
    $scope.selectedSectionAttributes = $scope.sectionsAttributes["overview"];
    $scope.dropdownActive = false;
    progress = function(amount, total) {
      return Math.round(amount * 100 / total);
    };
    buildGoalInfo = function(item) {
      return {
        guid: item.ItemId,
        name: item.Name,
        kind: item.ItemType.toLowerCase(),
        type: item.ItemType.toLowerCase(),
        amount: item.ProgressAmount,
        total: item.GoalAmount,
        progress: progress(item.ProgressAmount, item.GoalAmount)
      };
    };
    buildDebtProperties = function(item) {
      var obj;
      obj = buildGoalInfo(item);
      obj.type = obj.kind === 'credit_card' ? 'creditcard' : 'loan';
      return obj;
    };
    MyProgress.get().$promise.then(function(data) {
      var debts, debtsSection, goals, goalsSection, protections, protectionsSection, sections;
      sections = data.ProgressSections;
      goalsSection = _.find(sections, function(item) {
        return item.ProgressSectionType.toLowerCase() === "goals";
      });
      debtsSection = _.find(sections, function(item) {
        return item.ProgressSectionType.toLowerCase() === "debts";
      });
      protectionsSection = _.find(sections, function(item) {
        return item.ProgressSectionType.toLowerCase() === "protections";
      });
      goals = _.map(goalsSection.ProgressItems, function(item) {
        return buildGoalInfo(item);
      });
      debts = _.map(debtsSection.ProgressItems, function(item) {
        return buildDebtProperties(item);
      });
      protections = _.map(protectionsSection.ProgressItems, function(item) {
        return buildGoalInfo(item);
      });
      $scope.goals = goals;
      $scope.debts = debts;
      return $scope.protections = protections;
    });
    $scope.filterBy = function(selectedCategory) {
      var categories;
      categories = _.keys($scope.categoryFilter);
      _.each(categories, function(category) {
        if (category === selectedCategory) {
          return $scope.categoryFilter[category] = true;
        } else {
          return $scope.categoryFilter[category] = false;
        }
      });
      $scope.noFilter = false;
      $scope.selectedSectionAttributes = $scope.sectionsAttributes[selectedCategory];
      return $scope.dropdownActive = false;
    };
    $scope.removeFilter = function() {
      var categories;
      categories = _.keys($scope.categoryFilter);
      _.each(categories, function(category) {
        return $scope.categoryFilter[category] = true;
      });
      $scope.noFilter = true;
      $scope.selectedSectionAttributes = $scope.sectionsAttributes["overview"];
      return $scope.dropdownActive = false;
    };
    $scope.addGoal = function() {
      return $location.path("/add-goal");
    };
    $scope.addDebt = function() {
      return $location.path('/add-debts');
    };
    $scope.addProtection = function() {
      return $location.path('/add-protection');
    };
    $scope.gotoSummary = function(goal) {
      if (goal.type == null) {
        return;
      }
      var importantGoals = ["house", "retirement"];
      if (_.contains(importantGoals, goal.type)) {
        return $location.path("/summaries/goals/" + (_.pluralize(goal.type.toLowerCase())) + "/" + goal.guid);
      } else {
        return $location.path("/summaries/" + (_.pluralize(goal.type.toLowerCase())) + "/" + goal.guid);
      }
    };
    $scope.isGoalSectionActive = function() {
      return !$scope.noFilter && $scope.categoryFilter['goal'];
    };
    $scope.isDebtSectionActive = function() {
      return !$scope.noFilter && $scope.categoryFilter['debt'];
    };
    $scope.isProtectionActive = function() {
      return !$scope.noFilter && $scope.categoryFilter['protection'];
    };
    $scope.gotoAchievementsPage = function() {
      return $location.path("/achievements");
    };
    $scope.gotoProtectionSummary = function(protection) {
      var path;
      if (protection.type === 'lifepolicy') {
        path = '/summaries/policies/life';
      } else if (protection.type === 'carepolicy') {
        path = '/summaries/policies/care';
      } else if (protection.type === 'disabilitypolicy') {
        path = '/summaries/policies/disability';
      }
      if (protection.type === "cr1" || protection.type === "cr3" || protection.type === "cr6") {
        path = "/summaries/reserves/" + protection.guid;
      }
      return $location.path(path);
    };
    $scope.toogleDropdown = function() {
      return $scope.dropdownActive = !$scope.dropdownActive;
    };
    if ($routeParams.type) {
      return $scope.filterBy($routeParams.type);
    }
  });

}).call(this);

//# sourceMappingURL=overview.js.map
