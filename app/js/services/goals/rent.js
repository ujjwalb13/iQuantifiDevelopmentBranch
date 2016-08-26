(function() {
  'use strict';
  angular.module('goals').factory('Rent', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/rents/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/rents/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/rents/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/rents/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/rents/" + this.guid + "/schedule");
    };
    obj.type = 'goal';
    obj.kind = 'rent';
    obj.dateTitle = 'Move Date';
    obj.amountTitle = 'Total Amount';
    obj.hasFinance = false;
    obj.attributes = [
      {
        title: 'Monthly Rent',
        attribute: 'monthly_rent',
        filter: 'dollars'
      }, {
        title: 'Security Deposit',
        attribute: 'security_deposit',
        filter: 'dollars'
      }
    ];
    obj.donutAttribute = 'security_deposit';
    return obj;
  });

}).call(this);

//# sourceMappingURL=rent.js.map
