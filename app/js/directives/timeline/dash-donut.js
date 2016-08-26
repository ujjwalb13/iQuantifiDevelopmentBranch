(function() {
  'use strict';
  angular.module('timeline').directive('dashDonut', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/timeline/_dash-donut.html',
      scope: {
        complete: '=',
        incomplete: '=?',
        status: '=?',
        goal: '='
      },
      link: function(scope, element, attrs) {
        scope.icon = function(type) {
          type = type.toLowerCase();
          if (type === 'wedding') {
            return "purchase";
          } else {
            return type;
          }
        };
        scope.summaryPath = function(goal) {
          if (goal.type == null) {
            return;
          }
          return "/#/summaries/" + (_.pluralize(goal.type.toLowerCase())) + "/" + goal.guid;
        };
        return scope.$watch('complete', function(newValue, oldValue) {
          var arc, arcOuter, arcTween, background, complete, completeEndAngle, height, incomplete, incompleteColor, radius, svg, width;
          if ((newValue == null) || (typeof isNaN === "function" ? isNaN(newValue) : void 0)) {
            return;
          }
          if (scope.incomplete == null) {
            scope.incomplete = 0;
          }
          if (scope.status === 'yellow-offtrack') {
            incompleteColor = '#ffc730';
          } else {
            incompleteColor = '#e16250';
          }
          width = 140;
          height = 140;
          radius = Math.min(width, height) / 2;
          arcOuter = radius - 22;
          arc = d3.svg.arc().innerRadius(radius - 10).outerRadius(arcOuter).startAngle(function(d) {
            return d.startAngle + 3 * Math.PI / 2;
          }).endAngle(function(d) {
            return d.endAngle + 3 * Math.PI / 2;
          });
          svg = d3.select(element[0]).append('svg').attr('width', width).attr('height', height).append('g').attr('transform', "translate(" + (width / 2) + ", " + (height / 2) + ")");
          completeEndAngle = (scope.complete / 100) * 2 * Math.PI;
          background = svg.append('path').datum({
            startAngle: 0,
            endAngle: 2 * Math.PI
          }).style('fill', '#667070').attr('d', arc);
          complete = svg.append('path').datum({
            startAngle: 0,
            endAngle: 0
          }).style('fill', '#8ec54b').attr('d', arc);
          incomplete = svg.append('path').datum({
            startAngle: completeEndAngle,
            endAngle: completeEndAngle
          }).style('fill', incompleteColor).attr('d', arc);
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
          return incomplete.transition().duration(1000).delay(1000).call(arcTween, completeEndAngle + (scope.incomplete / 100) * 2 * Math.PI);
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=dash-donut.js.map
