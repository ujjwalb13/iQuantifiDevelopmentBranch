(function() {
  'use strict';
  angular.module('onboard').controller('onboardFamilyCtrl', function($scope, $rootScope, $location, $q, matchmedia, Person) {
    var j, k, populateFamily, preparePerson, ref, results, results1, unregister;
    $rootScope.step = 2;
    $scope.children = [];
    $scope.primary = {};
    $scope.spouse = {};
    $scope.currentStep = 1;
    $scope.welcome = {
      header: "Welcome!",
      answer: " Good financial planning includes the entire household, which means all dependents. Looking at the whole picture ensures that you and the ones you love are protected."
    };
    unregister = matchmedia.onPhone(function(mediaQueryList) {
      $scope.isPhone = mediaQueryList.matches;
    });
    Person.query().$promise.then(function(response) {
      return populateFamily(response);
    });
    populateFamily = function(data) {
      $scope.primary = _.findWhere(data, {
        relationship: 'primary'
      });
      $scope.hasSpouse = false;
      $scope.spouse = _.findWhere(data, {
        relationship: 'spouse'
      });
      if ($scope.spouse) {
        $scope.hasSpouse = true;
      }
      $scope.hasChild = false;
      $scope.children = _.where(data, {
        relationship: 'child'
      });
      if ($scope.children.length) {
        $scope.hasChild = true;
        return $scope.totalChildren = $scope.children.length;
      }
    };
    $scope.$watch('hasChild', function(newValue, oldValue) {
      if (newValue && $scope.children.length === 0) {
        return $scope.addChild();
      }
    });
    $scope.$watch('hasSpouse', function(newValue, oldValue) {
      if (newValue && !$scope.spouse) {
        return $scope.spouse = new Person({
          last_name: $scope.primary.last_name
        });
      }
    });
    $scope.addChild = function() {
      return $scope.children.push(new Person({
        last_name: $scope.primary.last_name
      }));
    };
    $scope.deleteChild = function(index, id) {
      var i, j, results;
      if (id) {
        Person["delete"]({
          id: id
        }).$promise.then(function(response) {
          return $scope.children.splice(index, 1);
        });
      } else {
        $scope.children.splice(index, 1);
      }
      i = $scope.children.length;
      return $scope.childrenRange = (function() {
        results = [];
        for (var j = i; i <= 10 ? j <= 10 : j >= 10; i <= 10 ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this);
    };
    $scope.processForm = function(form) {
      var calls, child, j, len, ref, people;
      $scope.submitted = true;
      if (form.$valid) {
        $scope.pending = true;
        calls = [];
        people = [];
        
        //Primary
        preparePerson($scope.primary, 'primary');
        $scope.primary.state = "TN"; //TODO: Calc at server
        people.push($scope.primary);

        //Spouse
        if ($scope.hasSpouse)
        {
            preparePerson($scope.spouse, 'spouse');
            people.push($scope.spouse);
        }

        //Child
        if ($scope.hasChild)
        {
            ref = $scope.children;
            for (j = 0, len = ref.length; j < len; j++) {
                child = ref[j];
                preparePerson(child, 'child');
            }
            people = people.concat($scope.children);
        }

        //Update List   
          Person.updateList(people).$promise.then(
          function () {
              return $location.path('/onboard/experience');
          },
          function (response) {
              child.errors = response.data.errors;
              return $q.reject('');
          }
          )["finally"](
        function () {
            return $scope.pending = false;
        });

      }
    };
    preparePerson = function(person, relationship) {
      if (!$scope.isPhone) {
        person.dob = person.year + "-" + (person.month + 1) + "-1";
      }
      return person.relationship = relationship;
    };
    $scope.days = (function() {
      results = [];
      for (j = 1; j <= 31; j++){ results.push(j); }
      return results;
    }).apply(this);
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return $scope.years = (function() {
      results1 = [];
      for (var k = ref = moment().year(); ref <= 1900 ? k <= 1900 : k >= 1900; ref <= 1900 ? k++ : k--){ results1.push(k); }
      return results1;
    }).apply(this);
  });

}).call(this);

//# sourceMappingURL=family_controller.js.map
