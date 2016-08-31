(function() {
  'use strict';
  angular.module('progress-sidebar').directive('progressSidebar', function($location) {
    return {
      restrict: 'E',
      scope: {
        currentPage: '@'
      },
      controller: function($scope, $element) {
        var self;
        self = this;
        $scope.pages = [
          {
            link: "/settings",
            title: "Account Settings",
            active: false
          }, {
            link: "/people",
            title: "Household",
            active: false
          }, {
            link: "/experience",
            title: "Experience",
            active: false
          }, {
            link: "/permissions",
            title: "Permissions",
            active: false
          }, {
            link: "/feedback",
            title: "Feedback",
            active: false
          }
        ];
        $scope.$watch('currentPage', function(newValue) {
          var currentPage;
          if (!newValue) {
            return;
          }
          currentPage = _.find($scope.pages, function(item) {
            return item.link === newValue;
          });
          return currentPage.active = true;
        });
        return $scope.gotoPage = function(page) {
          return $location.path(page.link);
        };
      },
      templateUrl: '/views/directives/progress-sidebar.tpl.html'
    };
  });

}).call(this);

//# sourceMappingURL=directive.js.map
