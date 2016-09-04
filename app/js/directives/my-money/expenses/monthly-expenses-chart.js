(function() {
  'use strict';
  angular.module('agera').directive('monthlyExpensesChart', function(ENV, $http, Expense) {
    var getChartData, link;
    link = function(scope, element, attrs) {
      scope.selectedExpense = null;
      scope.getExpenseName = function(kind) {
        return Expense.getName(kind);
      }
      var chart, chartArea, chartGroups, chart_height, child_margin, color, expenses, detail_icon_height, expense_types, group_margin, height, legends, margin, svg, width, ratio, x, x1, xAxis, y, yAxis;
      expenses = getChartData();
      scope.subCategories = genereateSubCategories(expenses);
      svg = d3.select(element.find("svg")[0]);
      margin = {
        top: 0,
        right: 20,
        bottom: 80,
        left: 60
      };
      group_margin = 10;
      child_margin = 4;
      detail_icon_height = 30;
      width = Number.parseInt(svg.style("width"));
      ratio = Number.parseFloat(svg.attr("ratio"));
      height = Math.round(width / ratio)
      chart_height = height + detail_icon_height;
      expense_types = ["amount", "three_month_average_amount"];
      color = d3.scale.ordinal().range([scope.currentExpensesColor, scope.threeMonthsAverageColor]);
      svg = svg.style('width', width).style('height', chart_height + margin.top + margin.bottom).append("g");
      x = d3.scale.ordinal().domain(expenses.map(function(d) { return Expense.getName(d.kind);}))
      .rangeRoundBands([0, width - margin.left - margin.right]);
      y = d3.scale.linear().domain([
        0, d3.max(expenses, function(d) { return Math.max(d.amount, d.three_month_average_amount);})
      ]).range([height, 0]);
      x1 = d3.scale.ordinal().domain(expense_types).rangeRoundBands([0, x.rangeBand() - group_margin]);

      xAxis = d3.svg.axis().scale(x).orient('bottom').outerTickSize(1);
      yAxis = d3.svg.axis().scale(y).orient('left').innerTickSize(-(width - margin.left - margin.right)).outerTickSize(1).tickPadding(10);

      chart = svg.append('g')
      .attr('class', 'chart')
      .attr('transform', "translate(" + margin.left + ", " + margin.top + ")")
      .attr("height", chart_height)
      .attr("width", width - margin.left - margin.right);

      chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', "translate(0, " + detail_icon_height + ")")
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

      chartArea = chart.append('g')
      .attr("class", "chart-area")
      .attr("height", chart_height);

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
        .attr("height", height)
        .attr("x", function(d) { return x(Expense.getName(d.kind));})
        .attr("y", detail_icon_height);

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
        .attr("y", function(d) { return y(d.value) + detail_icon_height;})
        .attr("height", function(d) {return height - y(d.value);})
        .style("fill", function(d) { return color(d.key);});

      chartGroups.selectAll("foreignObject.tooltip-icon")
      .data(function(d){return [d]})
      .enter()
      .append("foreignObject")
        .attr("class", "tooltip-icon")
        .attr("x", function(d) { return x(Expense.getName(d.kind)) })
        .attr("y", function(d) { return Math.min(y(d.amount), y(d.three_month_average_amount));})
        .attr("width", x.rangeBand())
        .attr("height", detail_icon_height)
      .append("xhtml:div")
        .attr("class", "info-icon-container")
        .style("top", function(d) { return Math.min(y(d.amount), y(d.three_month_average_amount)) + "px"})
        .style("left", function(d){return (x(Expense.getName(d.kind)) + (x.rangeBand() / 2) + margin.left + (group_margin/2) + (child_margin/2)) + "px"})
      .append("xhtml:span")
        .attr("class", "info-icon fa fa-info")
        .on("click", function(d){
          $("#group-details-popup .info-icon-container").css("top", Math.min(y(d.amount), y(d.three_month_average_amount)) + "px")
          $("#group-details-popup .info-icon-container").css("left", (x(Expense.getName(d.kind)) + (x.rangeBand() / 2) + margin.left + (group_margin/2) + (child_margin/2)) + "px")
          scope.selectedExpense = d;
          dislaySubcategories(d.kind, scope);
          scope.$digest();
        });
    };
    getChartData = function() {
      return [
        {
          "kind": "car_insurance",
          "amount": 10,
          "three_month_average_amount": 11,
          "id": 0
        }, {
          "kind": "cell_phone",
          "amount": 30,
          "three_month_average_amount": 10,
          "id": 1
        }, {
          "kind": "education",
          "amount": 10,
          "three_month_average_amount": 11,
          "id": 2
        }, {
          "kind": "health_insurance",
          "amount": 15,
          "three_month_average_amount": 20,
          "id": 3
        }, {
          "kind": "rent",
          "amount": 20,
          "three_month_average_amount": 30,
          "id": 4
        }, {
          "kind": "groceries",
          "amount": 20,
          "three_month_average_amount": 30,
          "id": 5
        }, {
          "kind": "transportation",
          "amount": 10,
          "three_month_average_amount": 15,
          "id": 6
        }, {
          "kind": "utilities",
          "amount": 80,
          "three_month_average_amount": 60,
          "id": 7
        }, {
          "kind": "cable_internet",
          "amount": 10,
          "three_month_average_amount": 50,
          "id": 8
        }, {
          "kind": "healthcare",
          "amount": 20,
          "three_month_average_amount": 25,
          "id": 9
        }, {
          "kind": "charitable_giving",
          "amount": 5,
          "three_month_average_amount": 15,
          "id": 10
        }, {
          "kind": "clothing",
          "amount": 40,
          "three_month_average_amount": 40,
          "id": 11
        }, {
          "kind": "entertainment",
          "amount": 55,
          "three_month_average_amount": 10,
          "id": 12
        }, {
          "kind": "hobbies_travel",
          "amount": 20,
          "three_month_average_amount": 20,
          "id": 13
        }, {
          "kind": "personal_care",
          "amount": 0,
          "three_month_average_amount": 0,
          "id": 14
        }, {
          "kind": "home_maintenance",
          "amount": 10,
          "three_month_average_amount": 0,
          "id": 15
        }, {
          "kind": "dining",
          "amount": 90,
          "three_month_average_amount": 80,
          "id": 16
        }, {
          "kind": "other",
          "amount": 80,
          "three_month_average_amount": 90,
          "id": 17
        }
      ];
    };
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
        threeMonthsAverageColor: '@'
      },
      link: link
    };
  });

}).call(this);

//# sourceMappingURL=monthly-expenses-chart.js.map
