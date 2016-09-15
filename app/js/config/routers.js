'use strict';

angular.module('agera').config(function($routeProvider) {
  return $routeProvider

  .when('/', {
    templateUrl: '/views/timeline/dashboard.html',
    controller: 'TimelineDashboardCtrl'
  })

  .when('/actions', {
    templateUrl: '/views/actions/action-list.html',
    controller: 'ActionListCtrl'
  })

  .when('/actions/:actionId', {
    templateUrl: '/views/actions/action-detail.html',
    controller: 'ActionDetailCtrl'
  })

  .when('/actions/:actionId/open', {
    templateUrl: '/views/actions/open-action.html',
    controller: 'OpenActionCtrl'
  })

  .when('/add-goal', {
    templateUrl: '/views/timeline/add-goal.html',
    controller: 'AddGoalCtrl'
  })

  .when('/add-protection', {
    templateUrl: '/views/progress/protection/add-protection.html',
    controller: 'AddProtectionCtrl'
  })

  .when('/admin', {
    templateUrl: '/views/admin/main.html',
    controller: 'AdminCtrl'
  })

  .when('/admin/grid', {
    templateUrl: '/views/admin/grid.html',
    controller: 'GridCtrl'
  })

  .when('/admin/organizations', {
    templateUrl: '/views/admin/organizations.html',
    controller: 'OrganizationsCtrl'
  })

  .when('/admin/organizations/new', {
    templateUrl: '/views/admin/organization-form.html',
    controller: 'OrganizationFormCtrl'
  })

  .when('/admin/organizations/:organizationId', {
    templateUrl: '/views/admin/organization-form.html',
    controller: 'OrganizationFormCtrl'
  })

  .when('/admin/organizations/:organizationId/investments', {
    templateUrl: '/views/admin/investments.html',
    controller: 'InvestmentCtrl'
  })

  .when('/admin/organizations/:organizationId/investments/new', {
    templateUrl: '/views/admin/investment-form.html',
    controller: 'InvestmentFormCtrl'
  })

  .when('/admin/organizations/:organizationId/investments/:id', {
    templateUrl: '/views/admin/investment-form.html',
    controller: 'InvestmentFormCtrl'
  })

  .when('/admin/organizations/:organizationId/products/new', {
    templateUrl: '/views/admin/product-form.html',
    controller: 'ProductFormCtrl'
  })

  .when('/admin/organizations/:organizationId/products/:id', {
    templateUrl: '/views/admin/product-form.html',
    controller: 'ProductFormCtrl'
  })

  .when('/admin/demo', {
    templateUrl: '/views/admin/demo.html',
    controller: 'DemoCtrl'
  })

  .when('/alt-register', {
    redirectTo: '/#/login'
  })

  .when('/alt-reg-affiliate', {
    redirectTo: '/#/login'
  })

  .when('/alt-reg-amiti', {
    redirectTo: '/#/login'
  })

  .when('/alt-reg-ds', {
    redirectTo: '/#/login'
  })

  .when('/alt-reg-fr', {
    redirectTo: '/#/login'
  })

  .when('/alt-reg-ij', {
    redirectTo: '/#/login'
  })

  .when('/can-i-buy', {
    templateUrl: '/views/can-i-buy.html',
    controller: 'CanIBuyCtrl'
  })

  .when('/cashfinder', {
    templateUrl: '/views/cashfinder.html',
    controller: 'CashfinderCtrl'
  })

  .when('/cashfinder/:id', {
    templateUrl: '/views/cashfinder-edit.html',
    controller: 'CashfinderEditCtrl'
  })

  .when('/change-password', {
    templateUrl: '/views/change-password.html',
    controller: 'ChangePasswordCtrl',
    setupRequired: false,
    loginRequired: false
  })

  .when('/confirmation', {
    templateUrl: '/views/confirmation.html',
    controller: 'ConfirmationCtrl',
    setupRequired: false,
    loginRequired: false
  })

  .when('/expenses', {
    templateUrl: '/views/dropdown/expenses.html',
    controller: 'ExpensesCtrl'
  })

  .when('/experience', {
    templateUrl: '/views/dropdown/experience.html',
    controller: 'ExperienceCtrl',
    resolve: {
      onboarding: function() {
        return false;
      }
    }
  })

  .when('/permissions', {
    templateUrl: '/views/dropdown/permissions.html',
    controller: 'PermissionsCtrl'
  })

  .when('/feedback', {
    templateUrl: '/views/feedback.html',
    controller: 'FeedbackCtrl'
  })

  .when('/forgot-password', {
    templateUrl: '/views/forgot-password.html',
    controller: 'ForgotPasswordCtrl',
    setupRequired: false,
    loginRequired: false
  })

  .when('/institutions/:institutionId', {
    templateUrl: '/views/aggregation/select-accounts.html',
    controller: 'SelectAccountsCtrl',
    resolve: {
      onboarding: function() {
        return false;
      }
    }
  })

  .when('/login', {
    templateUrl: '/views/login.html',
    controller: 'LoginCtrl',
    setupRequired: false,
    loginRequired: false
  })

  .when('/onboard/accounts/link-or-manual', {
    templateUrl: '/views/onboard/link-or-manual.html',
    controller: 'onboardAccountCtrl',
    setupRequired: false
  })

  .when('/onboard/accounts', {
    templateUrl: '/views/onboard/accounts.html',
    controller: 'onboardAccountCtrl',
    setupRequired: false
  })

  .when('/onboard/accounts/link/:guid/:name', {
    templateUrl: '/views/onboard/link-account.html',
    controller: 'OnboardLinkAccountCtrl',
    resolve: {
      onboarding: function() {
        return true;
      }
    },
    setupRequired: false
  })

  .when('/onboard/accounts/new', {
    templateUrl: '/views/onboard/account-form.html',
    controller: 'onboardAccountNewCtrl',
    setupRequired: false
  })

  .when('/onboard/accounts/:accountId', {
    templateUrl: '/views/onboard/account-form.html',
    controller: 'onboardAccountEditCtrl',
    setupRequired: false
  })

  .when('/onboard/experience', {
    templateUrl: '/views/onboard/experience.html',
    controller: 'ExperienceCtrl',
    setupRequired: false,
    resolve: {
      onboarding: function() {
        return true;
      }
    }
  })

  .when('/onboard/family', {
    templateUrl: '/views/onboard/family.html',
    controller: 'onboardFamilyCtrl',
    setupRequired: false
  })

  .when('/onboard/goals', {
    templateUrl: '/views/onboard/goals.html',
    controller: 'onboardGoalCtrl'
  })

  .when('/onboard/institutions/:institutionId', {
    templateUrl: '/views/onboard/select-accounts.html',
    controller: 'SelectAccountsCtrl',
    resolve: {
      onboarding: function() {
        return true;
      }
    },
    setupRequired: false
  })

  .when('/onboard/manual-account', {
    templateUrl: '/views/onboard/manual-account.html',
    controller: 'onboardManualAccountCtrl',
    setupRequired: false
  })

  .when('/onboard/manual-expenses', {
    templateUrl: '/views/onboard/manual-expenses.html',
    controller: 'onboardManualExpensesCtrl',
    setupRequired: false
  })

  .when('/onboard/manual-income', {
    templateUrl: '/views/onboard/manual-income.html',
    controller: 'onboardManualIncomeCtrl',
    setupRequired: false
  })

  .when('/people', {
    templateUrl: '/views/dropdown/people.html',
    controller: 'PeopleCtrl'
  })

  .when('/people/new', {
    templateUrl: '/views/dropdown/person-form.html',
    controller: 'PersonFormCtrl'
  })

  .when('/people/:personId', {
    templateUrl: '/views/dropdown/person-form.html',
    controller: 'PersonFormCtrl'
  })

  .when('/policies', {
    templateUrl: '/views/policies/policies.html',
    controller: 'PoliciesCtrl'
  })

  .when('/policies/disability/new', {
    templateUrl: '/views/progress/protection/disability-policy-form.html',
    controller: 'DisabilityPolicyFormCtrl'
  })

  .when('/policies/disability/:policyId', {
    templateUrl: '/views/progress/protection/disability-policy-form.html',
    controller: 'DisabilityPolicyFormCtrl'
  })

  .when('/policies/life/new', {
    templateUrl: '/views/progress/protection/life-policy-form.html',
    controller: 'LifePolicyFormCtrl'
  })

  .when('/policies/life/:policyId', {
    templateUrl: '/views/progress/protection/life-policy-form.html',
    controller: 'LifePolicyFormCtrl'
  })

  .when('/policies/care/new', {
    templateUrl: '/views/progress/protection/care-policy-form.html',
    controller: 'CarePolicyFormCtrl'
  })

  .when('/policies/care/:policyId', {
    templateUrl: '/views/progress/protection/care-policy-form.html',
    controller: 'CarePolicyFormCtrl'
  })

  .when('/settings', {
    templateUrl: '/views/dropdown/settings.html',
    controller: 'SettingsCtrl',
    setupRequired: false
  })

  .when('/summaries/policies/:type', {
    templateUrl: '/views/summaries/policy.html',
    controller: 'summariesPolicyCtrl'
  })
  .when('/summaries/houses/:guid', {
    templateUrl: '/views/summaries/house-summary.html',
    controller: 'houseSummaryCtrl'
  })
  .when('/summaries/cars/:guid', {
    templateUrl: '/views/summaries/finance-summary.html',
    controller: 'basicSummaryCtrl',
    resolve: {
      summaryService: function (CarSummary) {
        return CarSummary;
      }
    }
  })
  .when('/summaries/babies/:guid', {
    templateUrl: '/views/summaries/basic-summary.html',
    controller: 'basicSummaryCtrl',
    resolve: {
      summaryService: function (BabySummary) {
        return BabySummary;
      }
    }
  })
  .when('/summaries/travels/:guid', {
    templateUrl: '/views/summaries/basic-summary.html',
    controller: 'basicSummaryCtrl',
    resolve: {
      summaryService: function (TravelSummary) {
        return TravelSummary;
      }
    }
  })
  .when('/summaries/purchases/:guid', {
    templateUrl: '/views/summaries/basic-summary.html',
    controller: 'basicSummaryCtrl',
    resolve: {
      summaryService: function (PurchaseSummary) {
        return PurchaseSummary;
      }
    }
  })
  .when('/summaries/weddings/:guid', {
    templateUrl: '/views/summaries/basic-summary.html',
    controller: 'basicSummaryCtrl',
    resolve: {
      summaryService: function (WeddingSummary) {
        return WeddingSummary;
      }
    }
  })
  .when('/summaries/relocations/:guid', {
    templateUrl: '/views/summaries/basic-summary.html',
    controller: 'basicSummaryCtrl',
    resolve: {
      summaryService: function (RelocationSummary) {
        return RelocationSummary;
      }
    }
  })
  .when('/summaries/rings/:guid', {
    templateUrl: '/views/summaries/finance-summary.html',
    controller: 'basicSummaryCtrl',
    resolve: {
      summaryService: function (WeddingSummary) {
        return WeddingSummary;
      }
    }
  })
  .when('/summaries/retirements/:guid', {
    templateUrl: '/views/summaries/retirement-summary.html',
    controller: 'retirementSummaryCtrl'
  })

  .when('/summaries/:type/:guid?', {
    templateUrl: '/views/summaries/summary.html',
    controller: 'summariesSummaryCtrl'
  })

  .when('/two-factor-auth', {
    templateUrl: '/views/two-factor-auth.html',
    controller: 'TwoFactorAuthCtrl',
    setupRequired: false
  })

  .when('/unlock', {
    templateUrl: '/views/unlock.html',
    controller: 'UnlockCtrl',
    setupRequired: false,
    loginRequired: false
  })

  .when('/what-if', {
    templateUrl: '/views/what-if.html',
    controller: 'WhatIfCtrl'
  })

  .when('/faq', {
    templateUrl: '/views/faq.html',
    controller: 'FaqCtrl'
  })

  .when('/dashboard', {
    templateUrl: '/views/demo/dashboard.html',
    controller: 'DashboardCtrl'
  })

  .when('/zlife-insurance', {
    templateUrl: '/views/demo/life-insurance.html'
  })

  .when('/zlife-mortgage', {
    templateUrl: '/views/demo/mortgage.html'
  })

  .when('/progress', {
    templateUrl: '/views/progress/overview.html',
    controller: 'ProgressOverviewCtrl'
  })

  .when('/progress/:type', {
    templateUrl: '/views/progress/overview.html',
    controller: 'ProgressOverviewCtrl'
  })

  .when('/achievements', {
    templateUrl: '/views/progress/my-achievements.html',
    controller: 'MyAchievementsCtrl'
  })

  .when('/goals/:type/new', {
    templateUrl: "/views/timeline/goal-form.html",
    controller: 'GoalFormCtrl',
    resolve: {
      items: function($route) {
        return [$route.current.params.type, "New", "goal", $route.previousObj];
      }
    }
  })

  .when('/goals/:type/:guid/edit', {
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
  })

  .when('/add-debts', {
    templateUrl: '/views/progress/debt/category.html',
    controller: 'DebtCategoryCtrl'
  })

  .when('/debts/:kind/new', {
    templateUrl: '/views/progress/debt/form.html',
    controller: 'DebtFormCtrl'
  })

  .when('/debts/:type/:guid/edit', {
    templateUrl: '/views/progress/debt/form.html',
    controller: 'DebtFormCtrl'
  })

  .when('/debts/:type/:guid', {
    templateUrl: '/views/progress/debt/summary.html',
    controller: 'DebtFormCtrl'
  })

  .when('/my-money', {
    templateUrl: '/views/my-money/overview.html',
    controller: 'MyMoneyOverviewCtrl'
  })

  .when('/my-money/overview', {
    templateUrl: '/views/my-money/overview.html',
    controller: 'MyMoneyOverviewCtrl'
  })

  .when('/my-money/income', {
    templateUrl: '/views/my-money/income.html',
    controller: 'IncomesCtrl'
  })

  .when('/my-money/incomes/new', {
    templateUrl: '/views//my-money/income-form.html',
    controller: 'IncomeFormCtrl'
  })

  .when('/my-money/incomes/:incomeId', {
    templateUrl: '/views/my-money/income-form.html',
    controller: 'IncomeFormCtrl'
  })

  .when('/my-money/accounts', {
    templateUrl: '/views/my-money/accounts.html',
    controller: 'AccountsCtrl'
  })
  .when('/my-money/accounts/new', {
    templateUrl: '/views/my-money/account-form.html',
    controller: 'AccountFormCtrl'
  })
  .when('/my-money/accounts/new/:addmode', {
    templateUrl: '/views/my-money/account-form.html',
    controller: 'AccountFormCtrl'
  })
  .when('/my-money/accounts/link/:sender?', {
    templateUrl: '/views/aggregation/link-account.html',
    controller: 'LinkAccountCtrl',
    resolve: {
      onboarding: function () {
        return false;
      }
    }
  })

  .when('/my-money/accounts/:accountId', {
    templateUrl: '/views/my-money/account-form.html',
    controller: 'AccountFormCtrl'
  })

  .when('/my-money/accounts-summary', {
      templateUrl: '/views/my-money/accounts-summary.html',
      controller: 'AccountsSummaryCtrl'
  })

  .when('/my-money/capitalandcashflow', {
    templateUrl: '/views/my-money/capitalandcashflow.html',
    controller: 'MyMoneyCapitalandCashflowCtrl'
  })

  .when('/my-money/expenses', {
    templateUrl: '/views/my-money/expenses.html',
    controller: 'MyMoneyExpenseCtrl'
  })

  .when('/my-money/expensesheet', {
    templateUrl: '/views/my-money/expenses/_expenses_sheet.html',
    controller: 'MyMoneyUpdateExpensesSheetCtrl'
  })

  .when('/my-money/networth', {
    templateUrl: '/views/my-money/networth.html',
    controller: 'MyMoneyOverviewCtrl'
  })

  .when('/my-features/scenario', {
    templateUrl: '/views/my-features/scenario.html',
    controller: 'MyFeaturesScenarioCtrl'
  })

  .when('/my-features/cashfinder', {
    templateUrl: '/views/my-features/cashfinder.html',
    controller: 'MyFeaturesCashFinderCtrl'
  })

  .when('/my-features/canibuy', {
    templateUrl: '/views/my-features/canibuy.html',
    controller: 'MyFeaturesCanIBuyCtrl'
  })

  .when('/complete-my-profile', {
    templateUrl: '/views/complete-my-profile.html',
    controller: 'CompleteMyProfileCtrl'
  })

  .otherwise({
    redirectTo: '/'
  });
});
