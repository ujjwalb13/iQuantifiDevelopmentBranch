(function() {
  'use strict';
  angular.module('agera').controller('LoginCtrl', function($scope, $rootScope, Auth, $location) {
    if (Auth.isAuthenticated()) {
      $location.path('/');
    }
    $scope.processing = false;
    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      return deferred.reject(xhr);
    });
    return $scope.submit = function(isValid) {
      $scope.submitted = true;
      $scope.processing = true;
      return Auth.login($scope.user).then(function(user) {
        return $location.path('/');
      }, function(error) {
        $scope.processing = false;
        return $scope.error = error.data;
      });
    };
  });

  angular.module('agera').controller('RegisterCtrl', function($scope, $rootScope, Auth, $location) {
    var params;
    if (Auth.isAuthenticated()) {
      $location.path('/');
    }
    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      return deferred.reject(xhr);
    });
    params = $location.search();
    return $scope.submit = function(isValid) {
      $scope.submitted = true;
      $scope.user.voucher_code = params.voucher;
      return Auth.register($scope.user).then(function() {
        return $location.path('/');
      }, function(error) {
        return $scope.error = error.data;
      });
    };
  });

  angular.module('agera').controller('ForgotPasswordCtrl', function($scope, $http, ENV) {
    return $scope.submit = function(isValid) {
      $scope.submitted = true;
      return $http.post(ENV.apiHost + "/users/password", {
        user: $scope.user
      }).then(function() {
        return $scope.success = true;
      }, function(error) {
        return $scope.error = error.data;
      });
    };
  });

  angular.module('agera').controller('ChangePasswordCtrl', function($scope, $http, $location, ENV) {
    var params;
    params = $location.search();
    if ($scope.user == null) {
      $scope.user = {};
    }
    $scope.user.reset_password_token = params.token;
    return $scope.submit = function(isValid) {
      $scope.submitted = true;
      return $http.put(ENV.apiHost + "/users/password", {
        user: $scope.user
      }).then(function() {
        return $scope.success = true;
      }, function(error) {
        return $scope.error = error.data;
      });
    };
  });

  angular.module('agera').controller('UnlockCtrl', function($scope, $rootScope, $http, $location, ENV) {
    var params, token;
    params = $location.search();
    token = params.token;
    if (token) {
      $http.get(ENV.apiHost + "/users/unlock?unlock_token=" + token).then(function() {
        $location.path('/');
        return $rootScope.$broadcast('alert', {
          type: 'success',
          msg: 'Your account has been unlocked successfully. Please sign in to continue.'
        });
      }, function(error) {
        return $scope.error = error.data;
      });
    }
    return $scope.submit = function(isValid) {
      $scope.submitted = true;
      return $http.post(ENV.apiHost + "/users/unlock", {
        user: $scope.user
      }).then(function() {
        return $scope.success = true;
      }, function(error) {
        return $scope.error = error.data;
      });
    };
  });

  angular.module('agera').controller('ConfirmationCtrl', function($scope, $rootScope, $http, $location, ENV) {
    var params, token;
    params = $location.search();
    token = params.token;
    if (token) {
      $http.get(ENV.apiHost + "/users/confirmation?confirmation_token=" + token).then(function() {
        $location.path('/');
        return $rootScope.$broadcast('alert', {
          type: 'success',
          msg: 'Your email address has been successfully confirmed.'
        });
      }, function(error) {
        return $scope.error = error.data;
      });
    }
    return $scope.submit = function(isValid) {
      $scope.submitted = true;
      return $http.post(ENV.apiHost + "/users/confirmation", {
        user: $scope.user
      }).then(function() {
        return $scope.success = true;
      }, function(error) {
        return $scope.error = error.data;
      });
    };
  });

  angular.module('agera').controller('TwoFactorAuthCtrl', function($scope, $rootScope, $http, $location, Auth, ENV) {
    $scope.logout = function() {
      return Auth.logout().then(function(oldUser) {
        $rootScope.$broadcast('clearAlerts');
        return $location.path('/login');
      });
    };
    return $scope.submit = function(isValid) {
      $scope.submitted = true;
      return $http.put(ENV.apiHost + "/users/two_factor_authentication", {
        code: $scope.code,
        remember: $scope.remember
      }).then(function() {
        $scope.success = true;
        return $location.path('/');
      }, function(error) {
        return $scope.error = error.data;
      });
    };
  });

}).call(this);

//# sourceMappingURL=auth.js.map
