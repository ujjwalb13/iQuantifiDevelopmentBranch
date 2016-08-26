(function() {
  'use strict';
  angular.module('summaries').directive('retireChart', function(configService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/summaries/_retire-chart.html',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        return scope.$watch('data', function(newValue, oldValue) {
          var arc, data, g, height, pie, radius, svg, width;
          if (newValue == null) {
            return;
          }
          data = scope.data;
          width = 300;
          height = 300;
          radius = Math.min(width, height) / 2;
          arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(0);
          pie = d3.layout.pie().sort(null).value(function(d) {
            return d;
          });
          svg = d3.select(element[0]).append('svg').attr('width', width).attr('height', height).append('g').attr('transform', "translate(" + (width / 2) + ", " + (height / 2) + ")");
          g = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');
          g.append('path').attr('d', arc).style('fill', function(d, i) {
            return configService.color(i);
          });
          return g.append('text').attr('transform', function(d) {
            return "translate(" + (arc.centroid(d)) + ")";
          }).attr('dy', '0.35.em').style('text-anchor', 'middle').text(function(d) {
            return d3.round((d.value / data.reduce(function(t, s) {
              return t + s;
            })) * 100) + '%';
          });
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=retire-chart.js.map
