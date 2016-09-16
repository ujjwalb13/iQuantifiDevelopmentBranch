(function () {
  'use strict';
  angular.module('goals').factory('CreditCardSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/credit_cards/:guid/summary", {
      guid: '@guid'
    });


    return obj;
  });

  angular.module('goals').factory('LoanSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/loans/:guid/summary", {
      guid: '@guid'
    });



    return obj;
  });



}).call(this);
