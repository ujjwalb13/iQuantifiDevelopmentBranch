(function() {
  'use strict';
  angular.module('agera').directive('summaryDonutChart', function() {
    var link = function(scope, element, attrs) {
      var data = [
        {label: "Monthly Policy Premiums", amount: 5, kind: "commited", color: "red"},
        {label: "Monthly Debt Payments", amount: 10, kind: "commited", color: "green"},
        {label: "Monthly Committed Expenses", amount: 80, kind: "commited", color: "blue"},
        {label: "Total Monthly Discretionary Expenses", amount: 20, kind: "commited", color: "gray"},
      ]
      // Expense.query().$promise.then(function(expenses){
      //   scope.subCategories = genereateSubCategories(expenses);
      //   var svg = d3.select(element.find("svg")[0]);
      //   drawChart(scope, expenses, svg);
      // });
      var svg = d3.select(element.find("svg")[0]);
      drawChart(scope, svg, data)
    };

    function drawChart(scope, svg, data) {
      var width, height;
      width = Number.parseInt(svg.style("width"));
      height = width/3;
      var radius = width/6;
      var color = d3.scale.ordinal()
                  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      var arc = d3.svg.arc()
          .innerRadius(radius - 20)
          .outerRadius(radius - 70);

      var pie = d3.layout.pie()
        .value(function(d) { return d.amount; })
        .sort(null);

      var path = svg
      .style("width", width)
      .style("height", height)
      .append("g")
      .attr("transform", "translate(" + width/2 + "," + height / 2 + ")")
      .selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d) {return d.data.color; });
    }

    return {
      restrict: 'E',
      transclude: true,
      templateUrl: "/views/directives/my-money/expenses/summary-donut-chart.tpl.html",
      scope: {
        currentExpensesColor: '@',
        threeMonthsAverageColor: '@'
      },
      link: link
    };
  });

}).call(this);

//# sourceMappingURL=monthly-expenses-chart.js.map
