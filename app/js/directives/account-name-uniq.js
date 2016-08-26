(function() {
  'use strict';
  angular.module('agera').directive('accountNameUniq', function(Account) {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, elm, attrs, ctrl) {
        var existingAccounts, originalValue;
        existingAccounts = Account.query();
        originalValue = null;
        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
          if (originalValue) {
            return;
          }
          if (!oldValue) {
            return originalValue = newValue;
          }
        });
        return ctrl.$validators.accountNameUniq = function(modelValue, viewValue) {
          var found;
          if (!modelValue) {
            return false;
          }
          if (modelValue === originalValue) {
            return true;
          }
          found = _.find(existingAccounts, function(account) {
            return account.name === viewValue;
          });
          return !found;
        };
      }
    };
  });

}).call(this);

//# sourceMappingURL=account-name-uniq.js.map
