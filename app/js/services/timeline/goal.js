(function() {
  'use strict';
  angular.module('timeline').factory('goalService', function($http, $q, ENV) {
    var goalService;
    goalService = {
      get: function(goal) {
        var url;
        url = ENV.apiHost + goal.href;
        return $http.get(url).then(function(response) {
          return response.data;
        }, function(response) {
          response.data;
          return $q.reject(response);
        });
      },
      put: function (goal) {
        var url;
        url = ENV.apiHost + goal.href;
        return $http.put(url, goal).then(function (response) {
          return response.data;
        }, function (response) {
          response.data;
          return $q.reject(response);
        });
      },
      updateDate: function (goal) {
        var url;
        url = ENV.apiHost + goal.href + '/UpdateDate';
        return $http.put(url, goal).then(function (response) {
          return response.data;
        }, function (response) {
          response.data;
          return $q.reject(response);
        });
      },
      "delete": function (goal) {
        var url;
        url = ENV.apiHost + goal.href;
        return $http["delete"](url).then(function(response) {
          return response.data;
        }, function(response) {
          response.data;
          return $q.reject(response);
        });
      },
      post: function(goal) {
        var url;
        if (goal.type === 'baby') {
          goal.href = '/goals/babies';
        } else if (goal.type === 'education') {
          goal.href = '/goals/colleges';
        } else if (goal.type === 'debt' && goal.kind === 'credit_card') {
          goal.href = '/debts/credit_cards';
        } else if (goal.type === 'debt') {
          goal.href = '/debts/loans';
        } else {
          goal.href = "/goals/" + goal.type + "s";
        }
        url = ENV.apiHost + goal.href;
        return $http.post(url, goal).then(function(response) {
          return response.data;
        }, function(response) {
          response.data;
          return $q.reject(response);
        });
      },
      validAccounts: function(href, type) {
        var url;
        url = "" + ENV.apiHost + href + "/valid_accounts?type=" + type;
        return $http.get(url);
      },
      link: function(accountHref, accountGuid) {
        var url;
        url = ENV.apiHost + accountHref + '/link';
        return $http.put(url, {
          account_guid: accountGuid
        });
      }
    };
    return goalService;
  });

}).call(this);

//# sourceMappingURL=goal.js.map
