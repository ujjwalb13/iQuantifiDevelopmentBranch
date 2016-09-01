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
            link: "/progress",
            title: "Overview",
            icon: "icon-al-my-progress",
            active: false
          }, {
            link: "/progress/goal",
            title: "My Goals",
            icon: "icon-gl-custom-goal",
            active: false
          }, {
            link: "/progress/debt",
            title: "My Debts",
            icon: "icon-db-debt",
            active: false
          }, {
            link: "/progress/protection",
            title: "My Protections",
            icon: "icon-pt-protection",
            active: false
          }, {
            link: "/achievements",
            title: "My Achievements",
            icon: "icon-al-my-archivement",
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
