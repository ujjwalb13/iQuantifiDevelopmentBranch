(function() {
  'use strict';
  angular.module('agera').controller('FeedbackCtrl', function($http, $scope, $rootScope, $location, ENV) {
    var defaultMessage;
    defaultMessage = {
      subject: 'Customer Feedback',
      message: ''
    };
    $scope.feedback = angular.copy(defaultMessage);
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        return $http.post(ENV.apiHost + "/feedback", $scope.feedback).then(function() {
          return $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'Thank you for your feedback!'
          });
        })["finally"](function() {
          return $scope.processing = false;
        });
      }
    };
    return $scope.cancel = function() {
      return $scope.feedback = angular.copy(defaultMessage);
    };
  });

}).call(this);

//# sourceMappingURL=feedback.js.map
