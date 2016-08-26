(function() {
  'use strict';
  angular.module('agera').filter('translate', function() {
    return function(input) {
      var m;
      m = {
        'ira401k': '401k/403b',
        'ira_simple': 'simple ira',
        'ira_sep': 'sep ira',
        'ira_roth': 'roth ira',
        'education': '529 plan',
        'term_5': '5 Year Term',
        'term_10': '10 Year Term',
        'term_15': '15 Year Term',
        'term_20': '20 Year Term',
        'term_25': '25 Year Term',
        'term_30': '30 Year Term',
        'own_occupation': 'Own Occupation',
        'any_occupation': 'Any Occupation',
        'ivf': 'In-Vitro',
        'daily': 'Daily Coverage',
        'monthly': 'Monthly Coverage',
        'app': 'App Functionality',
        'philosophy': 'Philosphy/Planning Concepts',
        'calculations': 'Calculations',
        'limits': 'Limits',
        'terms': 'Terms Recommended',
        'shortage': 'Shortage',
        'updates': 'Updates and Maintenance'
      };
      return m[input] || input;
    };
  });

}).call(this);

//# sourceMappingURL=translate.js.map
