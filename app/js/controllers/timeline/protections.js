(function() {
  'use strict';
  angular.module('timeline').controller('ProtectionsCtrl', function($scope, $rootScope, Scenario, Person, utilService) {
    return Scenario.protections().$promise.then(function(scenario) {
      var j, len, p, protections, results, types;
      protections = scenario.goals;
      types = _.uniq(_.pluck(protections, 'type'));
      _.each(types, function(type, i) {
        return types[i] = _.trim(_.dasherize(type), '-');
      });
      $scope.has = {
        death: _.contains(types, 'life-policy'),
        disability: _.contains(types, 'disability-policy'),
        health: _.contains(types, 'long-term-care-policy'),
        reserve: _.contains(types, 'reserve'),
        care: _.contains(types, 'care-policy'),
        dependents: scenario.dependents
      };
      $scope.achieved = {
        death: $scope.has.death ? 'achieved' : 'unachieved',
        disability: $scope.has.disability ? 'achieved' : 'unachieved',
        health: $scope.has.health ? 'achieved' : 'unachieved',
        reserve: $scope.has.reserve ? 'achieved' : 'unachieved',
        care: $scope.has.care ? 'achieved' : 'unachieved'
      };
      $scope.lifeAlert = function() {
        if ($scope.has.dependents && !$scope.has.death) {
          return true;
        } else {
          return false;
        }
      };
      $scope.showLTC = false;
      $scope.person = {};
      Person.query().$promise.then(function(response) {
        $scope.person.primary = _.findWhere(response, {
          relationship: 'primary'
        });
        $scope.person.spouse = _.findWhere(response, {
          relationship: 'spouse'
        });
        if ($scope.person.primary && utilService.getAge($scope.person.primary.dob) >= 50) {
          $scope.showLTC = true;
        }
        if ($scope.person.spouse && utilService.getAge($scope.person.spouse.dob) >= 50) {
          return $scope.showLTC = true;
        }
      });
      $scope.careAlert = function() {
        if (scenario.warn_care) {
          return true;
        } else {
          return false;
        }
      };
      results = [];
      for (j = 0, len = protections.length; j < len; j++) {
        p = protections[j];
        if (p.type === 'Reserve') {
          if (p.kind === '6CR' && p.balance <= p.amount) {
            results.push($rootScope.currentCR = p);
          } else if (p.kind === '3CR' && p.balance < p.amount) {
            results.push($rootScope.currentCR = p);
          } else if (p.kind === '1CR' && p.balance < p.amount) {
            results.push($rootScope.currentCR = p);
          } else {
            results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
  });

}).call(this);

//# sourceMappingURL=protections.js.map
