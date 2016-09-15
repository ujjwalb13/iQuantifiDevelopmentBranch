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

  angular.module('goals').factory('RingSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/rings/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function () {
      return this.ring;
    }

    return obj;
  });

  angular.module('goals').factory('CarSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/cars/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function () {
      return this.car;
    }

    return obj;
  });

  angular.module('goals').factory('RelocationSummary', function ($resource, $http, ENV) {
    var obj;
    obj = $resource(ENV.apiHost + "/goals/relocations/:guid/summary", {
      guid: '@guid'
    });

    obj.prototype.goal = function () {
      return this.relocation;
    }

    return obj;
  });

}).call(this);




