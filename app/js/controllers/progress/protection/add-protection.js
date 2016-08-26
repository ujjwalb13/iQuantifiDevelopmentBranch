(function() {
  'use strict';
  angular.module('agera').controller('AddProtectionCtrl', function($scope, Person, utilService, $location) {
    $scope.types = ['life', 'disability', 'care'];
    $scope.show = false;
    $scope.showLTC = function(type) {
      var result;
      result = '';
      if (type === 'care') {
        result = $scope.show;
      } else {
        result = true;
      }
      return result;
    };
    $scope.person = {};
    Person.query().$promise.then(function(response) {
      $scope.person.primary = _.findWhere(response, {
        relationship: 'primary'
      });
      $scope.person.spouse = _.findWhere(response, {
        relationship: 'spouse'
      });
      if ($scope.person.primary && utilService.getAge($scope.person.primary.dob) >= 50) {
        $scope.show = true;
      }
      if ($scope.person.spouse && utilService.getAge($scope.person.spouse.dob) >= 50) {
        return $scope.show = true;
      }
    });
    return $scope.addNewProtection = function(type) {
      return $location.path("/policies/" + type + "/new");
    };
  });

}).call(this);

//# sourceMappingURL=add-protection.js.map
