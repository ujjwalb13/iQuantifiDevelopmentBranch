(function () {
  'use strict';
  angular.module('feature-sidebar').directive('featureSidebar', function ($location) {
    return {
      restrict: 'E',
      scope: {
        currentPage: '@'
      },
      controller: function ($scope, $element) {
        var self;
        self = this;
        $scope.pages = [
          {
            link: "/my-features/scenario",
            title: "Scenario Planner ",
            icon: "icon-ft-scenario-planer",
            active: false
          }, {
            link: "/my-features/cashfinder",
            title: "Cash Finder",
            icon: "icon-ft-cash-finder",
            active: false
          }, {
            link: "/my-features/canibuy",
            title: "Can I Buy?",
            icon: "icon-ft-can-i-buy",
            active: false
          }
        ];
        $scope.$watch('currentPage', function (newValue) {
          var currentPage;
          console.log(newValue);
          if (!newValue) {
            return;
          }
          currentPage = _.find($scope.pages, function (item) {
            console.log(item);
            return item.link === newValue;
          });
          return currentPage.active = true;
        });
        return $scope.gotoPage = function (page) {
          console.log(page.link);
          return $location.path(page.link);
        };
      },
      templateUrl: '/views/directives/feature-sidebar.tpl.html'
    };
  });

}).call(this);

//# sourceMappingURL=directive.js.map
