(function() {
  'use strict';
  angular.module('agera').controller('ExperienceCtrl', function($scope, $rootScope, $location, Experience, onboarding) {
    $rootScope.step = 3;
    $scope.experience = {};
    $scope.currentStep = 2;
    $scope.experience = Experience.get();
    $scope.processForm = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        $scope.pending = true;
        return Experience.create($scope.experience).$promise.then(function() {
          if (onboarding) {
            return $location.path('/onboard/accounts/link-or-manual');
          }
        }, function(response) {
          return data.errors = response.errors;
        })["finally"](function() {
          return $scope.pending = false;
        });
      }
    };
    if (onboarding) {
      return $scope.welcome = {
        header: "Tell us about...",
        answer: "Since we are providing comprehensive advice to you, including recommendations on where you can invest your money, we are required by the SEC to gather this information from you."
      };
    }
  });

}).call(this);

//# sourceMappingURL=experience.js.map
