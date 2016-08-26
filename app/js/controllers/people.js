(function() {
  'use strict';
  angular.module('agera').controller('PeopleCtrl', function($scope, $rootScope, $location, Person) {
    $scope.people = Person.query();
    return $scope.goToPersonEdit = function(guid) {
      return $location.path("/people/" + guid);
    };
  });

  angular.module('agera').controller('PersonFormCtrl', function($q, $modal, $scope, $routeParams, $rootScope, $location, matchmedia, Person) {
    var ModalInstanceCtrl, filterSpouseRelationship, i, j, ref, results, results1, unregister;
    $scope.relationshipOptions = ['primary', 'spouse', 'child'];
    unregister = matchmedia.onPhone(function(mediaQueryList) {
      $scope.isPhone = mediaQueryList.matches;
    });
    filterSpouseRelationship = function(people, currentPerson) {
      var spouse;
      if (currentPerson && currentPerson.relationship === 'primary') {
        return;
      }
      if (currentPerson && currentPerson.relationship === 'spouse') {
        return;
      }
      spouse = _.find(people, function(person) {
        return person.relationship === 'spouse';
      });
      if (spouse) {
        return $scope.relationshipOptions = _.reject($scope.relationshipOptions, function(item) {
          return item === 'spouse';
        });
      }
    };
    if ($routeParams.personId) {
      $q.all([
        Person.get({
          guid: $routeParams.personId
        }).$promise, Person.query().$promise
      ]).then(function(data) {
        var people;
        $scope.person = data[0];
        people = data[1];
        return filterSpouseRelationship(people, $scope.person);
      });
      $scope.editMode = true;
    } else {
      $scope.person = new Person();
      Person.query().$promise.then(function(people) {
        return filterSpouseRelationship(people, $scope.person);
      });
    }
    $scope.gotoPeople = function() {
      return $location.path('/people');
    };
    $scope.submit = function(isValid) {
      var base;
      (base = $scope.person).day || (base.day = 1);
      if (!$scope.isPhone) {
        $scope.person.dob = $scope.person.year + "-" + ($scope.person.month + 1) + "-" + $scope.person.day;
      }
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        return $scope.person.$save().then(function(result) {
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The person was saved successfully.'
          });
          return $location.path('/people');
        }, function(err) {
          $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error saving the person.'
          });
          return $scope.errors = err.data.errors;
        })["finally"](function() {
          return $scope.processing = false;
        });
      }
    };
    $scope.openDeleteModal = function(person) {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'deletePersonModal',
        controller: ModalInstanceCtrl,
        resolve: {
          person: function() {
            return person;
          }
        }
      });
    };
    ModalInstanceCtrl = [
      '$location', '$scope', '$modalInstance', 'person', function($location, $scope, $modalInstance, person) {
        $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
        $scope.person = person;
        $scope.primary = person.relationship === 'primary';
        return $scope.deletePerson = function() {
          $scope.processing = true;
          return person.$delete().then(function(result) {
            $modalInstance.close(person);
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: 'The person was deleted successfully.'
            });
            return $location.path('/people');
          }, function(err) {
            $modalInstance.dismiss('cancel');
            return $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: 'There was an error deleting the person.'
            });
          })["finally"](function() {
            return $scope.processing = false;
          });
        };
      }
    ];
    $scope.days = (function() {
      results = [];
      for (i = 1; i <= 31; i++){ results.push(i); }
      return results;
    }).apply(this);
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return $scope.years = (function() {
      results1 = [];
      for (var j = ref = moment().year(); ref <= 1900 ? j <= 1900 : j >= 1900; ref <= 1900 ? j++ : j--){ results1.push(j); }
      return results1;
    }).apply(this);
  });

}).call(this);

//# sourceMappingURL=people.js.map
