(function() {
  'use strict';
  angular.module('agera').filter('accountKind', function() {
    return function(input) {
      var accountKinds;
      accountKinds = {
        checking: "Checking",
        savings: "Savings",
        market: "Money Market",
        brokerage: "Brokerage",
        other: "Other",
        education: "529 Plan",
        ira401k: "401k/403b",
        ira_roth: "Roth IRA",
        ira: "IRA",
        ira_sep: "Sep IRA",
        ira_simple: "Simple IRA"
      };
      return accountKinds[input] || accountKinds.other;
    };
  });

}).call(this);

//# sourceMappingURL=account-kind.js.map
