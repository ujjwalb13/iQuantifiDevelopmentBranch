(function() {
  'use strict';
  angular.module('myMoney').factory('DebtAndPolicyPayment', [
    'Resource', 'ENV', function($resource, ENV) {
      return $resource(ENV.apiHost + "/Finance/Expenses/DebtAndPolicyPayments");
    }
  ]);

}).call(this);

