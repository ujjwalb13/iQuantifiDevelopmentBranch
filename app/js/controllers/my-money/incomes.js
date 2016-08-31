(function() {
  'use strict';
  angular.module('agera').controller('IncomesCtrl', function($location, $scope, $rootScope, Income) {
    $scope.incomes = Income.query();
    return $scope.goToIncomeEdit = function(guid) {
      return $location.path("/my-money/incomes/" + guid);
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
        $scope.editMode = true;
        return $scope.people = data[1];
      });
    } else {
      $scope.income = new Income();
      $scope.people = Person.query();
      $scope.editMode = false;
    }

    $scope.gotoIncome = function () {
      return $location.path('/my-money/income');
    };

    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        $scope.income.person_guid = $scope.income.person.guid;
        var incomes = [];
        incomes.push($scope.income);
        return Income.updateList(incomes).$promise.then(function (result) {
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The income was saved successfully.'
          });
          $rootScope.$broadcast('refresh');
          return $location.path('/my-money/income');
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
        return $scope.deleteIncome = function () {
          $scope.deleting = true;
          return income.$delete().then(function(result) {
            $modalInstance.close(income);
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: 'The income was deleted successfully.'
            });
            return $location.path('/my-money/income');
          }, function(err) {
            $modalInstance.dismiss('cancel');
            return $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: 'There was an error deleting the income.'
            });
          })["finally"](function () {
            return $scope.deleting = false;
          });
        };
      }
    ];
  });

}).call(this);

//# sourceMappingURL=incomes.js.map
