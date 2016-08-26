(function() {
  'use strict';
  angular.module('agera').controller('SettingsCtrl', function($scope, $rootScope, $location, $modal, Auth, User) {
    var ModalInstanceCtrl, masterData;
    masterData = {};
    Auth.currentUser().then(function(data) {
      $scope.user = data;
      return masterData = data;
    });
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        return User.update($scope.user).$promise.then(function(data) {
          $scope.user.password = null;
          $scope.user.password_confirmation = null;
          $scope.user.current_password = null;
          return $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'Your settings were updated successfully.'
          });
        }, function(error) {
          $scope.errors = error.data.errors;
          return $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error updating your settings.'
          });
        })["finally"](function() {
          return $scope.submitted = false;
        });
      }
    };
    $scope.openModal = function() {
      var modalInstance;
      $rootScope.savable = false;
      return modalInstance = $modal.open({
        templateUrl: 'cancelAccountModal',
        controller: ModalInstanceCtrl,
        resolve: {
          items: function() {}
        }
      });
    };
    ModalInstanceCtrl = [
      '$scope', '$rootScope', '$modalInstance', '$location', 'User', function($scope, $rootScope, $modalInstance, $location, User) {
        $scope.close = function() {
          return $modalInstance.dismiss('cancel');
        };
        return $scope.deleteAccount = function() {
          return User["delete"]($scope.user).$promise.then(function() {
            $modalInstance.close();
            return Auth.logout().then(function() {
              $rootScope.currentUser = null;
              return $location.path('/login');
            });
          });
        };
      }
    ];
    return $scope.cancel = function() {
      return $scope.user = angular.copy(masterData);
    };
  });

}).call(this);

//# sourceMappingURL=settings.js.map
