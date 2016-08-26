(function() {
  'use strict';
  angular.module('onboard').controller('onboardManualIncomeCtrl', function($scope, $rootScope, $location, $q, $timeout, matchmedia, Income, onboardService, Person, welcomeTextService) {
    var completeSetup, prepareIncomes;
    $rootScope.step = 2;
    $scope.submitted = false;
    $rootScope.savable = true;
    $scope.people = [];
    $scope.incomes = [];
    $scope.otherIncomes = [];
    $scope.isAnyOtherIncome = false;
    $scope.currentStep = 4;
    $scope.welcome = welcomeTextService.income();
    $scope.people = Person.query();
    $scope.owners = $scope.people;
    $q.all([Person.query().$promise, Income.query().$promise]).then(function(data) {
      var i, len, person, ref, results;
      $scope.people = data[0];
      $scope.incomes = data[1];
      if (!$scope.incomes.length) {
        ref = $scope.people;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          person = ref[i];
          if (person.relationship === 'spouse' || person.relationship === 'primary') {
            results.push($scope.incomes.push(new Income({
              person: person,
              amount: '',
              period: 'annual'
            })));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    });
    $scope.addNewIncome = function(form) {
      $scope.isAnyOtherIncome = true;
      return $scope.otherIncomes.push(new Income({
        period: 'annual',
        amount: ''
      }));
    };
    $scope.resetNewIncomes = function(form) {
      $scope.isAnyOtherIncome = true;
      return $scope.otherIncomes = [];
    };
    $scope.processForm = function(form) {
      var calls, incomes, otherIncomes;
      $scope.submitted = true;
      if (form.$valid) {
        $scope.pending = true;
        incomes = prepareIncomes($scope.incomes);
        calls = [];
        angular.forEach(incomes, function(income) {
          return calls.push(income.$save().then(function() {}, function(response) {
            income.errors = response.data.errors;
            return $q.reject('');
          }));
        });
        if ($scope.isAnyOtherIncome) {
          otherIncomes = prepareIncomes($scope.otherIncomes);
          angular.forEach(otherIncomes, function(income) {
            return calls.push(income.$save().then(function() {}, function(response) {
              income.errors = response.data.errors;
              return $q.reject('');
            }));
          });
        }
        return $q.all(calls).then(function() {
          return $timeout(function() {
            return onboardService.is_complete().then(function(data) {
              return completeSetup();
            }, function(data) {
              if (!data.accounts) {
                return $location.path('/onboard/accounts');
              }
              if (!data.income) {
                return $location.path('/onboard/manual-income');
              }
              if (!data.expenses) {
                return $location.path('/onboard/manual-expenses');
              }
            });
          }, 100);
        }, function(response) {})["finally"](function() {
          return $scope.pending = false;
        });
      }
    };
    completeSetup = function() {
      $rootScope.firstTime = true;
      return onboardService.finish().then(function(data) {
        var d, i, len, results;
        $rootScope.$broadcast('refresh');
        if (("" + data).trim() === "") {
          $rootScope.currentUser.is_setup_complete = true;
          if (matchmedia.isPhone()) {
            return $location.path('/onboard/goals');
          } else {
            return $location.path('/');
          }
        } else {
          $scope.errors = [];
          results = [];
          for (i = 0, len = data.length; i < len; i++) {
            d = data[i];
            results.push($scope.errors.push(d[0] + ": " + d[1]));
          }
          return results;
        }
      });
    };
    prepareIncomes = function(incomes) {
      var i, income, len;
      for (i = 0, len = incomes.length; i < len; i++) {
        income = incomes[i];
        income.person_guid = income.person.guid;
      }
      return incomes;
    };
    return $scope.deleteExtraIncome = function(income) {
      var index;
      index = $scope.otherIncomes.indexOf(income);
      if (index !== -1) {
        return $scope.otherIncomes.splice(index, 1);
      }
    };
  });

}).call(this);

//# sourceMappingURL=manual_income_controller.js.map
