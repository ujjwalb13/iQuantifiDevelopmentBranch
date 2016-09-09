(function() {
  'use strict';
  angular.module('agera').directive('debtPaymentsChart', function(ENV, $http, Expense, DebtAndPolicyPayment, $q) {
    var getChartData, link;
    link = function(scope, element, attrs) {
       $q.all([
          getExpenses(),
          getDebtAndPolicyPayments()
        ])
        .then(function(response){
          var expenses = response[0];
          var debtsAndPolicyPayments = response[1];
          var debt = _.detect(debtsAndPolicyPayments, function(item){return item.kind =="debt"});
          var totalDebts = debt.total_amount;
          var totalPolicies = _.detect(debtsAndPolicyPayments, function(item){return item.kind =="policy"}).total_amount;
          var totalExpenses = _.reduce(expenses, function(total, item){ return item.amount + total; }, 0) + totalDebts + totalPolicies;
          var svg = d3.select(element.find("svg")[0]);
          drawChart(scope, debt.Detail, svg);
          scope.debtPayments = _.map(debt.Detail, function(item){
            item.percent = Math.round(10000.0 * item.amount / totalExpenses) / 100;
            return item;
          });
          scope.totalValue = _.detect(debtsAndPolicyPayments, function(item){return item.kind =="debt"}).total_amount;
          scope.totalPercent = Math.round(10000.0 * scope.totalDebt / totalExpenses)/100;
          scope.chart_title = "Total Monthly Debt Payments";
       });
    };

    function getExpenses() {
       var d = $q.defer();
       var result = Expense.query({}, function() {
            d.resolve(result);
       });
       return d.promise;
    }

    function getDebtAndPolicyPayments() {
       var d = $q.defer();
       var result = DebtAndPolicyPayment.query({}, function() {
            d.resolve(result);
       });
       return d.promise;
    }
    function drawChart(scope, debts, svg) {
      var chart, chartArea, chartGroups, chart_height, color, detail_icon_height, expense_types, group_margin, height, margin, width, ratio, x, xAxis, y, yAxis;
      margin = {
        top: 30,
        right: 0,
        bottom: 80,
        left: 70
      };
      group_margin = 20;
      detail_icon_height = 35;
      width = 500;
      ratio = 1;
      height = Math.round(width / ratio)
      chart_height = height;
      svg = svg.style('width', width).style('height', chart_height + margin.top + margin.bottom).append("g");
      x = d3.scale.ordinal()
        .domain(debts.map(function(d) { return d.name;}))
        .rangeRoundBands([0, width - margin.left - margin.right]);
      y = d3.scale.linear().domain([
        0, d3.max(debts, function(d) { return d.amount;})
      ]).range([height, 0]);

      xAxis = d3.svg.axis().scale(x).orient('bottom').outerTickSize(1);
      yAxis = d3.svg.axis().scale(y).orient('left').innerTickSize(-(width - margin.left - margin.right)).outerTickSize(0);

      chart = svg.append('g')
      .attr('class', 'chart')
      .attr('transform', "translate(" + margin.left + ", " + margin.top + ")")
      .attr("height", chart_height)
      .attr("width", width - margin.left - margin.right);

      chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', "translate(0, 0)")
      .call(yAxis)
      .append('text')
      .style("text-anchor", "end")
      .attr('transform', "rotate(-90)")
      .attr('dy', '.71em');

      svg.append('g')
      .attr('transform', "translate(" + margin.left + ", " + (margin.top + chart_height) + ")")
      .attr('class', 'x axis')
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", group_margin + "px")


      chartArea = chart.append('g')
      .attr("class", "chart-area")
      .attr("height", chart_height)
      .attr("transform", "translate(0, 0)")
      .attr("fill", "none");

      chartGroups = chartArea.selectAll("expense-group")
      .data(debts)
      .enter()
      .append("g")
        .attr("class", "expense-group")
        .attr('x', function(d) { return x(d.name) +  (group_margin / 2);})
        .attr('width', x.rangeBand())
        .attr('height', chart_height);

      chartGroups.selectAll("rect.bar")
      .data(debts)
      .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("width", x.rangeBand() - group_margin)
        .attr("x", function(d) {return x(d.name) + (group_margin / 2);})
        .attr("y", function(d) { return y(d.amount);})
        .attr("height", function(d) {return height - y(d.amount);})
        .style("fill", function(d) { return "#dd644d";});

      chartGroups.selectAll("rect.group-highlight").data(function(d) { return [d];})
      .enter()
      .append("rect")
        .attr("class", "group-highlight")
        .attr("width", x.rangeBand())
        .attr("height", height)
        .attr("x", function(d) { return x(d.name);})
        .attr("y", 0);


    }
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: "/views/directives/my-money/expenses/debt-payments-chart.tpl.html",
      link: link
    };
  });

}).call(this);

//# sourceMappingURL=monthly-expenses-chart.js.map
