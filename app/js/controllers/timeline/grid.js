(function() {
  'use strict';
  angular.module('timeline').controller('GridCtrl', function($scope, Scenario) {
    var columnsAdded, counter;
    $scope.gridOptions = {
      enableFiltering: false,
      flatEntityAccess: true,
      showGridFooter: true,
      fastWatch: false,
      enableColumnMenus: false
    };
    $scope.gridOptions.columnDefs = [
      {
        name: 'class',
        width: 200,
        enableSorting: false,
        pinnedLeft: true
      }, {
        name: 'name',
        width: 200,
        enableSorting: false,
        pinnedLeft: true
      }, {
        name: 'allocation',
        width: 100,
        enableSorting: false
      }
    ];
    columnsAdded = false;
    counter = 1;
    return Scenario.amortization().$promise.then(function(response) {
      if (!columnsAdded) {
        angular.forEach(response[0], function(val, key) {
          var col_name;
          if (_.startsWith(key, 'm:')) {
            col_name = counter + " [" + (key.replace('m:', '')) + "]";
            $scope.gridOptions.columnDefs.push({
              name: col_name,
              field: key,
              width: 125,
              enableSorting: false
            });
            return counter++;
          }
        });
        columnsAdded = true;
      }
      return $scope.gridOptions.data = response;
    });
  });

}).call(this);

//# sourceMappingURL=grid.js.map
