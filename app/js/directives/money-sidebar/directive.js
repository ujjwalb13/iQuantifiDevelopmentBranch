(function () {
  'use strict';
  angular.module('money-sidebar').directive('moneySidebar', function ($location) {
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
            link: "/my-money/overview",
            title: "Overview",
            icon: "icon-al-my-progress",
            active: false
          }, {
            link: "/my-money/income",
            title: "Income",
            icon: "icon-mm-income",
            active: false
          }, {
            link: "/my-money/expenses",
            title: "Expenses",
            icon: "icon-mm-expenses",
            active: false
          }, {
            link: "/my-money/capitalandcashflow",
            title: "Capital & Cashflow",
            icon: "icon-mm-capital-and-cashflow",
            active: false
          }, {
            link: "/my-money/accounts",
            title: "Accounts",
            icon: "icon-mm-accounts",
            active: false
          }, {
            link: "/my-money/networth",
            title: "Net Worth",
            icon: "icon-mm-net-worth",
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
      templateUrl: '/views/directives/money-sidebar.tpl.html'
    };
  });

}).call(this);

//# sourceMappingURL=directive.js.map
