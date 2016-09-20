(function() {
  'use strict';
  angular.module('agera').directive('donutChart', function() {
    function link(scope, element, attr) {
      var svg = d3.select(element[0]).append('svg')
        .attr('width', '100%')
        .attr('height', '100%');

      scope.$watch('data', function(newValue, oldValue) {
        if(newValue == null)
          return;
        drawChart(scope, svg, newValue);
      });
    }

    function drawChart(scope, svg, data) {
      var width, height, padding, donut_size, radius;

      padding = 15;
      width = parseInt(svg.style("width"));
      donut_size = width/3;
      height = donut_size + 2*padding;

      radius = 0.8*donut_size/2;

      var color = d3.scale.category10();

      svg.style("width", width + "px").style("height", height + "px");
      svg = svg.append("g");
      svg.attr("transform", "translate(" + width/2 + "," + height/2 + ")")

      svg.append("g").attr("class", "slices");
      svg.append("g").attr("class", "labels");
      svg.append("g").attr("class", "lines");

      var arc = d3.svg.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius);

      var outerArc = d3.svg.arc()
        .innerRadius(radius + 10)
        .outerRadius(radius + 10);

      var pie = d3.layout.pie()
        .value(function(d) { return d.amount; })
        .sort(null);

      var slices = svg.select(".slices")
        .selectAll("path.slice")
        .data(pie(data));

      slices.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.label); })
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
      var labels = svg.select(".labels")
        .selectAll("text")
        .data(pie(data), key);

      var labelContainers = svg.select(".labels").selectAll(".label-container")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "label-container");

      labelContainers.transition().duration(1000)
      .attrTween("transform", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          if(midAngle(d2) > Math.PI) {pos[0] -= width/3;}
          if(midAngle(d2) > Math.PI) { pos[1] += padding; }
          return "translate("+ pos +")";
        };
      })
      .attr("text-anchor", "start");

      labelContainers.selectAll("text.legend-line1").data(function(d) {
        return [d];
      })
      .enter()
      .append("text")
        .attr("dx", "20px")
        .attr("class", "legend-line1")
        .attr("font-weight", "bold")
        .attr("font-size", "14px")
        .text(function(d){
          return d.data.label;
        });
      labelContainers.selectAll("text.legend-line2").data(function(d) {
        return [d];
      })
      .enter()
      .append("text")
        .attr("dx", "20px")
        .attr("dy", "20px")
        .attr("class", "legend-line2")
        .attr("font-weight", "bold")
        .attr("font-size", "14px")
        .text(function(d){
          var percent = Math.round(10000 * (d.endAngle - d.startAngle) / 2 / Math.PI)/100.0;
          return "$" + d.value + " ("+ percent +"%)";
        });

      labels.exit().remove();

      var polyline = svg.select(".lines")
        .selectAll("polyline")
        .data(pie(data))
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
            pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
            if(midAngle(d2) > Math.PI) {
              pos[0] *= 1.5;
              pos[1] += padding;
            }
            return [arc.centroid(d2), outerArc.centroid(d2), pos];
          };
        });
    }

    function midAngle(d){
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    return {
      restrict: 'E',
      link: link,
      scope: {
        data: '='
      }
    }
  });
}).call(this);
