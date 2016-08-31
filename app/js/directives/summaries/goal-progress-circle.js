(function() {
  'use strict';
  angular.module('summaries').directive('goalProgressCircle', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/summaries/_goal-progress-circle.html',
      scope: {
        complete: '=',
        incomplete: '=?',
        status: '=',
        permonth: '=',
        goalType: '=',
        goalKind: '=',
        index: '=?'
      },
      link: function(scope, element, attrs) {
        console.log("1");
        console.log(scope);
        return scope.$watch('complete', function(newValue, oldValue) {
          var arc, arcOuter, arcTween, background, complete, completeEndAngle, donutContainer, donutTableEl, donutTop, height, incomplete, incompleteColor, radius, svg, width;
          if ((newValue == null) || (typeof isNaN === "function" ? isNaN(newValue) : void 0)) {
            return;
          }
          if (scope.incomplete == null) {
            scope.incomplete = 0;
          }
          if (scope.status === 'warning') {
            incompleteColor = '#ffc730';
          } else {
            incompleteColor = '#e16250';
          }
          width = 220;
          height = 220;

          radius = Math.min(width, height) / 2;
          arcOuter = scope.isPolicy ? radius - 35 : radius - 40;
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
          }).style('fill', '#e5e0c7').attr('d', arc);
          complete = svg.append('path').datum({
            startAngle: 0,
            endAngle: 0
          }).style('fill', '#8ec54b').attr('d', arc);
          incomplete = svg.append('path').datum({
            startAngle: completeEndAngle,
            endAngle: completeEndAngle
          }).style('fill', incompleteColor).attr('d', arc);
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
          donutTableEl = angular.element('.donut-part');
          if ((donutTableEl != null) && !scope.isPolicy) {
            donutTop = 0;
            angular.element(donutTableEl).prevAll().each(function(index) {
              return donutTop += angular.element(this).outerHeight();
            });
            donutContainer = angular.element('.donut-chart-container');
            return donutContainer.css('top', (-10 + donutTop) + "px");
          }
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=track-donut.js.map
