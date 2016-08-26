(function() {
  'use strict';
  angular.module('profile-sidebar').directive('profileSidebar', function($location) {
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
          console.log(newValue);
          if (!newValue) {
            return;
          }
          currentPage = _.find($scope.pages, function(item) {
            console.log(item);
            return item.link === newValue;
          });
          return currentPage.active = true;
        });
        return $scope.gotoPage = function(page) {
          console.log(page.link);
          return $location.path(page.link);
        };
      },
      templateUrl: '/views/directives/profile-sidebar.tpl.html'
    };
  });

}).call(this);

//# sourceMappingURL=directive.js.map
