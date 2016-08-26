(function() {
  'use strict';
  angular.module('agera').directive('currencyInput', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$parsers.push(function(inputValue) {
          var decPart, decimalSplit, inputVal, intDiv, intPart, lastComma, outputVal, point, res;
          if (inputValue == null) {
            return '';
          }
          inputVal = inputValue;
          while (inputVal.charAt(0) === '0' && inputVal.length !== 1) {
            inputVal = inputVal.substr(1);
          }
          inputVal = inputVal.replace(/[^\d.\',']/g, '');
          point = inputVal.indexOf('.');
          if (point >= 0) {
            inputVal = inputVal.slice(0, point + 3);
          }
          decimalSplit = inputVal.split('.');
          intPart = decimalSplit[0];
          decPart = decimalSplit[1];
          intPart = intPart.replace(/[^\d]/g, '');
          outputVal = parseInt(intPart, 10);
          if (intPart.length > 3) {
            intDiv = Math.floor(intPart.length / 3);
            while (intDiv > 0) {
              lastComma = intPart.indexOf(',');
              if (lastComma < 0) {
                lastComma = intPart.length;
              }
              if (lastComma - 3 > 0) {
                intPart = intPart.slice(0, lastComma - 3) + ',' + intPart.slice(lastComma - 3);
              }
              intDiv--;
            }
          }
          if (decPart == null) {
            decPart = '';
          } else {
            decPart = '.' + decPart;
          }
          res = intPart + decPart;
          if (res !== inputValue) {
            ctrl.$setViewValue(res);
            ctrl.$render();
          }
          return outputVal;
        });
        return ctrl.$formatters.push(function(value) {
          var decPart, decimalSplit, intDiv, intPart, lastComma;
          if (isNaN(value) || (value == null)) {
            return '';
          }
          value = '' + value;
          decimalSplit = value.split('.');
          intPart = decimalSplit[0];
          decPart = decimalSplit[1];
          if (intPart.length > 3) {
            intDiv = Math.floor(value.length / 3);
            while (intDiv > 0) {
              lastComma = intPart.indexOf(',');
              if (lastComma < 0) {
                lastComma = intPart.length;
              }
              if (lastComma - 3 > 0) {
                intPart = intPart.slice(0, lastComma - 3) + ',' + intPart.slice(lastComma - 3);
              }
              intDiv--;
            }
          }
          if (decPart == null) {
            decPart = '';
          } else {
            if (decPart.length === 1) {
              decPart = decPart + '0';
            }
            decPart = '.' + decPart;
          }
          value = intPart + decPart;
          return value;
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=currency-input.js.map
