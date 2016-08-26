(function() {
  'use strict';
  angular.module('agera').directive('amortizationChart', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        return scope.$watch('data', function(newValue, oldValue) {
          var area, data, height, line, margin, parseDate, svg, width, x, xAxis, y, yAxis;
          if (newValue == null) {
            return;
          }
          data = scope.data;
          margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
          };
          width = 960 - margin.left - margin.right;
          height = 500 - margin.top - margin.bottom;
          parseDate = d3.time.format('%Y-%m-%d').parse;
          x = d3.time.scale().range([0, width]);
          y = d3.scale.linear().range([height, 0]);
          xAxis = d3.svg.axis().scale(x).orient('bottom');
          yAxis = d3.svg.axis().scale(y).orient('left');
          line = d3.svg.area().interpolate('basis').x(function(d) {
            return x(d.date);
          }).y(function(d) {
            return y(d.need);
          });
          area = d3.svg.area().interpolate('basis').x(function(d) {
            return x(d.date);
          }).y1(function(d) {
            return y(d.need);
          });
          svg = d3.select(element[0]).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
          data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.need = +d.need;
            return d.available = +d.available;
          });
          x.domain(d3.extent(data, function(d) {
            return d.date;
          }));
          y.domain([
            d3.min(data, function(d) {
              return Math.min(d.need, d.available);
            }), d3.max(data, function(d) {
              return Math.max(d.need, d.available);
            })
          ]);
          svg.datum(data);
          svg.append('clipPath').attr('id', 'clip-below').append('path').attr('d', area.y0(height));
          svg.append('clipPath').attr('id', 'clip-above').append('path').attr('d', area.y0(0));
          svg.append('path').attr('class', 'area above').attr('clip-path', 'url(#clip-above)').attr('d', area.y0(function(d) {
            return y(d.available);
          }));
          svg.append('path').attr('class', 'area below').attr('clip-path', 'url(#clip-below)').attr('d', area);
          svg.append('path').attr('class', 'line').attr('d', line);
          svg.append('g').attr('class', 'x axis').attr('transform', "translate(0, " + height + ")").call(xAxis);
          return svg.append('g').attr('class', 'y axis').call(yAxis);
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=amortization-chart.js.map
