(function() {
  'use strict';
  angular.module('agera').factory('Person', [
    'Resource', '$http', 'ENV', function($resource, $http, ENV) {
      var CONTENT_TYPE_APPLICATION_JSON, JSON_END, JSON_START, PROTECTION_PREFIX, transformPerson;
      JSON_START = /^\s*(\[|\{[^\{])/;
      JSON_END = /[\}\]]\s*$/;
      PROTECTION_PREFIX = /^\)\]\}',?\n/;
      CONTENT_TYPE_APPLICATION_JSON = {
        'Content-Type': 'application/json;charset=utf-8'
      };
      transformPerson = function(person) {
        var date;
        if (person.dob) {
          date = moment(person.dob);
          person.month = date.get('month');
          person.day = date.get('date');
          person.year = date.get('year');
        }
        person.full_name = person.first_name + " " + person.last_name;
        return person;
      };
      return $resource(ENV.apiHost + "/people/:guid", {
        guid: '@guid'
      }, {
        query: {
          isArray: true,
          transformResponse: [
            function(data) {
              var i, len, person;
              if (angular.isString(data)) {
                data = data.replace(PROTECTION_PREFIX, '');
                if (JSON_START.test(data) && JSON_END.test(data)) {
                  data = angular.fromJson(data);
                  for (i = 0, len = data.length; i < len; i++) {
                    person = data[i];
                    transformPerson(person);
                  }
                }
              }
              return data;
            }
          ].concat($http.defaults.transformResponse)
        },
        get: {
          transformResponse: [
            function(data) {
              data = angular.fromJson(data);
              transformPerson(data);
              return data;
            }
          ].concat($http.defaults.transformResponse)
        },
        create: {
          method: 'POST',
          transformResponse: [
            function(data) {
              data = angular.fromJson(data);
              transformPerson(data);
              return data;
            }
          ].concat($http.defaults.transformResponse)
        },
        updateList: {
            isArray: true,
            method: 'POST',
            transformResponse: [
            function(data) {
                var i, len, person;
                if (angular.isString(data)) {
                    data = data.replace(PROTECTION_PREFIX, '');
                    if (JSON_START.test(data) && JSON_END.test(data)) {
                        data = angular.fromJson(data);
                        for (i = 0, len = data.length; i < len; i++) {
                            person = data[i];
                            transformPerson(person);
                        }
                    }
                }
                return data;
            }
            ].concat($http.defaults.transformResponse)
        },
        update: {
          method: 'PUT',
          transformResponse: [
            function(data) {
              data = angular.fromJson(data);
              transformPerson(data);
              return data;
            }
          ].concat($http.defaults.transformResponse)
        }
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=person.js.map
