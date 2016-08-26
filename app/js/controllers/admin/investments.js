(function() {
  'use strict';
  angular.module('admin').controller('InvestmentCtrl', function($scope, $rootScope, $routeParams, $location, InvestmentType) {
    var organizationGuid;
    $scope.organizationGuid = $routeParams.organizationId;
    organizationGuid = $routeParams.organizationId;
    $scope.investments = InvestmentType.query({
      organization_guid: organizationGuid
    });
    return $scope.goToEdit = function(id) {
      return $location.path("/admin/organizations/" + organizationGuid + "/investments/" + id);
    };
  });

  angular.module('admin').controller('InvestmentFormCtrl', function($scope, $rootScope, $routeParams, $location, Organization, InvestmentType, ENV) {
    var id, organizationGuid;
    organizationGuid = $routeParams.organizationId;
    id = $routeParams.id;
    $scope.kinds = InvestmentType.kinds;
    $scope.asset_classes = InvestmentType.asset_classes;
    $scope.organizationGuid = organizationGuid;
    if (id) {
      $scope.investment = InvestmentType.get({
        id: id
      });
    } else {
      $scope.investment = new InvestmentType();
      $scope.investment.recommended = true;
    }
    return $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        return Organization.get({
          guid: $scope.organizationGuid
        }).$promise.then(function(data) {
          var organization;
          organization = data;
          $scope.investment.organization_id = organization.id;
          return $scope.investment.$save().then(function(result) {
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: 'The investment type was saved successfully.'
            });
            return $location.path("/admin/organizations/" + organizationGuid + "/investments");
          }, function(err) {
            $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: 'There was an error saving the investment type.'
            });
            return $scope.errors = err.data.errors;
          })["finally"](function() {
            return $scope.processing = false;
          });
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=investments.js.map
