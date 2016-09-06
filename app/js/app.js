'use strict';
var app = angular.module('agera')

app.run(function ($http, $rootScope, $location, $window, Auth, toaster) {
  $rootScope.alerts = [];
  $rootScope.shortageAlert = { id: '' };

  $rootScope.$on('alert', function (event, data) {
    //
    $rootScope.alerts.push(data);
    if (data.msg != "")
    {
      if (data.type == 'danger')
        toaster.pop('error', "", data.msg);
      else
        toaster.pop(data.type, "", data.msg);
    }

    var found = false;
    var i = 0;
    for (i = 0; i < $rootScope.alerts.length; i++) {
      if ($rootScope.alerts[i].id == 'shortage')
      {
        found = true;
        $rootScope.shortageAlert = $rootScope.alerts[i];
      }
    }

    if (found==false)
      $rootScope.shortageAlert = {id: '' };

  });

  $rootScope.$on('clearAlerts', function (scope, alerts) {
    $rootScope.shortageAlert = { id: '' };
    $rootScope.alerts = [];
    return;

  });
  //$http.defaults.headers.common['Accept'] = 'application/json';
  //$http.defaults.headers.common['Content-Type'] = 'application/json';
  $http.defaults.withCredentials = true;
  $rootScope.demo = false;
  $rootScope.showDashboard = false;
  $rootScope.whichMenu = 'default';
  $rootScope.showMenu = function(type) {
    if (type === $rootScope.whichMenu) {
      return true;
    } else {
      return false;
    }
  };
  if ($location.host() === 'zbank.iquantifi.com') {
    $rootScope.demo = true;
    $rootScope.showDashboard = true;
  }
  $rootScope.location = $location;
  $rootScope.footerDate = new Date();
  $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {

      if (_($window.location.href).endsWith('/two-factor-auth'))
          return null;
      else
          return Auth.logout().then(function () {
      $rootScope.currentUser = null;
      if (!_($window.location.href).endsWith('/login')) {
        return $location.path('/login');
>>>>>>> refs/remotes/origin/master
      }
    });
  });
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    angular.element('.d3-tip').remove();
    $rootScope.onTimeline = false;
    if (next.loginRequired !== false) {
      return Auth.currentUser().then(function(user) {
        $rootScope.currentUser = user;
        if (next.setupRequired !== false && user.is_setup_complete === false) {
          $location.path('/onboard/family');
        }
        if (/^\/admin/.test($location.path()) && user['is_admin?'] === false) {
          $location.path('/');
        }
        if ($rootScope.demo && $rootScope.showDashboard) {
          $rootScope.showDashboard = false;
          return $location.path('/dashboard');
        }
      });
    }
  });
  $rootScope.$on('$locationChangeSuccess', function() {
    __insp.push(["virtualPage"]);
    if ($rootScope.demo && /^\/dashboard/.test($location.path())) {
      $rootScope.whichMenu = 'demo-dash';
    } else if ($rootScope.demo && /^\/login/.test($location.path())) {
      $rootScope.whichMenu = 'demo-login';
    } else {
      $rootScope.whichMenu = 'default';
    }
    if (/^\/cashfinder\/\d+$/.test($location.path())) {
      $rootScope.backPath = '/#/cashfinder';
    } else if (/^\/add-goal$/.test($location.path())) {
      $rootScope.backPath = '/#';
    } else if (/^\/actions\/\d+$/.test($location.path())) {
      $rootScope.backPath = '/#/actions';
    } else if (/^\/onboard\/accounts\/link$/.test($location.path())) {
      $rootScope.backPath = '/#/onboard/accounts';
    } else if (/^\/onboard\/family$/.test($location.path())) {
      $rootScope.backPath = '/#/welcome';
    } else if (/^\/onboard\/experience$/.test($location.path())) {
      $rootScope.backPath = '/#/onboard/family';
    } else if (/^\/onboard\/accounts\/link-or-manual$/.test($location.path())) {
      $rootScope.backPath = '/#/onboard/experience';
    } else if (/^\/onboard\/accounts$/.test($location.path())) {
      $rootScope.backPath = '/#/onboard/accounts/link-or-manual';
    } else if (/^\/onboard\/manual-expenses$/.test($location.path())) {
      $rootScope.backPath = '/#/onboard/manual-income';
    } else if (/^\/onboard\/manual-income$/.test($location.path())) {
      $rootScope.backPath = '/#/onboard/accounts';
    } else {
      $rootScope.backPath = null;
    }
    if (/^\/onboard/.test($location.path())) {
      return $rootScope.isOnboarding = true;
    } else {
      return $rootScope.isOnboarding = false;
    }
  });
  $rootScope.$on('screen:dim', function() {
    angular.element('.screen-dim').remove();
    return angular.element('body').append('<div class="screen-dim">me here</div>');
  });

  $rootScope.$on('screen:undim', function() {
    return angular.element('.screen-dim').remove();
  });

  $rootScope.goBack = function() {
    if ($rootScope.backPath != null) {
      $location.path($rootScope.backPath)
    } else {
      $window.history.back();
    }
  };

});

app.directive("modalShow", function ($parse) {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {

      //Hide or show the modal
      scope.showModal = function (visible, elem) {
        if (!elem)
          elem = element;

        if (visible)
          $(elem).appendTo('body').modal("show"); //$(elem).modal("show"); //
        else
          $(elem).modal("hide");
      }

      //Watch for changes to the modal-visible attribute
      scope.$watch(attrs.modalShow, function (newValue, oldValue) {
        scope.showModal(newValue, attrs.$$element);
      });

      //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
      $(element).bind("hide.bs.modal", function () {
        $parse(attrs.modalShow).assign(scope, false);
        if (!scope.$$phase && !scope.$root.$$phase)
          scope.$apply();
      });
    }

  };
});

//# sourceMappingURL=app.js.map
