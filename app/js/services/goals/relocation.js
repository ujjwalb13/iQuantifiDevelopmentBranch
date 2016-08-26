(function() {
  'use strict';
  angular.module('goals').factory('Relocation', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/relocations/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/relocations/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/relocations/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/relocations/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/relocations/" + this.guid + "/schedule");
    };
    obj.type = 'goal';
    obj.kind = 'relocation';
    obj.dateTitle = 'Move Date';
    obj.amountTitle = 'Total Amount';
    obj.hasFinance = false;
    obj.attributes = [
      {
        title: 'Relocation Amount',
        attribute: 'amount',
        filter: 'dollars'
      }
    ];
    obj.donutAttribute = 'amount';
    return obj;
  });

}).call(this);

//# sourceMappingURL=relocation.js.map
