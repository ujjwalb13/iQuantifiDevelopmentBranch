(function() {
  'use strict';
  angular.module('goals').factory('College', function($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/colleges/:guid", {
      guid: '@guid'
    });
    obj.prototype.actions = function() {
      return $http.get(ENV.apiHost + "/goals/colleges/" + this.guid + "/actions");
    };
    obj.prototype.completed_actions = function() {
      return $http.get(ENV.apiHost + "/goals/colleges/" + this.guid + "/actions?filter=complete");
    };
    obj.prototype.historic_actions = function() {
      return $http.get(ENV.apiHost + "/goals/colleges/" + this.guid + "/actions?filter=historic");
    };
    obj.prototype.schedule = function() {
      return $http.get(ENV.apiHost + "/goals/colleges/" + this.guid + "/schedule");
    };
    obj.prototype.accounts = function() {
      return $http.get(ENV.apiHost + "/goals/colleges/" + this.guid + "/accounts");
    };
    obj.type = 'goal';
    obj.kind = 'college';
    obj.dateTitle = 'Start Date';
    obj.amountTitle = 'Total Amount';
    obj.hasFinance = false;
    obj.attributes = [
      {
        title: "This Year's Target",
        attribute: 'current',
        filter: 'dollars'
      }
    ];
    return obj;
  });

}).call(this);

//# sourceMappingURL=college.js.map
