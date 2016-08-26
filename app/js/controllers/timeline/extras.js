(function() {
  'use strict';
  angular.module('timeline').controller('ExtrasCtrl', function($scope, $rootScope, $modal, ENV) {
    return $scope.openDownsize = function() {
      var modalInstance;
      return modalInstance = $modal.open({
        templateUrl: "/views/extras/downsize.html",
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function() {}
        }
      });
    };
  });

  angular.module('timeline').controller('ModalInstanceCtrl', function($scope, $rootScope, $modalInstance, ENV) {
    var thisYear;
    thisYear = moment().year();
    $scope.years = [thisYear, thisYear + 1];
    $scope.obj = {
      name: null,
      transition_month: moment().format('MM'),
      transition_year: moment().year(),
      home_sale_price: null,
      loan_balance: null,
      amount: 0,
      next_step: null
    };
    $scope.updateProceedsAmt = function() {
      return $scope.obj.amount = Math.ceil(($scope.obj.home_sale_price * .94) - $scope.obj.loan_balance);
    };
    $scope.cancel = function() {
      return $modalInstance.dismiss('cancel');
    };
    return $scope.next = function(valid) {
      if (valid) {
        $modalInstance.close("okay");
        if ($scope.obj.next_step === 'buy') {
          $rootScope.$broadcast('newHouse', {
            name: $scope.obj.name,
            trade_in: $scope.obj.amount,
            transition_month: $scope.obj.transition_month,
            transition_year: $scope.obj.transition_year
          });
        }
        if ($scope.obj.next_step === 'rent') {
          return $rootScope.$broadcast('newRent', {
            name: $scope.obj.name,
            transition_month: $scope.obj.transition_month,
            transition_year: $scope.obj.transition_year
          });
        }
      }
    };
  });

}).call(this);

//# sourceMappingURL=extras.js.map
