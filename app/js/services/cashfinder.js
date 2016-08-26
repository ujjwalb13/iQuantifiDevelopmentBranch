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
          var expense, i, j, k, len, len1, len2, ref, ref1, ref2, results;
          $rootScope.expenses = data.data.expenses;
          $rootScope.shortage = data.data.shortage;
          if ($rootScope.overrides == null) {
            $rootScope.overrides = {};
          }
          ref = $rootScope.expenses;
          for (i = 0, len = ref.length; i < len; i++) {
            expense = ref[i];
            expense.new_amount = expense.amount;
          }
          ref1 = $rootScope.expenses;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            expense = ref1[j];
            if (expense.recommended_amount && ($rootScope.overrides[expense.kind] == null)) {
              expense.new_amount = expense.recommended_amount;
            }
          }
          ref2 = $rootScope.expenses;
          results = [];
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            expense = ref2[k];
            if ($rootScope.overrides[expense.kind] != null) {
              results.push(expense.new_amount = $rootScope.overrides[expense.kind]);
            }
          }
          return results;
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=cashfinder.js.map
