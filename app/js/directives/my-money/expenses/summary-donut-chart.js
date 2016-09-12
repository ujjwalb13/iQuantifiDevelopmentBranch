(function() {
  'use strict';
  angular.module('agera').directive('summaryDonutChart', function($q, Expense, DebtAndPolicyPayment) {
    var link = function(scope, element, attrs) {
      $q.all([
        getExpenses(),
        getDebtAndPolicyPayments()
      ])
      .then(function(response){
        var expenses = response[0];
        var debtsAndPolicyPayments = response[1];
        var data = summaryData(expenses, debtsAndPolicyPayments);
        var svg = d3.select(element.find("svg")[0]);
        drawChart(scope, svg, data);
        scope.totalMonthlyCommittedExpenses = data.totalMonthlyCommittedExpenses;
        scope.monthlyCommittedExpensesPercent = data.monthlyCommittedExpensesPercent;
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

    function drawChart(scope, svg, data) {
      var width, height, donut_size;
      width = Number.parseInt(svg.style("width"));
      donut_size = width/3;
      var radius = width/6;
      var total_monthly_height = 50;
      var color = d3.scale.ordinal().range(["#e3973d", "#e3973d", "#d36351", "#508b8e"]);
      svg.style("width", width + "px").style("height", (donut_size + total_monthly_height) + "px");
      svg = svg.append("g");
      svg.attr("transform", "translate(" + width / 2 + "," + donut_size / 2 + ")")

      svg.append("g").attr("class", "slices");
      svg.append("g").attr("class", "slices_pattern");
      svg.append("g").attr("class", "labels");
      svg.append("g").attr("class", "lines");
      var center_group = svg.append("g").attr("class", "center_group");

      var arc = d3.svg.arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.8);

      var outerArc = d3.svg.arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius * 0.8);

      var pie = d3.layout.pie()
        .value(function(d) { return d.amount; })
        .sort(null);

      svg.append("svg:pattern")
          .attr("id", "commited_pattern")
          .attr("width", 5)
          .attr("height", 5)
          .attr("patternUnits", "userSpaceOnUse")
          .append("svg:image")
          .attr("xlink:href", '/images/icon/pattern.png')
          .attr("width", 5)
          .attr("height", 5)
          .attr("x", 0)
          .attr("y", 0);
      var slices = svg.select(".slices")
        .selectAll("path.slice")
        .data(pie(data.pies));

      slices.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.color); })
        .attr("class", "slice");

      slices.transition()
        .attrTween("d", function(d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            return arc(interpolate(t));
          };
        })
      slices.exit().remove();

      var slices_pattern = svg.select(".slices_pattern")
        .selectAll("path.slice")
        .data(pie(data.pies));

      slices_pattern.enter()
        .insert("path")
        .style("fill", function(d) {
          if(d.data.kind == "commited") {
            return "url(#commited_pattern)";
          } else {
            return color(d.data.color);
          }
        })
        .attr("class", "slice");

      slices_pattern.transition()
        .attrTween("d", function(d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            return arc(interpolate(t));
          };
        })
      slices_pattern.exit().remove();



      var key = function(d){ return d.data.label; };
      var text = svg.select(".labels")
        .selectAll("text")
        .data(pie(data.pies), key);

      text.enter()
      .append('foreignObject')
      .attr('width', donut_size)
      .attr('x', function(d){
        return midAngle(d) < Math.PI ? (width * 2 / 3) : 0;
      })
      .attr('y', function(d){
        var pos = radius * Math.sin(Math.PI/2 - midAngle(d));
        var extra_pos = midAngle(d) < Math.PI ? 0 : total_monthly_height;
        return donut_size/2 - pos + extra_pos;
      })
      .append("xhtml:body")
      .html(function(d){
        var percent = Math.round(10000 * (d.endAngle - d.startAngle) / 2 / Math.PI)/100.0;
        return '<div class="des-chart-content">\
        <i class="icon ' + d.data.icon + '"></i>\
        <p>\
          <span>'+d.data.label+'</span>\
          <strong>$' + d.value + ' ('+ percent +'%)</strong>\
        </p>\
      </div>'});

      function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
      }
      text.exit().remove();

      var polyline = svg.select(".lines")
        .selectAll("polyline")
        .data(pie(data.pies), key)
        .enter().append("polyline")
        .attr("fill", "none")
        .attr("stroke", "#000");

      polyline.transition().duration(1000)
        .attrTween("points", function(d){
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            var d2 = interpolate(t);
            var pos = outerArc.centroid(d2);
            pos[0] = radius * 1.5 * (midAngle(d2) < Math.PI ? 1 : -1);
            if(midAngle(d2) > Math.PI) { pos[1] += total_monthly_height; }
            return [arc.centroid(d2), outerArc.centroid(d2), pos];
          };
        });
      center_group.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dy", -10)
        .text("Total Monthly");
      center_group.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dy", 5)
        .text("Expenses");
      center_group.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dy", 25)
        .style("font-weight", "bold")
        .text("$" + data.totalExpenses);
    }
    function summaryData(expenses, debtsAndPolicyPayments) {
      var commitedExpenses = _.select(expenses, function(item){return isCommittedExpense(item.kind);})
      var discretionaryExpenses = _.select(expenses, function(item){return !isCommittedExpense(item.kind);})
      var totalDiscretionaryExpenses = _.reduce(discretionaryExpenses, function(total, item){ return item.amount + total; }, 0);
      var totalCommittedExpenses = _.reduce(commitedExpenses, function(total, item){ return item.amount + total; }, 0);
      var totalDebts = _.detect(debtsAndPolicyPayments, function(item){return item.kind =="debt"}).total_amount;
      var totalPolicies = _.detect(debtsAndPolicyPayments, function(item){return item.kind =="policy"}).total_amount;
      var totalMonthlyCommittedExpenses = totalCommittedExpenses + totalDebts + totalPolicies;
      var totalExpenses = totalMonthlyCommittedExpenses + totalDiscretionaryExpenses;
      var data = [
        {
          label: "Total Monthly Discretionary Expenses",
          amount: totalDiscretionaryExpenses,
          kind: "discretionary",
          color: "gray",
          icon: "icon-mm-expenses"
        },
        {
          label: "Monthly Committed Expenses",
          amount: totalCommittedExpenses,
          kind: "commited",
          color: "blue",
          icon: "icon-mm-expenses"
        },
        {
          label: "Monthly Debt Payments",
          amount: totalDebts,
          kind: "commited",
          color: "green",
          icon: "icon-db-debt"
        },
        {
          label: "Monthly Policy Premiums",
          amount: totalPolicies,
          kind: "commited",
          color: "red",
          icon: "icon-pt-protection"
        },
      ];
      return {
        pies: _.select(data, function(item){return item.amount > 0}),
        totalMonthlyCommittedExpenses: totalMonthlyCommittedExpenses,
        totalExpenses: totalExpenses,
        monthlyCommittedExpensesPercent: Math.round(10000.0 * totalMonthlyCommittedExpenses / totalExpenses) / 100
      };
    }

    function isCommittedExpense(expense_kind) {
      var commited_expense_kinds = ["car_insurance", "cell_phone", "education", "health_insurance", "rent", "groceries", "transportation", "utilities", "cable_internet", "healthcare"];
      return _.include(commited_expense_kinds, expense_kind);
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