(function() {
  'use strict';
  angular.module('agera').controller('MainMenuCtrl', function($scope, $rootScope, $location) {
    var toggleMenu;
    $scope.menuItems = [
      {
        title: "Dashboard",
        path: '/'
      }, {
        title: "My Actions",
        badge: $scope.incompleteActionsCount,
        path: '/my-actions'
      }, {
        title: "My Progress",
        subMenuItems: [
          {
            title: "Overview",
            path: '/progress'
          }, {
            title: "Goals",
            path: '/progress/goal'
          }, {
            title: "Debts",
            path: '/progress/debt'
          }, {
            title: "Protections",
            path: '/progress/protection'
          }
        ],
        open: false
      }, {
        title: "My Money",
        subMenuItems: [
          {
            title: "Overview"
          }, {
            title: "Incomes"
          }, {
            title: "Expenses"
          }, {
            title: "Accounts"
          }, {
            title: "Net Worth"
          }
        ],
        open: false
      }, {
        title: "My Features",
        subMenuItems: [
          {
            title: "Scenario Planner"
          }, {
            title: "Cashfinder"
          }, {
            title: "Can I Buy?"
          }
        ],
        open: false
      }, {
        title: "My Profile",
        subMenuItems: [
          {
            title: "Settings",
            path: '/settings'
          }, {
            title: "Household",
            path: '/people'
          }, {
            title: "Experience",
            path: '/experience'
          }, {
            title: "Feedback",
            path: '/feedback'
          }
        ],
        open: false
      }, {
        title: "FAQs",
        path: '/faq',
        setupRequired: false
      }, {
        title: "Log Out",
        setupRequired: false,
        path: '/logout'
      }
    ];
    $rootScope.$watch('currentUser', function(newValue, oldValue) {
      var isSetupComplete;
      if (!newValue) {
        return;
      }
      isSetupComplete = $rootScope.currentUser.is_setup_complete;
      return _.each($scope.menuItems, function(item) {
        if (item.setupRequired !== false) {
          return item.enabled = isSetupComplete;
        } else {
          return item.enabled = true;
        }
      });
    });
    $scope.$watch('incompleteActionsCount', function(newValue, oldValue) {
      var myAction;
      if (!newValue) {
        return;
      }
      myAction = _.find($scope.menuItems, function(item) {
        return item.title === 'My Actions';
      });
      return myAction.badge = newValue;
    });
    $scope.menuOnClick = function(menu) {
      if (menu.subMenuItems) {
        return toggleMenu(menu);
      } else {
        return $scope.gotoPath(menu.path);
      }
    };
    toggleMenu = function(menu) {
      _.each($scope.menuItems, function(item) {
        if (item !== menu) {
          return item.open = false;
        }
      });
      return menu.open = !menu.open;
    };
    return $scope.gotoPath = function(path) {
      if (path === '/logout') {
        $scope.logout();
      } else {
        $location.path(path);
      }
      return $rootScope.showMainMenu = false;
    };
  });

}).call(this);

//# sourceMappingURL=main-menu.js.map
