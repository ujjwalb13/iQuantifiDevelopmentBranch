(function() {
  'use strict';
  angular.module('agera').directive('stateSelector', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/state-selector.tpl.html',
      scope: {
        model: '=',
        name: '@',
        label: '@',
        stateChanged: '&'
      },
      link: function($scope, element, attributes) {
        return $scope.emptyName = attributes.emptyname || 'Select State';
      },
      controller: [
        "$scope", function($scope) {
          $scope.selectedState = '';
          return $scope.states = [
            {
              name: "AL",
              abbreviation: "AL"
            }, {
              name: "AK",
              abbreviation: "AK"
            }, {
              name: "AZ",
              abbreviation: "AZ"
            }, {
              name: "AR",
              abbreviation: "AR"
            }, {
              name: "CA",
              abbreviation: "CA"
            }, {
              name: "CO",
              abbreviation: "CO"
            }, {
              name: "CT",
              abbreviation: "CT"
            }, {
              name: "DE",
              abbreviation: "DE"
            }, {
              name: "DC",
              abbreviation: "DC"
            }, {
              name: "FL",
              abbreviation: "FL"
            }, {
              name: "GA",
              abbreviation: "GA"
            }, {
              name: "HI",
              abbreviation: "HI"
            }, {
              name: "ID",
              abbreviation: "ID"
            }, {
              name: "IL",
              abbreviation: "IL"
            }, {
              name: "IN",
              abbreviation: "IN"
            }, {
              name: "IA",
              abbreviation: "IA"
            }, {
              name: "KS",
              abbreviation: "KS"
            }, {
              name: "KY",
              abbreviation: "KY"
            }, {
              name: "LA",
              abbreviation: "LA"
            }, {
              name: "ME",
              abbreviation: "ME"
            }, {
              name: "MD",
              abbreviation: "MD"
            }, {
              name: "MA",
              abbreviation: "MA"
            }, {
              name: "MI",
              abbreviation: "MI"
            }, {
              name: "MN",
              abbreviation: "MN"
            }, {
              name: "MS",
              abbreviation: "MS"
            }, {
              name: "MO",
              abbreviation: "MO"
            }, {
              name: "MT",
              abbreviation: "MT"
            }, {
              name: "NE",
              abbreviation: "NE"
            }, {
              name: "NV",
              abbreviation: "NV"
            }, {
              name: "NH",
              abbreviation: "NH"
            }, {
              name: "NJ",
              abbreviation: "NJ"
            }, {
              name: "NM",
              abbreviation: "NM"
            }, {
              name: "NY",
              abbreviation: "NY"
            }, {
              name: "NC",
              abbreviation: "NC"
            }, {
              name: "ND",
              abbreviation: "ND"
            }, {
              name: "OH",
              abbreviation: "OH"
            }, {
              name: "OK",
              abbreviation: "OK"
            }, {
              name: "OR",
              abbreviation: "OR"
            }, {
              name: "PA",
              abbreviation: "PA"
            }, {
              name: "RI",
              abbreviation: "RI"
            }, {
              name: "SC",
              abbreviation: "SC"
            }, {
              name: "SD",
              abbreviation: "SD"
            }, {
              name: "TN",
              abbreviation: "TN"
            }, {
              name: "TX",
              abbreviation: "TX"
            }, {
              name: "UT",
              abbreviation: "UT"
            }, {
              name: "VT",
              abbreviation: "VT"
            }, {
              name: "VA",
              abbreviation: "VA"
            }, {
              name: "WA",
              abbreviation: "WA"
            }, {
              name: "WV",
              abbreviation: "WV"
            }, {
              name: "WI",
              abbreviation: "WI"
            }, {
              name: "WY",
              abbreviation: "WY"
            }
          ];
        }
      ]
    };
  });

}).call(this);

//# sourceMappingURL=state-selector.js.map
