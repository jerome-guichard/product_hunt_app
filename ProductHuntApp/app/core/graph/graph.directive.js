'use strict';

angular.
    module('core.graph').
    directive('linearChart', function($parse, $window){
    return{
       restrict:'EA',
       template:"<svg width='850' height='400'></svg>",
        link: function(scope, elem, attrs){
            var exp = $parse(attrs.chartData);          
            var commentCountToPlot=exp(scope);
            
            console.log(scope);
            console.log(elem);
            console.log(attrs);
            console.log(exp);
            var padding = 20;
            var pathClass="path";
            var xScale, yScale, xAxisGen, yAxisGen, lineFun;

            var d3 = $window.d3;
            var rawSvg=elem.find('svg');
            var svg = d3.select(rawSvg[0]).attr("class", "graph-svg-component");;

            scope.$watchCollection(exp, function(newVal, oldVal){
                
                console.log(newVal);
                console.log(newVal);

                commentCountToPlot=newVal;
                if(typeof newVal !== 'undefined' ){
                    if(typeof oldVal === 'undefined'){
                        drawLineChart();
                    }
                    else{
                        redrawLineChart();
                    }
                }
         
            });

            function setChartParameters(){
                
                var endDate = new Date(commentCountToPlot[0].date);
                endDate.setDate(commentCountToPlot[commentCountToPlot.length-1].date.getDate()+1);
            
                xScale = d3.time.scale()
                    .domain([commentCountToPlot[0].date, endDate])
                    .range([padding, rawSvg.attr("width") - padding * 2]);          

                yScale = d3.scale.linear()
                    .domain([0, commentCountToPlot[commentCountToPlot.length-1].count + 1])
                    .range([rawSvg.attr("height") - padding, 0]);

                xAxisGen = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(10);

                yAxisGen = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(5);

                lineFun = d3.svg.line()
                    .x(function (d) {
                        return xScale(d.date);
                    })
                    .y(function (d) {
                        return yScale(d.count);
                    }).interpolate("step");
                    
            }

          function drawLineChart() {

                setChartParameters();

                svg.append("svg:g")
                    .attr("class", "x axis")
                    .attr('transform', 'translate(0,' + (rawSvg.attr("height")-padding) + ')')
                    .call(xAxisGen);
             
                svg.append("svg:g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(20,0)")
                    .call(yAxisGen);

                svg.append("svg:path")
                    .attr({
                        d: lineFun(commentCountToPlot),
                        "stroke": "orange",
                        "stroke-width": 2,
                        "fill": "none",
                        "class": pathClass
                    });
                    
                svg.append("text")
                    .attr("x", (rawSvg.attr("width") / 2))             
                    .attr("y", 15)
                    .attr("text-anchor", "middle")  
                    .style("font-size", "16px") 
                    .style("text-decoration", "underline")  
                    .text("Number of comments evolution over time");
                // now add titles to the axes
                svg.append("text")
                    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
                    .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
                    .text("Value");

                svg.append("text")
                    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
                    .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
                    .text("Date");
            }

            function redrawLineChart() {

                setChartParameters();

                svg.selectAll("g.y.axis").call(yAxisGen);

                svg.selectAll("g.x.axis").call(xAxisGen);

                svg.selectAll("."+pathClass)
                    .attr({
                        d: lineFun(commentCountToPlot)
                    });
            }

            //drawLineChart();
        }
   };
});