(function() {
  'use strict';
  angular.module('agera').controller('PermissionsCtrl', function($scope, $rootScope, $location, Person) {
    Person.query().$promise.then(function(people) {
      _.each(people, function(person) {
        return person.permission_status = person.relationship === "primary" ? 'full_access' : 'no_access';
      });
      $scope.people = people;
      $scope.selectPerson(people[0]);
      return console.log(people);
    });
    return $scope.selectPerson = function(person) {
      return $scope.selectedPerson = person;
    };
  });

  angular.module('agera').controller('PermissionsFormCtrl', function($scope, $rootScope, Person) {
    $scope.statusOptions = [
      {
        value: "no_access",
        display: "No Access",
        explaination: "@@name@@ CANNOT view, edit or update the information."
      }, {
        value: "read_only",
        display: "Read Only",
        explaination: "@@name@@ can only view the information."
      }, {
        value: "full_access",
        display: "Full Access",
        explaination: "@@name@@ can view, edit or update the information."
      }
    ];
    $scope.$watch('selectedPerson', function(newValue) {
      if (!newValue) {
        return;
      }
      $scope.person = newValue;
      $scope.person.is_removed = false;
      return $scope.getStatusExplaination();
    });
    $scope.submit = function(isValid) {};
    return $scope.getStatusExplaination = function() {
      var explaination, status;
      status = _.find($scope.statusOptions, function(item) {
        return item.value === $scope.person.permission_status;
      });
      explaination = status.explaination;
      $scope.permission = status.display + ':';
      return $scope.statusExplaination = status.explaination.replace('@@name@@', $scope.person.first_name);
    };
  });

}).call(this);

//# sourceMappingURL=permissions.js.map
