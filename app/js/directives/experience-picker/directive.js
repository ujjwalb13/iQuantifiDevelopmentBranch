(function() {
  'use strict';
  angular.module('experience-picker').directive('experiencePicker', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        experience: '=ngModel',
        expName: '@',
        expNameSm: '@'
      },
      controller: [
        '$scope', function($scope) {
          var experiences;
          $scope.experiences = experiences = [
            {
              year: 0,
              selected: true,
              classes: 'col-sm-2 col-xs-2'
            }, {
              year: 1,
              selected: false,
              classes: 'col-sm-2 col-xs-3'
            }, {
              year: 2,
              selected: false,
              classes: 'col-sm-2 col-xs-3'
            }, {
              year: 3,
              selected: false,
              classes: 'col-sm-2'
            }
          ];
          $scope.$watch('experience', function(newValue, oldValue) {
            if (newValue === oldValue) {
              return;
            }
            return angular.forEach(experiences, function(exp) {
              return exp.selected = exp.year === newValue;
            });
          });
          return $scope.getExperience = function(selectedExp) {
            selectedExp.selected = true;
            angular.forEach(experiences, function(exp) {
              if (exp !== selectedExp) {
                return exp.selected = false;
              }
            });
            return $scope.experience = selectedExp.year;
          };
        }
      ],
      templateUrl: '/views/onboard/experience-picker/template.html'
    };
  });

}).call(this);

//# sourceMappingURL=directive.js.map
