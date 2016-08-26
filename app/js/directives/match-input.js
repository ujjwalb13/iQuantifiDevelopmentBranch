(function() {
  'use strict';
  angular.module('agera').directive('matchInput', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        match: '=matchInput'
      },
      link: function(scope, element, attrs, ctrl) {
        return scope.$watch((function() {
          return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.match === ctrl.$modelValue;
        }), function(currentValue) {
          return ctrl.$setValidity('match', currentValue);
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=match-input.js.map
