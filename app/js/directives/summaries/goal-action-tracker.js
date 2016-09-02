(function() {
  'use strict';
  angular.module('summaries').directive('goalActionTracker', function(configService, $window) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/summaries/_goal-action-tracker.html',
      scope: {
        schedule: '=',
        goalKind: '=',
        goalType: '=',
        bubbleText: '=',
        baseline: '=',
        status: '='
      },
      link: function(scope, element, attrs) {
        return scope.$watch('schedule', function(newValue, oldValue) {
          var amt, area, bgBarWidth, commasFormatter, d, data, dotValue, downColor, firstDate, getBars, height, i, j, k, l, lastDate, len, len1, len2, len3, line, list, m, margin, maxBars, month, mtnData, now, nowColor, nowDatum, nowIndex, nowRectEl, ref, ref1, svg, tip, upColor, width, x, xAxis, xDateFormat, y, yAxis,
            yAxisTicks;
          if (newValue == null) {
            return;
          }
          getBars = function(data) {
            var bars, d, graph, i, j, len, ref, step;
            graph = [];
            graph.push(data[0]);
            step = Math.ceil((data.length - 2) / maxBars);
            bars = (data.length - 2) / step;
            step = bars > 13 ? step + 1 : step;
            ref = step;
            for ((ref > 0 ? (i = j = 0, len = data.length) : i = j = data.length - 1); ref > 0 ? j < len : j >= 0; i = j += ref) {
              d = data[i];
              if (i > 0) {
                graph.push(d);
              }
            }
            graph = graph.slice(0, 14);
            graph.push(data[data.length - 1]);
            return graph;
          };
          maxBars = 15;
          dotValue = scope.baseline;
          ref = scope.schedule;
          for (j = 0, len = ref.length; j < len; j++) {
            month = ref[j];
            dotValue = dotValue + month.projected_payment;
            month.dotValue = dotValue < 0 ? 0 : dotValue;
          }
          data = getBars(scope.schedule);
          for (k = 0, len1 = data.length; k < len1; k++) {
            d = data[k];
            if (d.projected_balance < 0) {
              d.projected_balance = 0;
            }
          }
          nowIndex = null;
          for (i = l = 0, len2 = data.length; l < len2; i = ++l) {
            d = data[i];
            if (moment(d.date) <= moment()) {
              nowIndex = i;
            } else {
              break;
            }
          }
          margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 100
          };
          width = 960 - margin.left - margin.right;
          height = 400 - margin.top - margin.bottom;

          bgBarWidth = width / data.length;
          x = d3.scale.ordinal().rangeRoundBands([0, width], .5);
          y = d3.scale.linear().range([height, 0]);
          firstDate = moment(data[0].date);
          lastDate = moment(data[data.length - 1].date);
          if (lastDate.diff(firstDate, 'years') >= maxBars) {
            xDateFormat = 'YYYY';
          } else {
            xDateFormat = "MMM 'YY";
          }
          xAxis = d3.svg.axis().scale(x).orient('bottom').tickFormat(function(d) {
            return moment(d).format(xDateFormat);
          });
          commasFormatter = d3.format(',.0f');
          yAxis = d3.svg.axis().scale(y).orient('left').tickFormat(function(d) {
            return "$" + (commasFormatter(d));
          });

          line = d3.svg.line().x(function(d) {
            return x(d.date);
          }).y(function(d) {
            return y(d.dotValue);
          });
          svg = d3.select(element[0]).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).attr('viewBox', "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom)).attr('preserveAspectRatio', 'xMidYMid').append('g').attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
          x.domain(data.map(function(d) {
            return d.date;
          }));
          if (mtnData != null) {
            y.domain([
              0, d3.max(mtnData, function(d) {
                return d.value;
              })
            ]);
          } else {
            y.domain([
              0, d3.max(data, function(d) {
                return Math.max(d.projected_balance, d.balance);
              })
            ]);
          }
          svg.append('g').attr('class', 'x axis').attr('transform', "translate(0, " + height + ")").call(xAxis);
          svg.append('g').attr('class', 'y axis').call(yAxis);

          svg.selectAll('.bg-bar').data(data).enter().append('rect').attr('class', 'bg-bar').attr('x', function(d) {
            return x(d.date);
          }).attr('width', bgBarWidth).attr('y', 0).attr('transform', "translate(-" + (bgBarWidth / 4) + ", 0)");
          if (mtnData != null) {
            svg.selectAll('.bg-bar').attr('height', function(d) {
              return height - y(d3.max(mtnData, function(d) {
                return d.value;
              }));
            });
          } else {
            if (scope.goalType === 'debt') {
              svg.selectAll('.bg-bar').attr('height', function(d) {
                return height - y(d3.max(data, function(d) {
                  return d.balance;
                }));
              });
            } else {
              svg.selectAll('.bg-bar').attr('height', function(d) {
                return height - y(d3.max(data, function(d) {
                  return d.projected_balance;
                }));
              });
            }
          }
          if (mtnData != null) {
            area = d3.svg.area().x(function(d) {
              return x(d.date);
            }).y0(height).y1(function(d) {
              return y(d.value);
            });
            svg.append('path').datum(mtnData).attr('class', 'area').attr('d', area).attr('transform', "translate(" + (bgBarWidth / 4) + ", 0)");
          }
          svg.selectAll('.projected-bar').data(data).enter().append('rect').attr('class', 'projected-bar').attr('x', function(d) {
            return x(d.date);
          }).attr('width', x.rangeBand()).attr('y', function(d) {
            return y(d.projected_balance);
          }).attr('height', function(d) {
            return height - y(d.projected_balance);
          });
          tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
            return scope.bubbleText;
          });
          svg.call(tip);
          if (scope.goalType === 'debt') {
            upColor = scope.status === 'warning' ? 'yellow' : 'red';
            downColor = 'green';
          } else {
            upColor = 'green';
            downColor = scope.status === 'warning' ? 'yellow' : 'red';
          }
          nowColor = (function() {
            switch (false) {
              case scope.status !== 'danger':
                return 'red';
              case scope.status !== 'warning':
                return 'yellow';
              default:
                return 'green';
            }
          })();

          svg.append('path').datum(data)
            .attr('d', line)
            .attr('transform', "translate(" + (bgBarWidth / 4) + ", 0)")
            .attr('class', 'line');

          var nowPathData = _.filter(data, function(d, index) {
            return index <= nowIndex;
          });
          svg.append('path').datum(nowPathData)
            .attr('d', line)
            .attr('transform', "translate(" + (bgBarWidth / 4) + ", 0)")
            .attr('class', function(d) {
              if (scope.status == "danger") {
                return 'danger line';
              } else {
                return 'warning line';
              }
            });

          var ontrackPathData = _.filter(data, function(d, index) {
            return index <= nowIndex && d.balance >= d.projected_balance;
          });
          svg.append('path')
            .datum(ontrackPathData)
            .attr('class', 'ontrack line')
            .attr('d', line)
            .attr('transform', "translate(" + (bgBarWidth / 4) + ", 0)");


          svg.selectAll('.v-line').data(data).enter().append('line')
          .attr('x1', function(d) {
            return x(d.date);
          })
          .attr('x2', function(d) {
            return x(d.date);
          })
          .attr('y2', function(d) {
            return 0;
          })
          .attr('class', 'v-line')
          .attr('stroke', 'rgb(255,0,0)')
          .attr('transform', "translate(" + (bgBarWidth / 4) + ", 0)");

          svg.selectAll('.v-line').attr('y1', function(d) {
            return height - y(d3.max(data, function(d) {
              return d.projected_balance;
            }));
          });

          var yAxisTickTransforms = [];
          svg.selectAll(".y .tick").each(function(data) {
            var tick = d3.select(this);
            yAxisTickTransforms.push(tick.attr("transform"));
          });
          svg.selectAll('.h-line').data(yAxisTickTransforms).enter().append('line')
          .attr('x1', function(d) {
            return width;
          })
          .attr('x2', function(d) {
            return 5;
          })
          .attr('y1', function(d) {
            return 0;
          })
          .attr('y2', function(d) {
            return 0;
          })
          .attr('transform', function(d) {
            return d;
          })
          .attr('class', 'h-line')
          .attr('stroke', 'rgb(255,0,0)');


          svg.selectAll('.circle').data(data).enter().append('circle').attr('class', function(d) {
            if (moment(d.date) > moment()) {
              return 'circle';
            } else {
              if (d.balance < d.projected_balance) {
                if (scope.status == "danger") {
                  return 'danger circle';
                } else {
                  return 'warning circle';
                }
              } else {
                return 'ontrack circle';
              }
            }
          }).attr('r', 5).attr('cx', function(d) {
            return x(d.date);
          }).attr('cy', function(d) {
            return y(d.dotValue);
          }).attr('transform', "translate(" + (bgBarWidth / 4) + ", 0)");
          nowDatum = data[nowIndex];
          if ((nowDatum != null) && scope.bubbleText && nowDatum.dotValue >= nowDatum.projected_balance) {
            svg.selectAll('.circle').select(function(d, i) {
              if (i === nowIndex) {
                return this;
              } else {
                return null;
              }
            }).on('mouseover', tip.show);
            nowRectEl = angular.element(".circle:eq(" + nowIndex + ")");
          } else if ((nowDatum != null) && scope.bubbleText && nowDatum.projected_balance >= nowDatum.balance) {
            svg.selectAll('.projected-bar').select(function(d, i) {
              if (i === nowIndex) {
                return this;
              } else {
                return null;
              }
            }).on('mouseover', tip.show);
            nowRectEl = angular.element(".projected-bar:eq(" + nowIndex + ")");
          } else if ((nowDatum != null) && scope.bubbleText) {
            svg.selectAll('.bar').select(function(d, i) {
              if (i === nowIndex) {
                return this;
              } else {
                return null;
              }
            }).on('mouseover', tip.show);
            nowRectEl = angular.element(".bar:eq(" + nowIndex + ")");
          }
          angular.element(document).ready(function() {
            if (nowRectEl != null) {
              return nowRectEl.simulate('mouseover');
            }
          });
          return angular.element(document).ready(function() {
            var aspect, container;
            aspect = element.find('svg').width() / element.find('svg').height();
            container = element.parent();
            return angular.element($window).on('resize', function() {
              var targetWidth;
              targetWidth = container.width();
              element.find('svg').attr('width', targetWidth);
              element.find('svg').attr('height', Math.round(targetWidth / aspect));
              if (nowRectEl != null) {
                return nowRectEl.simulate('mouseover');
              }
            }).trigger('resize');
          });
        });
      }
    };
  });

}).call(this);

//# sourceMappingURL=action-chart.js.map
