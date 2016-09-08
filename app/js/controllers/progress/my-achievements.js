(function() {
  'use strict';
  angular.module('progress').controller('MyAchievementsCtrl', function($scope, $location, $routeParams, MyAchievements) {

    var protectionType = function(protection){
      var type = protection.type.toLowerCase();
      if (type === "reserve") {
        return protection.kind.toLowerCase();
      }
      return type;
    };

    var buildGoalInfo = function(item) {
      return {
        name: item.name,
        amount: item.amount,
        date: item.completed_date,
        type: item.type,
        guid: item.guid
      }
    }

    var buildDebtInfo = function(item) {
      return _.extend(buildGoalInfo(item), { type: item.kind });
    }

    var buildProtectionInfo = function(item) {
      return _.extend(buildGoalInfo(item), { type: protectionType(item) });
    }

    MyAchievements.get().$promise.then(function(data) {
      var sections = data.Sections;
      var goalsSection = _.find(sections, function(item) {
        return item.SectionType.toLowerCase() === "goal";
      });

      if (_.isObject(goalsSection)) {
        $scope.goalsSection = {
          name: goalsSection.SectionName,
          items:  _.map(goalsSection.Goals, function(item) {
            return buildGoalInfo(item);
          })
        };
      }

      var debtsSection = _.find(sections, function(item) {
        return item.SectionType.toLowerCase() === "debt";
      });

      if (_.isObject(debtsSection)) {
        $scope.debtsSection = {
          name: debtsSection.SectionName,
          items:  _.map(debtsSection.Goals, function(item) {
            return buildDebtInfo(item);
          })
        };
      }

      var protectionsSection = _.find(sections, function(item) {
        return item.SectionType.toLowerCase() === "protection";
      });

      if (_.isObject(protectionsSection)) {
        $scope.protectionsSection = {
          name: protectionsSection.SectionName,
          items:  _.map(protectionsSection.Goals, function(item) {
            return buildProtectionInfo(item);
          })
        };
      }

    });

    $scope.openCompletedActions = function(item) {
      console.log("openCompletedActions", item);
    }

  });
}).call(this);

//# sourceMappingURL=overview.js.map
