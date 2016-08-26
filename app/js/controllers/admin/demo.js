(function() {
  'use strict';
  angular.module('admin').controller('DemoCtrl', function($scope, $rootScope, $location, Demo, Organization) {
    $scope.demo = new Demo({
      onboard: true,
      goals: false,
      debts: false,
      organization_id: 1
    });
    $scope.organizations = Organization.query();
    Demo.last().$promise.then(function(lastDemo) {
      if ((lastDemo != null) && (lastDemo.email != null)) {
        return $scope.demo.name = "demo" + (parseInt(lastDemo.email.match(/\d+/), 10) + 1);
      }
    });
    $scope.$watch('demo.onboard', function(value) {
      if (value) {
        $scope.demo.goals = false;
        return $scope.demo.debts = false;
      }
    });
    return $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        return $scope.demo.$save().then(function(result) {
          $scope.processing = false;
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The demo account was created successfully.'
          });
          $rootScope.$broadcast('refresh');
          return $location.path('/admin');
        }, function(err) {
          $scope.processing = false;
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error creating the demo account.'
          });
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=demo.js.map
