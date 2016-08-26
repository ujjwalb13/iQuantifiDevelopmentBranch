(function() {
  'use strict';
  angular.module('onboard').factory('welcomeTextService', function() {
    return {
      account: function() {
        return {
          header: "Making it easy...",
          answer: "Sound advice begins with where you truly are in your financial life, and that means taking a look at the current status of your accounts."
        };
      },
      expense: function() {
        return {
          header: "Almost There!",
          answer: "Knowing your expenses is critical in helping to prioritize what steps you need to take to improve your finances and keep you in good financial standing. DO NOT include debts in this section as a debt is a different type of expense that involves other factors such as interest rate, terms, etc. This information will be collected as you complete your profile."
        };
      },
      income: function() {
        return {
          header: "Keep Going!",
          answer: "Your household income is a big part of your current picture and resources.  Your income is used to determine your monthly cash flow and the resources you have available to apply toward your goals."
        };
      }
    };
  });

}).call(this);

//# sourceMappingURL=welcome_text.js.map
