(function() {
  'use strict';
  angular.module('agera').controller('IncomesCtrl', function($location, $scope, $rootScope, Income) {
    $scope.incomes = Income.query();
    return $scope.goToIncomeEdit = function(guid) {
      return $location.path("/incomes/" + guid);
    };
  });

  angular.module('agera').controller('IncomeFormCtrl', function($modal, $scope, $routeParams, $rootScope, $location, $q, Income, Person) {
    var ModalInstanceCtrl;
    if ($routeParams.incomeId) {
      $q.all([
        Income.get({
          guid: $routeParams.incomeId
        }).$promise, Person.query().$promise
      ]).then(function(data) {
        $scope.income = data[0];
        return $scope.people = data[1];
      });
    } else {
      $scope.income = new Income();
      $scope.people = Person.query();
    }
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        $scope.income.person_guid = $scope.income.person.guid;
        return $scope.income.$save().then(function(result) {
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The income was saved successfully.'
          });
          $rootScope.$broadcast('refresh');
          return $location.path('/incomes');
        }, function(err) {
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error saving the income.'
          });
        })["finally"](function() {
          return $scope.processing = false;
        });
      }
    };
    $scope.openDeleteModal = function(income) {
      var modalInstance;
      $rootScope.savable = false;
      return modalInstance = $modal.open({
        templateUrl: 'deleteIncomeModal',
        controller: ModalInstanceCtrl,
        resolve: {
          income: function() {
            return income;
          }
        }
      });
    };
    return ModalInstanceCtrl = [
      '$location', '$scope', '$modalInstance', 'income', function($location, $scope, $modalInstance, income) {
        $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
        return $scope.deleteIncome = function() {
          return income.$delete().then(function(result) {
            $modalInstance.close(income);
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: 'The income was deleted successfully.'
            });
            return $location.path('/incomes');
          }, function(err) {
            $modalInstance.dismiss('cancel');
            return $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: 'There was an error deleting the income.'
            });
          });
        };
      }
    ];
  });

}).call(this);

//# sourceMappingURL=incomes.js.map
