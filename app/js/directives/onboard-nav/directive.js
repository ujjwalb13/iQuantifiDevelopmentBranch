(function() {
  'use strict';
  angular.module('onboard-nav').directive('onboardNav', function() {
    return {
      restrict: 'E',
      scope: {
        currentStep: '='
      },
      controller: function($scope, $element) {
        var self;
        self = this;
        $scope.tabs = [
          {
            index: 1,
            title: "Family Profile"
          }, {
            index: 2,
            title: "Experience"
          }, {
            index: 3,
            title: "Accounts"
          }, {
            index: 4,
            title: "Income"
          }, {
            index: 5,
            title: "Expenses"
          }
        ];
        $scope.$watch('currentStep', function(newValue, oldValue) {
          if (!newValue) {
            return;
          }
          return self.initTabStyle();
        });
        return this.initTabStyle = function() {
          return _.map($scope.tabs, function(tab) {
            var status;
            status = (function() {
              switch (false) {
                case !($scope.currentStep > tab.index):
                  return "complete";
                case $scope.currentStep !== tab.index:
                  return "active";
                default:
                  return "incomplete";
              }
            })();
            return _.extend(tab, {
              status: status
            });
          });
        };
      },
      templateUrl: '/views/onboard/onboard-nav.tpl.html'
    };
  });

}).call(this);

//# sourceMappingURL=directive.js.map
