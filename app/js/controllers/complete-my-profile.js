'use strict';
angular.module('agera').controller('CompleteMyProfileCtrl', ['$scope', 'ProfileItem', '$location',
  function($scope, ProfileItem, $location) {
  var fetchProfileComplete, getItemPath;

  fetchProfileComplete = function() {
    ProfileItem.query().$promise.then(function(response){
      $scope.completionPercentage = response.completionPercentage;
      $scope.profileItems = []
      _.each(response.profileItems, function(item){
        if(!item.notRequired)
          $scope.profileItems.push(new ProfileItem(item))
      });
    });
  }


  getItemPath = function(item) {
    switch(item.itemName) {
      case 'Policies':
        return '/progress/protection';
      case 'Debts':
        return '/progress/debt';
      case 'Accounts':
        return '/my-money';
      case 'Expenses':
        return '/expenses';
      case 'College':
        return '/goals/colleges/' + item.goalId  + '/edit';
      case 'Retirement':
        return '/goals/retirements/' + item.goalId + '/edit';
    }
  }

  $scope.reviewAction = function(item) {
    item.isCompleted = true
    item.CompletedDate = new Date();
    item.$update().then(
      function() {
        $location.path(getItemPath(item))
      }, function() {
        item.isCompleted = false;
      }
    );
  }

  $scope.doItLater = function() {
    $location.path('/');
  }

  $scope.actionIcon = function(name) {
    switch(name) {
      case 'Policies':
        return 'icon-pt-protection';
      case 'Debts':
        return 'icon icon-db-debt';
      case 'Accounts':
        return 'icon-mm-accounts';
      case 'Expenses':
        return 'icon-mm-expenses';
      case 'College':
        return 'icon-gl-college';
      case 'Retirement':
        return 'icon-gl-retirement';
    }
    return ''
  }

  fetchProfileComplete();

}]);
