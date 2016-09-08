(function() {
  'use strict';
  angular.module('agera').controller('PoliciesCtrl', function($scope, $rootScope, $location, PolicyLife, Person, PolicyDisability, PolicyCare, $q, $routeParams) {
    var i, ref, results;
    $scope.lifePolicies = PolicyLife.query();
    $scope.disabilityPolicies = PolicyDisability.query();
    $scope.carePolicies = PolicyCare.query();
    $scope.editLife = function(guid) {
      return $location.path("/policies/life/" + guid);
    };
    $scope.editDisability = function(guid) {
      return $location.path("/policies/disability/" + guid);
    };
    $scope.editCare = function(guid) {
      return $location.path("/policies/care/" + guid);
    };
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return $scope.years = (function() {
      results = [];
      for (var i = ref = moment().year(); ref <= 1900 ? i <= 1900 : i >= 1900; ref <= 1900 ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
  });

  angular.module('agera').controller('LifePolicyFormCtrl', function($modal, $scope, $rootScope, $routeParams, $location, $q, Person, PolicyLife) {
    var ModalInstanceCtrl, i, ref, results;
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.years = (function() {
      results = [];
      for (var i = ref = moment().year(); ref <= 1900 ? i <= 1900 : i >= 1900; ref <= 1900 ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
    $scope.editMode = $routeParams.policyId ? true : false;
    if ($routeParams.policyId) {
      $q.all([
        PolicyLife.get({
          guid: $routeParams.policyId
        }).$promise, Person.query().$promise
      ]).then(function(data) {
        $scope.lifePolicy = data[0];
        $scope.people = data[1];
        $scope.lifePolicy.day = 1;
        $scope.lifePolicy.month = moment($scope.lifePolicy.start_on).month();
        return $scope.lifePolicy.year = moment($scope.lifePolicy.start_on).year();
      });
    } else {
      $scope.lifePolicy = new PolicyLife();
      $scope.people = Person.query();
    }
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.pending = true;
        $scope.lifePolicy.person_guid = $scope.lifePolicy.person.guid;
        if (!$scope.isPhone) {
          $scope.lifePolicy.start_on = $scope.lifePolicy.year + "-" + ($scope.lifePolicy.month + 1) + "-" + $scope.lifePolicy.day;
        }
        return $scope.lifePolicy.$save().then(function(result) {
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The policy was saved successfully.'
          });
          $rootScope.$broadcast('refresh');
          return $location.path('summaries/policies/life');
        }, function(err) {
          $scope.pending = false;
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error saving the policy.'
          });
        });
      }
    };
    $scope.openDeleteModal = function(policy) {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'deletePolicyModal',
        controller: ModalInstanceCtrl,
        resolve: {
          policy: function() {
            return policy;
          }
        }
      });
    };
    $scope.cancel = function() {
      return $location.path('/progress');
    };
    return ModalInstanceCtrl = [
      '$scope', '$modalInstance', '$location', 'policy', function($scope, $modalInstance, $location, policy) {
        $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
        return $scope.deletePolicy = function() {
          $scope.pending = true;
          return policy.$delete().then(function(result) {
            $scope.pending = false;
            $modalInstance.close(policy);
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: 'The policy was deleted successfully.'
            });
            return $location.path('/policies');
          }, function(err) {
            $scope.pending = false;
            $modalInstance.dismiss('cancel');
            return $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: 'There was an error deleting the policy.'
            });
          });
        };
      }
    ];
  });

  angular.module('agera').controller('DisabilityPolicyFormCtrl', function($modal, $scope, $rootScope, $routeParams, $q, $location, Person, PolicyDisability) {
    var ModalInstanceCtrl, i, ref, results;
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.years = (function() {
      results = [];
      for (var i = ref = moment().year(); ref <= 1900 ? i <= 1900 : i >= 1900; ref <= 1900 ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
    $scope.editMode = $routeParams.policyId ? true : false;
    if ($routeParams.policyId) {
      $q.all([
        PolicyDisability.get({
          guid: $routeParams.policyId
        }).$promise, Person.query().$promise
      ]).then(function(data) {
        $scope.disabilityPolicy = data[0];
        $scope.people = data[1];
        $scope.disabilityPolicy.day = 1;
        $scope.disabilityPolicy.month = moment($scope.disabilityPolicy.start_on).month();
        return $scope.disabilityPolicy.year = moment($scope.disabilityPolicy.start_on).year();
      });
    } else {
      $scope.disabilityPolicy = new PolicyDisability();
      $scope.people = Person.query();
    }
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.pending = true;
        $scope.disabilityPolicy.person_guid = $scope.disabilityPolicy.person.guid;
        if (!$scope.isPhone) {
          $scope.disabilityPolicy.start_on = $scope.disabilityPolicy.year + "-" + ($scope.disabilityPolicy.month + 1) + "-" + $scope.disabilityPolicy.day;
        }
        return $scope.disabilityPolicy.$save().then(function(result) {
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The policy was created successfully.'
          });
          $rootScope.$broadcast('refresh');
          return $location.path('summaries/policies/disability');
        }, function(err) {
          $scope.pending = false;
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error creating the policy.'
          });
        });
      }
    };
    $scope.openDeleteModal = function(policy) {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'deletePolicyModal',
        controller: ModalInstanceCtrl,
        resolve: {
          policy: function() {
            return policy;
          }
        }
      });
    };
    $scope.cancel = function() {
      return $location.path('/progress');
    };
    return ModalInstanceCtrl = [
      '$scope', '$modalInstance', '$location', 'policy', function($scope, $modalInstance, $location, policy) {
        $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
        return $scope.deletePolicy = function() {
          $scope.pending = true;
          return policy.$delete().then(function(result) {
            $scope.pending = false;
            $modalInstance.close(policy);
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: 'The policy was deleted successfully.'
            });
            return $location.path('/policies');
          }, function(err) {
            $scope.pending = false;
            $modalInstance.dismiss('cancel');
            return $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: 'There was an error deleting the policy.'
            });
          });
        };
      }
    ];
  });

  angular.module('agera').controller('CarePolicyFormCtrl', function($modal, $scope, $rootScope, $routeParams, $q, $location, Person, PolicyCare) {
    var ModalInstanceCtrl, i, ref, results;
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.years = (function() {
      results = [];
      for (var i = ref = moment().year(); ref <= 1900 ? i <= 1900 : i >= 1900; ref <= 1900 ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
    $scope.cancel = function() {
      return $location.path('/progress');
    };
    $scope.paymentPeriods = ['Weekly', 'Twice a month', 'Monthly', 'Semi-annually', 'Annually'];
    $scope.benefitAmountPeriods = ['Daily', 'Monthly'];
    $scope.stayAtHomeBenefit = [0, 50, 100];
    $scope.eliminationPeriod = [0, 20, 30, 60, 90, 100, 180, 365, 'Other'];
    $scope.waitingPeriod = [10, 30, 90, 100, 180, 'Other'];
    $scope.benefitIncrease = ['None', '5% Simple', '5% Compound', '3% Simple', '3% Compound', 'Other'];
    $scope.benefitIncreaseType = ['Simple', 'Compound'];
    $scope.benefitPeriods = ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '10 Years', 'Lifetime or Unlimited'];
    $scope.editMode = $routeParams.policyId ? true : false;
    if ($routeParams.policyId) {
      $q.all([
        PolicyCare.get({
          guid: $routeParams.policyId
        }).$promise, Person.query().$promise
      ]).then(function(data) {
        $scope.carePolicy = data[0];
        $scope.people = data[1];
        $scope.carePolicy.day = 1;
        $scope.carePolicy.month = moment($scope.carePolicy.start_on).month();
        return $scope.carePolicy.year = moment($scope.carePolicy.start_on).year();
      });
    } else {
      $scope.carePolicy = new PolicyCare();
      $scope.people = Person.query();
    }
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if ($scope.carePolicy.elimination_period === 'Other') {
        $scope.carePolicy.elimination_period = $scope.carePolicy.elimination_period_other;
      }
      if ($scope.carePolicy.waiting_period === 'Other') {
        $scope.carePolicy.waiting_period = $scope.carePolicy.waiting_period_other;
      }
      if ($scope.carePolicy.benefit_increase === 'Other') {
        if ($scope.carePolicy.benefit_increase_other && $scope.carePolicy.benefit_increase_type) {
          $scope.carePolicy.benefit_increase = $scope.carePolicy.benefit_increase_other + "% " + $scope.carePolicy.benefit_increase_type;
        } else {
          $scope.carePolicy.benefit_increase = void 0;
        }
      }
      if (isValid) {
        $scope.pending = true;
        $scope.carePolicy.person_guid = $scope.carePolicy.person.guid;
        if (!$scope.isPhone) {
          $scope.carePolicy.start_on = $scope.carePolicy.year + "-" + ($scope.carePolicy.month + 1) + "-" + $scope.carePolicy.day;
        }
        return $scope.carePolicy.$save().then(function(result) {
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The policy was created successfully.'
          });
          $rootScope.$broadcast('refresh');
          return $location.path('summaries/policies/care');
        }, function(err) {
          $scope.pending = false;
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error creating the policy.'
          });
        });
      }
    };
    $scope.openDeleteModal = function(policy) {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'deletePolicyModal',
        controller: ModalInstanceCtrl,
        resolve: {
          policy: function() {
            return policy;
          }
        }
      });
    };
    return ModalInstanceCtrl = [
      '$scope', '$modalInstance', '$location', 'policy', function($scope, $modalInstance, $location, policy) {
        $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
        return $scope.deletePolicy = function() {
          $scope.pending = true;
          return policy.$delete().then(function(result) {
            $scope.pending = false;
            $modalInstance.close(policy);
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: 'The policy was deleted successfully.'
            });
            return $location.path('/policies');
          }, function(err) {
            $scope.pending = false;
            $modalInstance.dismiss('cancel');
            return $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: 'There was an error deleting the policy.'
            });
          });
        };
      }
    ];
  });

}).call(this);

//# sourceMappingURL=policies.js.map
