(function() {
  'use strict';
  var app, dependencies;

  angular.module('actions', []);

  angular.module('admin', []);

  angular.module('aggregation', []);

  angular.module('goals', []);

  angular.module('onboard', []);

  angular.module('summaries', []);

  angular.module('timeline', []);

  angular.module('progress', []);

  angular.module('myMoney', []);

  dependencies = ['ngAnimate', 'ngMessages', 'ngRoute', 'ngResource', 'ngSanitize', 'ngTouch', 'ngMaterial', 'ui.bootstrap', 'ui.utils', 'ui.slider', 'Devise', 'angulartics.google.tagmanager', 'emguo.poller', 'slick', 'matchmedia-ng', 'newrelic-timing', 'actions', 'admin', 'aggregation', 'goals', 'onboard', 'summaries', 'timeline', 'config', 'onboard-nav', 'experience-picker', 'profile-sidebar', 'money-sidebar', 'feature-sidebar', 'mgo-angular-wizard', 'progress', 'myMoney', 'progress-sidebar'];

  app = angular.module('agera', dependencies);

  app.config(function($routeProvider) {
    return $routeProvider.when('/timeline/dashboard', {
      templateUrl: '/views/timeline/timeline.html',
      controller: 'TimelineCtrl'
    }).when('/', {
      templateUrl: '/views/timeline/dashboard.html',
      controller: 'TimelineDashboardCtrl'
    }).when('/accounts', {
      templateUrl: '/views/dropdown/accounts.html',
      controller: 'AccountsCtrl'
    }).when('/accounts/new', {
      templateUrl: '/views/dropdown/account-form.html',
      controller: 'AccountFormCtrl'
    }).when('/accounts/link/:sender?', {
      templateUrl: '/views/aggregation/link-account.html',
      controller: 'LinkAccountCtrl',
      resolve: {
        onboarding: function() {
          return false;
        }
      }
    }).when('/accounts/:accountId', {
      templateUrl: '/views/dropdown/account-form.html',
      controller: 'AccountFormCtrl'
    }).when('/actions', {
      templateUrl: '/views/actions/action-list.html',
      controller: 'ActionListCtrl'
    }).when('/actions/:actionId', {
      templateUrl: '/views/actions/action-detail.html',
      controller: 'ActionDetailCtrl'
    }).when('/actions/:actionId/open', {
      templateUrl: '/views/actions/open-action.html',
      controller: 'OpenActionCtrl'
    }).when('/add-goal', {
      templateUrl: '/views/timeline/add-goal.html',
      controller: 'AddGoalCtrl'
    }).when('/add-protection', {
      templateUrl: '/views/progress/protection/add-protection.html',
      controller: 'AddProtectionCtrl'
    }).when('/admin', {
      templateUrl: '/views/admin/main.html',
      controller: 'AdminCtrl'
    }).when('/admin/grid', {
      templateUrl: '/views/admin/grid.html',
      controller: 'GridCtrl'
    }).when('/admin/organizations', {
      templateUrl: '/views/admin/organizations.html',
      controller: 'OrganizationsCtrl'
    }).when('/admin/organizations/new', {
      templateUrl: '/views/admin/organization-form.html',
      controller: 'OrganizationFormCtrl'
    }).when('/admin/organizations/:organizationId', {
      templateUrl: '/views/admin/organization-form.html',
      controller: 'OrganizationFormCtrl'
    }).when('/admin/organizations/:organizationId/investments', {
      templateUrl: '/views/admin/investments.html',
      controller: 'InvestmentCtrl'
    }).when('/admin/organizations/:organizationId/investments/new', {
      templateUrl: '/views/admin/investment-form.html',
      controller: 'InvestmentFormCtrl'
    }).when('/admin/organizations/:organizationId/investments/:id', {
      templateUrl: '/views/admin/investment-form.html',
      controller: 'InvestmentFormCtrl'
    }).when('/admin/organizations/:organizationId/products/new', {
      templateUrl: '/views/admin/product-form.html',
      controller: 'ProductFormCtrl'
    }).when('/admin/organizations/:organizationId/products/:id', {
      templateUrl: '/views/admin/product-form.html',
      controller: 'ProductFormCtrl'
    }).when('/admin/demo', {
      templateUrl: '/views/admin/demo.html',
      controller: 'DemoCtrl'
    }).when('/alt-register', {
      redirectTo: '/#/login'
    }).when('/alt-reg-affiliate', {
      redirectTo: '/#/login'
    }).when('/alt-reg-amiti', {
      redirectTo: '/#/login'
    }).when('/alt-reg-ds', {
      redirectTo: '/#/login'
    }).when('/alt-reg-fr', {
      redirectTo: '/#/login'
    }).when('/alt-reg-ij', {
      redirectTo: '/#/login'
    }).when('/can-i-buy', {
      templateUrl: '/views/can-i-buy.html',
      controller: 'CanIBuyCtrl'
    }).when('/cashfinder', {
      templateUrl: '/views/cashfinder.html',
      controller: 'CashfinderCtrl'
    }).when('/cashfinder/:id', {
      templateUrl: '/views/cashfinder-edit.html',
      controller: 'CashfinderEditCtrl'
    }).when('/change-password', {
      templateUrl: '/views/change-password.html',
      controller: 'ChangePasswordCtrl',
      setupRequired: false,
      loginRequired: false
    }).when('/confirmation', {
      templateUrl: '/views/confirmation.html',
      controller: 'ConfirmationCtrl',
      setupRequired: false,
      loginRequired: false
    }).when('/expenses', {
      templateUrl: '/views/dropdown/expenses.html',
      controller: 'ExpensesCtrl'
    }).when('/experience', {
      templateUrl: '/views/dropdown/experience.html',
      controller: 'ExperienceCtrl',
      resolve: {
        onboarding: function() {
          return false;
        }
      }
    }).when('/permissions', {
      templateUrl: '/views/dropdown/permissions.html',
      controller: 'PermissionsCtrl'
    }).when('/feedback', {
      templateUrl: '/views/feedback.html',
      controller: 'FeedbackCtrl'
    }).when('/forgot-password', {
      templateUrl: '/views/forgot-password.html',
      controller: 'ForgotPasswordCtrl',
      setupRequired: false,
      loginRequired: false
    }).when('/incomes', {
      templateUrl: '/views/dropdown/incomes.html',
      controller: 'IncomesCtrl'
    }).when('/incomes/new', {
      templateUrl: '/views/dropdown/income-form.html',
      controller: 'IncomeFormCtrl'
    }).when('/incomes/:incomeId', {
      templateUrl: '/views/dropdown/income-form.html',
      controller: 'IncomeFormCtrl'
    }).when('/institutions/:institutionId', {
      templateUrl: '/views/aggregation/select-accounts.html',
      controller: 'SelectAccountsCtrl',
      resolve: {
        onboarding: function() {
          return false;
        }
      }
    }).when('/login', {
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl',
      setupRequired: false,
      loginRequired: false
    }).when('/onboard/accounts/link-or-manual', {
      templateUrl: '/views/onboard/link-or-manual.html',
      controller: 'onboardAccountCtrl',
      setupRequired: false
    }).when('/onboard/accounts', {
      templateUrl: '/views/onboard/accounts.html',
      controller: 'onboardAccountCtrl',
      setupRequired: false
    }).when('/onboard/accounts/link/:guid/:name', {
      templateUrl: '/views/onboard/link-account.html',
      controller: 'OnboardLinkAccountCtrl',
      resolve: {
        onboarding: function() {
          return true;
        }
      },
      setupRequired: false
    }).when('/onboard/accounts/new', {
      templateUrl: '/views/onboard/account-form.html',
      controller: 'onboardAccountNewCtrl',
      setupRequired: false
    }).when('/onboard/accounts/:accountId', {
      templateUrl: '/views/onboard/account-form.html',
      controller: 'onboardAccountEditCtrl',
      setupRequired: false
    }).when('/onboard/experience', {
      templateUrl: '/views/onboard/experience.html',
      controller: 'ExperienceCtrl',
      setupRequired: false,
      resolve: {
        onboarding: function() {
          return true;
        }
      }
    }).when('/onboard/family', {
      templateUrl: '/views/onboard/family.html',
      controller: 'onboardFamilyCtrl',
      setupRequired: false
    }).when('/onboard/goals', {
      templateUrl: '/views/onboard/goals.html',
      controller: 'onboardGoalCtrl'
    }).when('/onboard/institutions/:institutionId', {
      templateUrl: '/views/onboard/select-accounts.html',
      controller: 'SelectAccountsCtrl',
      resolve: {
        onboarding: function() {
          return true;
        }
      },
      setupRequired: false
    }).when('/onboard/manual-account', {
      templateUrl: '/views/onboard/manual-account.html',
      controller: 'onboardManualAccountCtrl',
      setupRequired: false
    }).when('/onboard/manual-expenses', {
      templateUrl: '/views/onboard/manual-expenses.html',
      controller: 'onboardManualExpensesCtrl',
      setupRequired: false
    }).when('/onboard/manual-income', {
      templateUrl: '/views/onboard/manual-income.html',
      controller: 'onboardManualIncomeCtrl',
      setupRequired: false
    }).when('/people', {
      templateUrl: '/views/dropdown/people.html',
      controller: 'PeopleCtrl'
    }).when('/people/new', {
      templateUrl: '/views/dropdown/person-form.html',
      controller: 'PersonFormCtrl'
    }).when('/people/:personId', {
      templateUrl: '/views/dropdown/person-form.html',
      controller: 'PersonFormCtrl'
    }).when('/policies', {
      templateUrl: '/views/policies/policies.html',
      controller: 'PoliciesCtrl'
    }).when('/policies/disability/new', {
      templateUrl: '/views/progress/protection/disability-policy-form.html',
      controller: 'DisabilityPolicyFormCtrl'
    }).when('/policies/disability/:policyId', {
      templateUrl: '/views/progress/protection/disability-policy-form.html',
      controller: 'DisabilityPolicyFormCtrl'
    }).when('/policies/life/new', {
      templateUrl: '/views/progress/protection/life-policy-form.html',
      controller: 'LifePolicyFormCtrl'
    }).when('/policies/life/:policyId', {
      templateUrl: '/views/progress/protection/life-policy-form.html',
      controller: 'LifePolicyFormCtrl'
    }).when('/policies/care/new', {
      templateUrl: '/views/progress/protection/care-policy-form.html',
      controller: 'CarePolicyFormCtrl'
    }).when('/policies/care/:policyId', {
      templateUrl: '/views/progress/protection/care-policy-form.html',
      controller: 'CarePolicyFormCtrl'
    }).when('/settings', {
      templateUrl: '/views/dropdown/settings.html',
      controller: 'SettingsCtrl',
      setupRequired: false
    }).when('/summaries/policies/:type', {
      templateUrl: '/views/summaries/policy.html',
      controller: 'summariesPolicyCtrl'
    }).when('/summaries/:type/:guid?', {
      templateUrl: '/views/summaries/summary.html',
      controller: 'summariesSummaryCtrl'
    }).when('/two-factor-auth', {
      templateUrl: '/views/two-factor-auth.html',
      controller: 'TwoFactorAuthCtrl',
      setupRequired: false
    }).when('/unlock', {
      templateUrl: '/views/unlock.html',
      controller: 'UnlockCtrl',
      setupRequired: false,
      loginRequired: false
    }).when('/what-if', {
      templateUrl: '/views/what-if.html',
      controller: 'WhatIfCtrl'
    }).when('/faq', {
      templateUrl: '/views/faq.html',
      controller: 'FaqCtrl'
    }).when('/dashboard', {
      templateUrl: '/views/demo/dashboard.html',
      controller: 'DashboardCtrl'
    }).when('/zlife-insurance', {
      templateUrl: '/views/demo/life-insurance.html'
    }).when('/zlife-mortgage', {
      templateUrl: '/views/demo/mortgage.html'
    }).when('/progress', {
      templateUrl: '/views/progress/overview.html',
      controller: 'ProgressOverviewCtrl'
    }).when('/progress/:type', {
      templateUrl: '/views/progress/overview.html',
      controller: 'ProgressOverviewCtrl'
    }).when('/goals/:type/new', {
      templateUrl: "/views/timeline/goal-form.html",
      controller: 'GoalFormCtrl',
      resolve: {
        items: function($route) {
          return [$route.current.params.type, "New", "goal", $route.previousObj];
        }
      }
    }).when('/goals/:type/:guid/edit', {
      templateUrl: "/views/timeline/goal-form.html",
      controller: 'GoalFormCtrl',
      resolve: {
        items: function($route, goalService, $q) {
          var defer, goalUrl, type;
          type = $route.current.params.type;
          goalUrl = "/goals/" + type + "/" + $route.current.params.guid;
          defer = $q.defer();
          goalService.get({
            href: goalUrl
          }).then(function(goal) {
            return defer.resolve([_.singularize(type), "Edit", "goal", goal]);
          });
          return defer.promise;
        }
      }
    }).when('/add-debts', {
      templateUrl: '/views/progress/debt/category.html',
      controller: 'DebtCategoryCtrl'
    }).when('/debts/:kind/new', {
      templateUrl: '/views/progress/debt/form.html',
      controller: 'DebtFormCtrl'
    }).when('/debts/:type/:guid/edit', {
      templateUrl: '/views/progress/debt/form.html',
      controller: 'DebtFormCtrl'
    }).when('/debts/:type/:guid', {
      templateUrl: '/views/progress/debt/summary.html',
      controller: 'DebtFormCtrl'
    }).when('/my-money', {
      templateUrl: '/views/my-money/overview.html',
      controller: 'MyMoneyOverviewCtrl'
    }).when('/my-money/overview', {
      templateUrl: '/views/my-money/overview.html',
      controller: 'MyMoneyOverviewCtrl'
    }).when('/my-money/income', {
      templateUrl: '/views/my-money/income.html',
      controller: 'MyMoneyOverviewCtrl'
    }).when('/my-money/accounts', {
      templateUrl: '/views/my-money/accounts.html',
      controller: 'MyMoneyOverviewCtrl'
    }).when('/my-money/expenses', {
      templateUrl: '/views/my-money/expenses.html',
      controller: 'MyMoneyExpenseCtrl'
    }).when('/my-money/expensesheet', {
      templateUrl: '/views/my-money/expenses/_expenses_sheet.html',
      controller: 'MyMoneyUpdateExpensesSheetCtrl'
    }).when('/my-money/networth', {
      templateUrl: '/views/my-money/networth.html',
      controller: 'MyMoneyOverviewCtrl'
    }).when('/my-features/scenario', {
      templateUrl: '/views/my-features/scenario.html',
      controller: 'MyFeaturesScenarioCtrl'
    }).when('/my-features/cashfinder', {
      templateUrl: '/views/my-features/cashfinder.html',
      controller: 'MyFeaturesCashFinderCtrl'
    }).when('/my-features/canibuy', {
      templateUrl: '/views/my-features/canibuy.html',
      controller: 'MyFeaturesCanIBuyCtrl'
    }).when('/complete-my-profile', {
      templateUrl: '/views/complete-my-profile.html',
      controller: 'CompleteMyProfileCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  });

  app.config(function(AuthProvider, AuthInterceptProvider, $provide, ENV) {
    _.mixin(s.exports());
    AuthProvider.loginPath(ENV.apiHost + "/users/sign_in.json");
    AuthProvider.logoutPath(ENV.apiHost + "/users/sign_out.json");
    AuthProvider.registerPath(ENV.apiHost + "/users.json");
    AuthInterceptProvider.interceptAuth(true);
    return $provide.decorator('$exceptionHandler', function($delegate, $window) {
      return function(exception, cause) {
        if ($window.trackJs) {
          $window.trackJs.track(exception);
        }
        $delegate(exception, cause);
      };
    });
  });

  app.run(function ($http, $rootScope, $location, $window, Auth, $mdToast) {
    $rootScope.alerts = [];
    $rootScope.shortageAlert = { id: '' };

    $rootScope.$on('alert', function (event, data) {
      //
      $rootScope.alerts.push(data);
      if (data.msg != "")
        $mdToast.show($mdToast.simple().textContent(data.msg).position('bottom right').hideDelay(5000));


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
    return $rootScope.$on('screen:undim', function() {
      return angular.element('.screen-dim').remove();
    });


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


}).call(this);

//# sourceMappingURL=app.js.map
