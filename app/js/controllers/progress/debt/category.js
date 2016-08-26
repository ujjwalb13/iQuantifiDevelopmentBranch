(function() {
  'use strict';
  angular.module('progress').controller('DebtCategoryCtrl', function($scope, $location) {
    var debtTypes;
    debtTypes = ["car", "credit_card", "heloc", "line_of_credit", "mortgage", "student_loan"];
    $scope.debtTypes = debtTypes;
    return $scope.addNewDebt = function(debtType) {
      return $location.path("/debts/" + debtType + "/new");
    };
  });

}).call(this);

//# sourceMappingURL=category.js.map
