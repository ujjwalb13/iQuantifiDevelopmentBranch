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

dependencies = ['ngAnimate', 'ngMessages', 'ngRoute', 'ngResource', 'ngSanitize', 'ngTouch', 'ngMaterial', 'ui.bootstrap', 'ui.utils', 'ui.slider', 'Devise', 'angulartics.google.tagmanager', 'emguo.poller', 'slick', 'matchmedia-ng', 'newrelic-timing', 'actions', 'admin', 'aggregation', 'goals', 'onboard', 'summaries', 'timeline', 'config', 'onboard-nav', 'experience-picker', 'profile-sidebar', 'money-sidebar', 'feature-sidebar', 'mgo-angular-wizard', 'progress', 'myMoney', 'toaster',
  'progress-sidebar'];

app = angular.module('agera', dependencies);
