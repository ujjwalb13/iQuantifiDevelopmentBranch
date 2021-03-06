(function() {
  'use strict';
  angular.module('progress').controller('MyAchievementsCtrl', function($scope, $location, $routeParams, MyAchievements, $modal, $filter) {
    var ModalInstanceCtrl;
    var protectionType = function(protection){
      var type = protection.type.toLowerCase();
      if (type === "reserve") {
        return protection.kind.toLowerCase();
      }
      return type;
    };

    var buildItemInfo = function(item) {
      return {
        name: item.name,
        amount: item.amount,
        date: item.completed_date,
        guid: item.guid
      }
    }

    var buildGoalInfo = function(item) {
      var goalInfo = {
        icon: $filter('goalIconClass')(item.type) ,
        cgrIcon: "icon-goals-cgr" ,
        completedActionsModalTile: "Goal Achieved"
      };
      return _.extend(buildItemInfo(item), goalInfo);
    }

    var buildDebtInfo = function(item) {
      var debtInfo = {
        icon: $filter('debtIconClass')(item.kind),
        cgrIcon: "icon-debt-cgr",
        completedActionsModalTile: "Debt Paid-off"
      };
      return _.extend(buildItemInfo(item), debtInfo);
    }

    var buildProtectionInfo = function(item) {
      var protectionInfo = {
        icon: $filter('protectionIconClass')(protectionType(item)),
        cgrIcon: "icon-protect-cgr",
        completedActionsModalTile: "Policy In-place"
      };
      return _.extend(buildItemInfo(item), protectionInfo);
    }

    MyAchievements.get().$promise.then(function(data) {
      var sections = data.Sections;
      var goalsSection = _.find(sections, function(item) {
        return item.SectionType.toLowerCase() === "goal";
      });

      if (_.isObject(goalsSection)) {
        $scope.goalsSection = {
          name: goalsSection.SectionName,
          items:  _.map(goalsSection.Goals, function(item) {
            return buildGoalInfo(item);
          })
        };
      }

      var debtsSection = _.find(sections, function(item) {
        return item.SectionType.toLowerCase() === "debt";
      });

      if (_.isObject(debtsSection)) {
        $scope.debtsSection = {
          name: debtsSection.SectionName,
          items:  _.map(debtsSection.Goals, function(item) {
            return buildDebtInfo(item);
          })
        };
      }

      var protectionsSection = _.find(sections, function(item) {
        return item.SectionType.toLowerCase() === "protection";
      });

      if (_.isObject(protectionsSection)) {
        $scope.protectionsSection = {
          name: protectionsSection.SectionName,
          items:  _.map(protectionsSection.Goals, function(item) {
            return buildProtectionInfo(item);
          })
        };
      }

    });

    $scope.openCompletedActions = function(item) {
      $modal.open({
        templateUrl: 'completedActionsModal',
        size: 'lg',
        controller: ModalInstanceCtrl,
        backdrop: 'static',
        resolve: {
          item: function() {
            return item;
          }
        }
      });
    }

    ModalInstanceCtrl = [
      '$scope', 'item', '$modalInstance', 'ENV', '$http', function($scope, item, $modalInstance, ENV, $http) {
        $scope.item = item;

        $http.get(ENV.apiHost + "/plan/achievements/" + $scope.item.guid).
          success(function (results) {
            $scope.completedActions = _.map(results, function(action) {
              return { description: action.description, date: action.assigned_on };
            })
          });
        $scope.close = function() {
          $modalInstance.dismiss('cancel');
        }
      }
    ];
  });
}).call(this);

//# sourceMappingURL=overview.js.map
