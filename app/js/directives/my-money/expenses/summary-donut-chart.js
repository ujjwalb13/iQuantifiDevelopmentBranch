(function() {
  'use strict';
  angular.module('agera').directive('summaryDonutChart', function() {
    var link = function(scope, element, attrs) {
      var data = [
        {label: "Total Monthly Discretionary Expenses", amount: 20, kind: "commited", color: "gray"},
        {label: "Monthly Committed Expenses", amount: 50, kind: "commited", color: "blue"},
        {label: "Monthly Debt Payments", amount: 10, kind: "commited", color: "green"},
        {label: "Monthly Policy Premiums", amount: 5, kind: "commited", color: "red"},
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
      var width, height, donut_size;
      width = Number.parseInt(svg.style("width"));
      donut_size = width/3;
      var radius = width/6;
      var color = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      svg.style("width", width + "px").style("height", donut_size + "px");
      svg = svg.append("g");
      svg.attr("transform", "translate(" + width / 2 + "," + donut_size / 2 + ")")

      svg.append("g").attr("class", "slices");
      svg.append("g").attr("class", "labels");
      svg.append("g").attr("class", "lines");

      var arc = d3.svg.arc()
        .outerRadius(radius * 0.75)
        .innerRadius(radius * 0.4);

      var outerArc = d3.svg.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.9);

      var pie = d3.layout.pie()
        .value(function(d) { return d.amount; })
        .sort(null);

      var slices = svg.select(".slices")
        .selectAll("path.slice")
        .data(pie(data));

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


      var key = function(d){ return d.data.label; };
      var text = svg.select(".labels")
        .selectAll("text")
        .data(pie(data), key);

      text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d) {
          return d.data.label;
        });

      function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
      }

      text.transition().duration(1000)
        .attrTween("transform", function(d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            var d2 = interpolate(t);
            var pos = outerArc.centroid(d2);
            pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
            return "translate("+ pos +")";
          };
        })
        .styleTween("text-anchor", function(d){
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            var d2 = interpolate(t);
            return midAngle(d2) < Math.PI ? "start":"end";
          };
        });

      text.exit().remove();

      var polyline = svg.select(".lines")
        .selectAll("polyline")
        .data(pie(data), key)
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
            pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
            return [arc.centroid(d2), outerArc.centroid(d2), pos];
          };
        });
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
