(function() {
  'use strict';
  angular.module('agera').filter('debtTypeName', function() {
    return function(input) {
      if (input === "car") {
        return "Auto Loan";
      }
      if (input === "credit_card") {
        return "Credit Card";
      }
      if (input === "heloc") {
        return "Home Equity Line of Credit";
      }
      if (input === "line_of_credit") {
        return "Personal Line of Credit";
      }
      if (input === "mortgage") {
        return "Mortgage";
      }
      if (input === "student_loan") {
        return "Student Loan";
      }
    };
  });

}).call(this);

//# sourceMappingURL=debt-type-name.js.map
