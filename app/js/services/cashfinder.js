(function() {
  'use strict';
  angular.module('agera').factory('CashfinderService', function($rootScope, $http, ENV) {
    return {
      showModal: true,
      showAllExpenses: false,
      fetchData: function() {
        return $http.post(ENV.apiHost + "/advice/cashfinder", {
          overrides: $rootScope.overrides
        }).then(function(data) {
          $rootScope.expenses = _.filter(data.data.expenses, function(expense){
            return expense.amount });

          $rootScope.shortage = data.data.shortage;

          $rootScope.overrides = $rootScope.overrides || {};

          _.each($rootScope.expenses, function(expense){
            expense.new_amount = expense.recommended_amount || expense.amount;
          });
        });
      }
    };
  });
}).call(this);

//# sourceMappingURL=cashfinder.js.map
