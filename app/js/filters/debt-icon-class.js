(function() {
  'use strict';
  angular.module('agera').filter('debtIconClass', function() {
    return function(input) {
      input = input.toLowerCase();

      if (input === "car") {
        return "icon-db-auto-loan";
      }
      if (input === "credit_card") {
        return "icon-db-credit-card";
      }
      if (input === "heloc") {
        return "icon-db-heloc";
      }
      if (input === "line_of_credit") {
        return "icon-db-line-of-credit";
      }
      if (input === "mortgage") {
        return "icon-db-morgage";
      }
      if (input === "student_loan") {
        return "icon-db-student-loan";
      }
    };
  });

}).call(this);

//# sourceMappingURL=debt-icon-class.js.map
