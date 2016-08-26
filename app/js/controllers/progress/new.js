(function() {
  'use strict';
  angular.module('progress').controller('ProgressNewCtrl', function($scope, $routeParams) {
    var hyphenateType;
    $scope.goalTypes = ['baby', 'car', 'college', 'house', 'relocation', 'rent', 'ring', 'travel', 'wedding'];
    $scope.debtTypes = ['credit_card', 'mortgage', 'student_loan', 'car', 'heloc', 'line_of_credit'];
    $scope.protectionTypes = ['life', 'disability', 'care'];
    $scope.heading = function(type) {
      switch (type) {
        case 'heloc':
          return 'Home Equity Line Of Credit';
        case 'life':
          return 'Life';
        case 'disability':
          return 'Disability';
        case 'care':
          return 'Long Term Care';
        default:
          return type;
      }
    };
    $scope.iconPath = function(type) {
      if ($routeParams.type === 'goal') {
        return "/images/ignore/" + type + "On.svg";
      } else if ($routeParams.type === 'debt') {
        return "/images/ignore/debtOn.svg";
      } else if ($routeParams.type === 'protection' && type === 'life') {
        return "/images/svg/protection-lp-lb.svg";
      } else if ($routeParams.type === 'protection' && type === 'disability') {
        return "/images/svg/protection-dp-lb.svg";
      } else if ($routeParams.type === 'protection' && type === 'care') {
        return "/images/svg/protection-ltc-lb.svg";
      } else {
        return "/images/ignore/" + type + "On.svg";
      }
    };
    $scope.newPath = function(type) {
      return "/#/progress/" + $scope.category + "/" + (_.pluralize(type.toLowerCase())) + "/new";
    };
    $scope.singularize = function(type) {
      return "" + (_.singularize(type.replace('_', ' ')));
    };
    $scope.category = null;
    if ($routeParams.type != null) {
      if ($routeParams.type === 'goal' || $routeParams.category === 'goal') {
        $scope.category = 'goal';
        $scope.typesArray = $scope.goalTypes;
      } else if ($routeParams.type === 'debt' || $routeParams.category === 'debt') {
        $scope.category = 'debt';
        $scope.typesArray = $scope.debtTypes;
      } else {
        $scope.category = 'protection';
        $scope.typesArray = $scope.protectionTypes;
      }
      $scope.type = $routeParams.type;
      hyphenateType = _.trim(_.dasherize(_.singularize($scope.type)), '-');
      return $scope.items = [hyphenateType, 'New', $scope.category];
    }
  });

}).call(this);

//# sourceMappingURL=new.js.map
