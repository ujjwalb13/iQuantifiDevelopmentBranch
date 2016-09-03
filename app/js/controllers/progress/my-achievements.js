(function() {
  'use strict';
  angular.module('progress').controller('MyAchievementsCtrl', function($scope, $location, $routeParams, MyAchievements) {
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
    });
  });
}).call(this);

//# sourceMappingURL=overview.js.map
