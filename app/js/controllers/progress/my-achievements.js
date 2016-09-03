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

    MyAchievements.get().$promise.then(function(data) {
      var sections = data.Sections;
      var goalsSection = _.find(sections, function(item) {
        return item.SectionType.toLowerCase() === "goal";
      });

      if (_.isObject(goalsSection)) {
        $scope.goalsSection = {
          name: goalsSection.SectionName,
          items:  _.map(goalsSection.Goals, function(item) {
            return { name: item.name, amount: item.amount, date: item.completed_date, type: item.type };
          })
        };
      }

      var protectionsSection = _.find(sections, function(item) {
        return item.SectionType.toLowerCase() === "debt";
      });

      if (_.isObject(protectionsSection)) {
        $scope.protectionsSection = {
          name: protectionsSection.SectionName,
          items:  _.map(protectionsSection.Goals, function(item) {
            return { name: item.name, amount: item.amount, date: item.completed_date, type: protectionType(item) };
          })
        };
      }

    });
  });
}).call(this);

//# sourceMappingURL=overview.js.map
