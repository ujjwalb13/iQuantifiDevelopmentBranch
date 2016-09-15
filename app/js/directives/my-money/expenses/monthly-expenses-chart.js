(function() {
  'use strict';
  angular.module('agera').directive('monthlyExpensesChart', function(ENV, $http, Expense) {
    var getChartData, link;
    link = function(scope, element, attrs) {
      scope.selectedExpense = null;
      scope.getExpenseName = function(kind) {
        return Expense.getName(kind);
      }
      scope.$watch('expenses', function(newValue, oldValue) {
        if(newValue === undefined) {return;}
        console.log("watch expenses", oldValue, newValue);
        scope.totalAmount = _.reduce(newValue, function(total, item){ return item.amount + total; }, 0);
        scope.totalThreeMonthAverageAmount = _.reduce(newValue, function(total, item){ return item.three_month_average_amount + total; }, 0);
        scope.subCategories = genereateSubCategories(newValue);
        var svg = d3.select(element.find("svg")[0]);
        drawChart(scope, newValue, svg);
      });

    };
    function drawChart(scope, expenses, svg) {
      var chart, chartArea, chartGroups, chart_height, child_margin, color, expenses, detail_icon_height, expense_types, group_margin, height, margin, width, ratio, x, x1, xAxis, y, yAxis;
      margin = {
        top: 0,
        right: 0,
        bottom: 80,
        left: 70
      };
      group_margin = 10;
      child_margin = 4;
      detail_icon_height = 35;
      var title_height = 25;
      width = Number.parseInt(svg.style("width"));
      ratio = Number.parseFloat(svg.attr("ratio"));
      height = Math.round(width / ratio)
      chart_height = height + detail_icon_height + title_height;
      expense_types = ["amount", "three_month_average_amount"];
      color = d3.scale.ordinal().range([scope.currentExpensesColor, scope.threeMonthsAverageColor]);
      svg = svg.style('width', width).style('height', chart_height + margin.top + margin.bottom).append("g");
      x = d3.scale.ordinal().domain(expenses.map(function(d) { return Expense.getName(d.kind);}))
      .rangeRoundBands([0, width - margin.left - margin.right]);
      var max_value = d3.max(expenses, function(d) { return Math.max(d.amount, d.three_month_average_amount);})
      y = d3.scale.linear().domain([
        0, (max_value * (1 + (1.0 * detail_icon_height / height)))
      ]).range([(height + detail_icon_height), 0]);
      x1 = d3.scale.ordinal().domain(expense_types).rangeRoundBands([0, x.rangeBand() - group_margin]);

      xAxis = d3.svg.axis().scale(x).orient('bottom').outerTickSize(1);
      yAxis = d3.svg.axis().scale(y).orient('left').innerTickSize(-(width - margin.left - margin.right)).outerTickSize(0);

      chart = svg.append('g')
      .attr('class', 'chart')
      .attr('transform', "translate(" + margin.left + ", " + margin.top + ")")
      .attr("height", chart_height)
      .attr("width", width - margin.left - margin.right);

      chart.append("rect")
      .attr("class", "chart-background1")
      .attr("width", (width - margin.left - margin.right)/2)
      .attr("height", chart_height)
      .attr("fill", "#fafafa")

      chart.append("rect")
      .attr("class", "chart-background2")
      .attr("width", (width - margin.left - margin.right)/2)
      .attr("x", (width - margin.left - margin.right)/2)
      .attr("height", chart_height)
      .attr("fill", "#ffffff")

      chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', "translate(0," + title_height + ")")
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
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");

      var bar = svg.append("g").attr("class", "title")

      bar.append("rect")
      .attr("width", (width - margin.left - margin.right)/2)
      .attr("height", title_height)
      .attr("top", 0)
      .attr("x", margin.left)
      .attr("y", 0)
      .attr("fill", "#f2f3f5")

      bar.append("rect")
      .attr("width", (width - margin.left - margin.right)/2)
      .attr("height", title_height)
      .attr("top", 0)
      .attr("x", margin.left + (width - margin.left - margin.right)/2)
      .attr("y", 0)
      .attr("fill", "#f7f8fa")

      bar.append("text")
     .attr("fill", "#a7a7a7")
     .attr("font-size", "15px")
     .attr("top", 5)
     .attr("text-anchor", "middle")
     .attr("transform", "translate(" + (margin.left + (width - margin.right)/4) + "," + (title_height/2 + 5) + ")")
     .text("Committed Expenses");

      bar.append("text")
     .attr("fill", "#b4b4b4")
     .attr("font-size", "15px")
     .attr("top", 5)
     .attr("text-anchor", "middle")
     .attr("transform", "translate(" + (margin.left + 3*(width - margin.right)/4) + "," + (title_height/2 + 5) + ")")
     .text("Discretonary Expenses");

      chartArea = chart.append('g')
      .attr("class", "chart-area")
      .attr("height", chart_height)
      .attr("transform", "translate(0, " + title_height + ")");

      chartGroups = chartArea.selectAll("expense-group")
      .data(expenses)
      .enter()
      .append("g")
        .attr("class", "expense-group")
        .attr('x', function(d) { return x(Expense.getName(d.kind)) + margin.left + (group_margin / 2);})
        .attr('width', x.rangeBand()).attr('height', chart_height);

      chartGroups.selectAll("rect.group-highlight").data(function(d) { return [d];})
      .enter()
      .append("rect")
        .attr("class", "group-highlight")
        .attr("width", x.rangeBand())
        .attr("height", height + detail_icon_height)
        .attr("x", function(d) { return x(Expense.getName(d.kind));})
        .attr("y", 0);

      chartGroups.selectAll("rect.bar")
      .data(function(d) {
        return [
          { key: "amount", value: d.amount, kind: d.kind},
          { key: "three_month_average_amount", value: d.three_month_average_amount, kind: d.kind}
        ];
      })
      .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("width", x1.rangeBand() - child_margin).attr("x", function(d) { return x(Expense.getName(d.kind)) + x1(d.key) + (group_margin / 2) + (child_margin / 2);})
        .attr("y", function(d) { return y(d.value);})
        .attr("height", function(d) {return height + detail_icon_height - y(d.value);})
        .style("fill", function(d) { return color(d.key);});

      chartGroups.selectAll("foreignObject.tooltip-icon")
      .data(function(d){return [d]})
      .enter()
      .append("foreignObject")
        .attr("class", "tooltip-icon")
        .attr("x", function(d) { return x(Expense.getName(d.kind)) })
        .attr("y", title_height)
        .attr("width", x.rangeBand())
        .attr("height", detail_icon_height)
      .append("xhtml:div")
        .attr("class", "info-icon-container")
        .style("top", title_height + "px")
        .style("left", function(d){return (x(Expense.getName(d.kind)) + (x.rangeBand() / 2) + margin.left + (group_margin/2) + (child_margin/2)) + "px"})
      .append("xhtml:span")
        .attr("class", "info-icon fa fa-info")
        .on("click", function(d){
          $("#group-details-popup .info-icon-container").css("top", title_height + "px")
          $("#group-details-popup .info-icon-container").css("left", (x(Expense.getName(d.kind)) + (x.rangeBand() / 2) + margin.left + (group_margin/2) + (child_margin/2)) + "px")
          scope.selectedExpense = d;
          dislaySubcategories(d.kind, scope);
          scope.$digest();
        });
    }
    function genereateSubCategories(expenses) {
      var subCategories = {}
      _.each(expenses, function(expense) {
        subCategories[expense.kind] = {};
        subCategories[expense.kind]['categories'] = [];
        subCategories[expense.kind]['loadDone'] = false;
      });
      return subCategories;
    }
    function dislaySubcategories(expenseKind, scope) {
      if (!scope.subCategories[expenseKind]['loadDone']) {
        $http.get(ENV.apiHost + "/finance/expenses/subcategories/" + expenseKind).then(function(response) {
          scope.subCategories[expenseKind]['categories'] = response.data;
          return scope.subCategories[expenseKind]['loadDone'] = true;
        });
      }
      return scope.subCategories[expenseKind]['showed'] = true;
    };
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: "/views/directives/my-money/expenses/monthly-chart.tpl.html",
      scope: {
        currentExpensesColor: '@',
        threeMonthsAverageColor: '@',
        expenses: "="
      },
      link: link
    };
  });

}).call(this);

//# sourceMappingURL=monthly-expenses-chart.js.map
