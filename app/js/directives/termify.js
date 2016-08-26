(function() {
  'use strict';
  angular.module('agera').directive('termify', function($timeout, $compile, $http) {
    return {
      restrict: 'A',
      link: {
        pre: function(scope, element, attrs) {
          return scope.terms = {
            "Index Funds": "Investment fund designed to mirror the returns of a market index like the S&P 500 Composite Index or the Dow Jones Industrial Average.",
            "ETFs": "A fund made up of securities that are on an exchange in the same ratios. Shares are like stocks and ETFs provide an easy way to diversify a portfolio.",
            "Mutual Funds": "Mutual funds are pools of money of multiple investors that are managed by an investment company.",
            "Stocks": "Represents an ownership stake in a corporation entitling the shareholder to receive profits of the corporation in the form of a dividend.",
            "Bonds": "A debt issued by a corporation, municipality or a government for a period of more than one year.  When an investor buys a bond, he or she is lending money. The seller agrees to repay the principal amount at a specified time.",
            "Cash Reserve": "Money earmarked for short term emergencies or opportunities.",
            "Money Market": "An account that pays according to the current interest rates in the money markets.",
            "Brokerage": "An account at a firm that buys and sells stocks and bonds for clients.",
            "529 Plan": "A college savings account for university related expenses. The funds are tax deferred, and tax exempt if used directly to pay for college.",
            "Roth IRA": "A retirement account for employees where the contributions are not tax dedutible, but withdrawals are tax-free. There is a limit to annual contributions that changes according to inflation.",
            "SEP IRA": "Simplified Employee Pension Plan designed for the self-employed and their employees. It works similar to an IRA, except the employer makes all the contributions (which are tax deductible to the employer) and the employee makes tax-free withdrawals at retirement.",
            "Simple IRA": "Savings Incentive Match Plan for Employees of Small Employers is a salary deduction plan for retirement benefits provided by some small companies.",
            "IRA": "For employed individuals, a retirement account where contributions are tax deductible and gains in the account are tax-deferred.",
            "401k/403b": "A retirement investment plan where an employee contributes pre-tax income into the account. It is tax-deferred until withdrawals which are generally after retirement.",
            "Future Value": "The value an invested amount of money with compound interest will have at a future date.",
            "Inflation": "A rise in prices and an increase in the volume of money and credit that devalues currency.",
            "Net Proceeds": "The money left after all commissions, fees, and related expenses are paid.",
            "Security Deposit": "Money required to be paid to a landlord or service provider to protect them from possible default.",
            "Interest Rate": "The rate a borrower must pay over a specific time period for a loan (usually on an annual basis).",
            "Origination Date": "The initial date the loan was made.",
            "Current Balance": "The amount of money currently owed.",
            "Shortage": "A lack of necessary funds to accomplish your goals.",
            "Tax Withholding": "The amount of income tax withheld on wages based on the exemptions claimed by an employee.",
            "Monthly Benefit": "The amount payable to the beneficiary on a monthly basis.",
            "Benefit": "The amount that is payable to the beneficiary if a policy or pension is enacted.",
            "Own Occupation": "A disability insurance policy that covers an individual in case they are unable to perform their occupational duties.  The individual must be employed when the disability occurs.",
            "Term Life": "A life insurance policy with a set duration limit on the coverage period.",
            "180 Day Wait": "The time which must pass after filing a claim before a policyholder can collect insurance benefits. Also known as 'waiting period.'"
          };
        },
        post: function(scope, element, attrs) {
          return $timeout(function() {
            var html, i, len, ref, term, termR;
            html = element.html();
            ref = _.keys(scope.terms);
            for (i = 0, len = ref.length; i < len; i++) {
              term = ref[i];
              termR = new RegExp(term + "(?![^<]*</u>)", 'i');
              html = html.replace(termR, "<u tooltip=\"" + scope.terms[term] + "\">" + term + "</u>");
            }
            element.html(html);
            return $compile(element.contents())(scope);
          }, 100);
        }
      }
    };
  });

}).call(this);

//# sourceMappingURL=termify.js.map
