(function() {
  'use strict';
  angular.module('summaries').directive('goalProgressCircle', function() {
    var strokeColor = "#fff";
    var strokeWidth = 2;
    var width = 220;
    var height = 220;
    var radius = Math.min(width, height) / 2;
    var arcOuter = radius - 40;
    var arc = d3.svg.arc().innerRadius(radius - 5).outerRadius(arcOuter).startAngle(function(d) {
      return d.startAngle + 0;
    }).endAngle(function(d) {
      return d.endAngle + 0;
    });

    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/summaries/_goal-progress-circle.html',
      scope: {
        complete: '=',
        incomplete: '=?',
        status: '=',
        permonth: '=',
        topmessage: '=',
      },
      link: function(scope, element, attrs) {
        var svg = d3.select(element[0]).append('svg').attr('width', width).attr('height', height).append('g').attr('transform', "translate(" + (width / 2) + ", " + (height / 2) + ")");
        svg.append('path').datum({
            startAngle: 0,
            endAngle: 2 * Math.PI
          }).style('fill', '#e5e0c7')
            .attr('d', arc);
  
        scope.behindStatusClass = function() {
          if (scope.status === 'danger') return "behind-two-month";
          if (scope.status === 'warning') return "behind-one-month";
          return ""
        }

        return scope.$watch('complete', function(newValue, oldValue) {
          var arcTween, complete, completeEndAngle, incomplete, incompleteColor;
          if ((newValue == null) || (typeof isNaN === "function" ? isNaN(newValue) : void 0)) {
            return;
          }
          if (scope.incomplete == null) {
            scope.incomplete = 0;
          }
          if (scope.status === 'warning') {
            incompleteColor = '#ffc744';
          } else {
            incompleteColor = '#e16250';
          }

          completeEndAngle = (scope.complete / 100) * 2 * Math.PI;
          complete = svg.append('path').datum({
            startAngle: 0,
            endAngle: 0
          }).style('fill', '#8ec54a')
            .style('stroke', strokeColor)
            .style("stroke-width", strokeWidth)
            .attr('d', arc);
          incomplete = svg.append('path').datum({
            startAngle: completeEndAngle,
            endAngle: completeEndAngle
          }).style('fill', incompleteColor)
            .style('stroke', strokeColor)
            .style("stroke-width", strokeWidth)
            .attr('d', arc);
          if (scope.complete !== 0) {
            d3.select(angular.element(element).find('.complete-text')[0]).text(0).transition().duration(1000).tween('text', function() {
              var i;
              i = d3.interpolate(this.textContent, scope.complete);
              return function(t) {
                return this.textContent = Math.round(i(t)) + '%';
              };
            });
          }
          arcTween = function(transition, newAngle) {
            return transition.attrTween('d', function(d) {
              var interpolate;
              interpolate = d3.interpolate(d.endAngle, newAngle);
              return function(t) {
                d.endAngle = interpolate(t);
                return arc(d);
              };
            });
          };
          complete.transition().duration(1000).call(arcTween, completeEndAngle);
          incomplete.transition().duration(1000).delay(1000).call(arcTween, completeEndAngle + (scope.incomplete / 100) * 2 * Math.PI);
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=track-donut.js.map
