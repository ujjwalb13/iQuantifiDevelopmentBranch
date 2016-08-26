(function() {
  'use strict';
  angular.module('admin').controller('OrganizationsCtrl', function($scope, $location, Organization) {
    $scope.organizations = Organization.query();
    return $scope.goToOrganizationEdit = function(guid) {
      return $location.path("/admin/organizations/" + guid);
    };
  });

  angular.module('admin').controller('OrganizationFormCtrl', function($scope, $rootScope, $routeParams, $location, Organization, Product, ENV) {
    var organizationGuid;
    organizationGuid = $routeParams.organizationId;
    if (organizationGuid) {
      Organization.get({
        guid: organizationGuid
      }).$promise.then(function(data) {
        $scope.organization = data;
        return $scope.products = Product.query({
          organization_guid: $scope.organization.guid
        });
      });
    } else {
      $scope.organization = new Organization();
    }
    $scope.submit = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $scope.processing = true;
        return $scope.organization.$save().then(function(result) {
          $rootScope.$broadcast('alert', {
            type: 'success',
            msg: 'The organization was saved successfully.'
          });
          return $location.path('/admin/organizations');
        }, function(err) {
          $rootScope.$broadcast('alert', {
            type: 'danger',
            msg: 'There was an error saving the organization.'
          });
          return $scope.errors = err.data.errors;
        })["finally"](function() {
          return $scope.processing = false;
        });
      }
    };
    return $scope.goToProductEdit = function(id) {
      organizationGuid = $routeParams.organizationId;
      return $location.path("/admin/organizations/" + organizationGuid + "/products/" + id);
    };
  });

  angular.module('admin').controller('ProductFormCtrl', function($scope, $rootScope, $routeParams, $location, Organization, Product, ENV) {
    var id;
    id = $routeParams.id;
    $scope.organizationGuid = $routeParams.organizationId;
    if (id) {
      $scope.product = Product.get({
        id: id
      });
    } else {
      $scope.product = new Product();
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
          $scope.product.organization_id = organization.id;
          return $scope.product.$save().then(function(result) {
            $rootScope.$broadcast('alert', {
              type: 'success',
              msg: 'The product was saved successfully.'
            });
            return $location.path("/admin/organizations/" + $scope.organizationGuid);
          }, function(err) {
            $rootScope.$broadcast('alert', {
              type: 'danger',
              msg: 'There was an error saving the product.'
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

//# sourceMappingURL=organizations.js.map
