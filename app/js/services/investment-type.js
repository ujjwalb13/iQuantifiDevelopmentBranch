(function() {
  'use strict';
  angular.module('agera').factory('InvestmentType', [
    'Resource', 'ENV', function($resource, ENV) {
      var obj;
      obj = $resource(ENV.apiHost + "/advice/investment_types/:id", {
        id: '@id'
      });
      obj.asset_classes = ['Balanced Fund', 'Emerging Market Fund', 'Global Bond', 'Global Stock', 'Intermediate Bond', 'International Growth', 'Large Cap Growth', 'Large Cap Value', 'Mid Cap Growth', 'Mid Cap Value', 'Short Term Bond', 'Small Cap Value'];
      obj.kinds = ['mutual_fund', 'index_fund', 'etf'];
      return obj;
    }
  ]);

}).call(this);

//# sourceMappingURL=investment-type.js.map
