(function() {
  'use strict';
  angular.module('agera').controller('CanIBuyCtrl', function($scope, $http, $modal, $location, Scenario, ENV) {
    var ModalInstanceCtrl;
    $http.get(ENV.apiHost + "/finance/impulse_items/limit").then(function(response) {
      return $scope.limit = response.data;
    });
    $http.get(ENV.apiHost + "/goals/reserves/progress").then(function(response) {
      return $scope.reservesData = response.data;
    });
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        return $http.post(ENV.apiHost + "/finance/impulse_items", {
          name: $scope.name,
          amount: $scope.amount
        }).then(function(response) {
          if (response.data.success) {
            return $scope.openSuccessModal();
          } else {
            return $scope.openFailureModal();
          }
        }, function(response) {
          return $scope.errors = response.data.errors;
        });
      }
    };
    $scope.openSuccessModal = function() {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'successModal',
        controller: ModalInstanceCtrl,
        windowClass: 'new-iq-modal green',
        resolve: {
          reservesData: function() {
            return $scope.reservesData;
          },
          impulseAmount: function() {
            return $scope.amount;
          }
        }
      });
    };
    $scope.openFailureModal = function() {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: 'failureModal',
        controller: ModalInstanceCtrl,
        windowClass: 'new-iq-modal red',
        resolve: {
          reservesData: function() {
            return $scope.reservesData;
          },
          impulseAmount: function() {
            return $scope.amount;
          }
        }
      });
    };
    return ModalInstanceCtrl = [
      '$scope', '$modalInstance', 'Scenario', 'reservesData', 'impulseAmount', function($scope, $modalInstance, Scenario, reservesData, impulseAmount) {
        $scope.reservesBalance = reservesData['1CR'].balance + reservesData['3CR'].balance + reservesData['6CR'].balance;
        $scope.reservesAmount = reservesData['1CR'].amount + reservesData['3CR'].amount + reservesData['6CR'].amount;
        $scope.oneCRAmount = reservesData['1CR'].amount;
        $scope.threeCRAmount = reservesData['3CR'].amount;
        $scope.sixCRAmount = reservesData['6CR'].amount;
        $scope.impulseAmount = impulseAmount;
        $scope.close = function() {
          return $modalInstance.close('close');
        };
        $scope.accept = function() {
          return Scenario.save().$promise.then(function() {
            $modalInstance.close('accept');
            return $location.path('/');
          });
        };
        return $scope.decline = function() {
          return Scenario.undo().$promise.then(function() {
            $modalInstance.close('decline');
            return $location.path('/');
          });
        };
      }
    ];
  });

}).call(this);

//# sourceMappingURL=can-i-buy.js.map
