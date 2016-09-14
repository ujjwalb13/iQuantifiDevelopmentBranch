(function () {
  'use strict';
  angular.module('goals').factory('BabySummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/babies/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function () {
      return this.baby;
    }

    return obj;
  });


  angular.module('goals').factory('WeddingSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/weddings/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function () {
      return this.wedding;
    }

    return obj;
  });


  angular.module('goals').factory('TravelSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/travels/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function () {
      return this.travel;
    }

    return obj;
  });


  angular.module('goals').factory('PurchaseSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/purchases/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function () {
      return this.purchase;
    }

    return obj;
  });
}).call(this);




