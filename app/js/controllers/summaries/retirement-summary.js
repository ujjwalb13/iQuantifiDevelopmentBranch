(function() {
  'use strict';
  angular.module('summaries').controller('retirementSummaryCtrl', function($scope, $location, $routeParams, Retirement, $q) {

    Retirement.summary({guid: $routeParams.guid}).$promise
    .then(function(data) {
      fetchGoalData(data);
    });

    $scope.goToEdit = function(goal) {
      var editUrl = "/" + (_.pluralize(goal.category)) + "/" + (_.pluralize(goal.goal_type.toLowerCase())) + "/" + goal.guid + "/edit";
      $location.path(editUrl);
    }

    var getNeed = function(current, target) {
      var amt;
      amt = target - current;
      return Math.max(amt, 0);
    };

    var getCurrentPeriod = function(schedule) {
      var i, len, month, ref;
      ref = schedule.data;
      for (i = 0, len = ref.length; i < len; i++) {
        month = ref[i];
        if (moment().startOf('month').isSame(month.date)) {
          return month;
        }
      }
      return {};
    };

    var getPercent = function(current, target) {
      var amt;
      if (!current || !target) {
        return 0;
      }
      amt = Math.round(current / target * 100);
      return getSafePercent(amt);
    };

    var getPercentIncomplete = function(current, target, complete) {
      var amt;
      amt = getPercent(current, target);
      return getSafePercent(Math.min(100 - complete, amt));
    };

    var getSafePercent = function(percent) {
      percent = Math.min(percent, 100);
      return Math.max(percent, 0);
    };

    var getTotalCurrentBalances =  function(data) {
      var accounts = []
      accounts.push(getPrimaryAccounts(data));
      if(data.retirement.spouse != null) {
        accounts.push(getSpouseAccounts(data));
      }
      $scope.totalCurrentBalances = accounts;
    }

    var color = d3.scale.category10();

    var pie = d3.layout.pie()
      .value(function(d) { return d.amount; })
      .sort(null);

    var addExtraAttributes = function(accounts, totalAmount) {
      var pieAccounts = pie(accounts);
      _.each(accounts, function(account, index) {
        account.color = color(pieAccounts[index].data.name);
        account.percentage = Math.round(account.balance * 100.0 / totalAmount);
        account.label = account.name;
        account.amount = account.balance;
      })
    }

    var partitionAccounts = function(accounts) {
      return _.partition(accounts, function(account) { return account.is_qualified == true })
    }

    var filterIncomes = function(incomes) {
      return _.filter(incomes, function(income) { return income.amount > 0 })
    }

    var getPrimaryAccounts = function(data) {
      var primary_account = data.associated_accounts.primary
      var totalAmount = primary_account.total;

      var accounts = primary_account.accounts
      addExtraAttributes(accounts, totalAmount)
      var paritionedAccounts = partitionAccounts(accounts);



      var otherIncomes = data.PrimaryRetirementIncomes;

      return {
        name: data.retirement.person.first_name,
        totalAmount: totalAmount,
        accounts: accounts,
        qualifiedAccounts: paritionedAccounts[0],
        nonQualifiedAccounts: paritionedAccounts[1],
        otherIncomes: otherIncomes,
        show: accounts.length > 0 || otherIncomes.length > 0
      }
    }

    var getSpouseAccounts = function(data) {
      var spouse_account = data.associated_accounts.spouse
      var totalAmount = spouse_account.total;

      var accounts = spouse_account.accounts
      addExtraAttributes(accounts, totalAmount)
      var paritionedAccounts = partitionAccounts(accounts);


      var otherIncomes = data.SpouseRetirementIncomes;

      return {
        name: data.retirement.spouse.first_name,
        totalAmount: totalAmount,
        accounts: accounts,
        qualifiedAccounts: paritionedAccounts[0],
        nonQualifiedAccounts: paritionedAccounts[1],
        otherIncomes: otherIncomes,
        show: accounts.length > 0 || otherIncomes.length > 0
      }
    }

    var fetchGoalData = function(data) {
      var goal, schedule
      $scope.goal = goal = data.retirement
      $scope.schedule = schedule = data.schedule

      $scope.thisYear = moment().year();
      $scope.payment = schedule.payment;
      $scope.status = schedule.status;
      $scope.actions = data.actions;
      $scope.completedActions = data.completed_actions;

      var total = goal.amount;
      $scope.percentComplete = getPercent(schedule.balance, total);
      $scope.percentIncomplete = getPercent(schedule.saving_needed_this_year, total);
      $scope.projectedAreaLabel = 'Projected Growth';
      $scope.contributionAreaLabel = 'Total Current Balance + Recommended Contributions';
      getTotalCurrentBalances(data);
    };
  });
}).call(this);

//# sourceMappingURL=summary.js.map
