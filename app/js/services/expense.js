(function() {
  'use strict';
  angular.module('myMoney').factory('Expense', [
    'Resource', 'ENV', function($resource, ENV) {
      var obj;
      obj = $resource(ENV.apiHost + "/finance/expenses", {}, {
        save: {
          method: 'POST',
          isArray: true
        }
      });
      obj.getName = function(kind) {
        if(kind == undefined) { return "";}
        var kind_formatted;
        kind_formatted = kind.replace('hobbies_travel', 'Hobbies / Travel').replace('cable_internet', 'Cable / Internet').replace('other', 'Other Expenses');
        return _.titleize(_.humanize(kind_formatted));
      };
      return obj;
    }
  ]);

}).call(this);

//# sourceMappingURL=expense.js.map
