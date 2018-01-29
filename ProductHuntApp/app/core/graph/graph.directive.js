'use strict';

angular.
    module('core.graph').
    directive('stepChart', function($parse, $window){
    return{
       restrict:'EA',
       template:"<p ng-if='!comments.postName'> Select a post in th list </p><p ng-if='comments.postName'> Current post : {{comments.postName}} </p><svg width='850' height='400'></svg>",
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
            var svg = d3.select(rawSvg[0])
                    .attr("class", "graph-svg-component");;

            scope.$watchCollection(exp, function(newVal, oldVal){
                
                console.log(newVal);
                console.log(newVal);

                commentCountToPlot=newVal;
                
                // If new set of comment data
                if(typeof newVal !== 'undefined' ){
                    // Print a step chart if no previous chart
                    if(typeof oldVal === 'undefined'){
                        drawStepChart();
                    }
                    // if chart already creaated, replace data 
                    else{
                        redrawStepChart();
                    }
                }
         
            });

            function setChartParameters(){
                
                // define limite on x-axis
                // Set limit as last comment date + 1day
                var endDate = new Date(commentCountToPlot[0].date);
                endDate.setDate(commentCountToPlot[commentCountToPlot.length-1].date.getDate()+1);
                
                // Scale x axis between the date of the first comment and last comment date + 1day
                xScale = d3.time.scale()
                    .domain([commentCountToPlot[0].date, endDate])
                    .range([padding, rawSvg.attr("width") - padding * 2]);          
                    
                // Scale y axis between 0 and last count + 1
                yScale = d3.scale.linear()
                    .domain([0, commentCountToPlot[commentCountToPlot.length-1].count + 1])
                    .range([rawSvg.attr("height") - padding, 0]);
                
                // x axis setting
                xAxisGen = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(10);
            
                // y axis setting
                yAxisGen = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(5);
                
                // define function as a step function
                lineFun = d3.svg.line()
                    .x(function (d) {
                        return xScale(d.date);
                    })
                    .y(function (d) {
                        return yScale(d.count);
                    }).interpolate("step");
                    
            }

          function drawStepChart() {

                setChartParameters();
                
                // append x axis to chart
                svg.append("svg:g")
                    .attr("class", "x axis")
                    .attr('transform', 'translate(0,' + (rawSvg.attr("height")-padding) + ')')
                    .call(xAxisGen);
                
                // append y axis to chart
                svg.append("svg:g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(20,0)")
                    .call(yAxisGen);
            
                // append x axis to step function
                svg.append("svg:path")
                    .attr({
                        d: lineFun(commentCountToPlot),
                        "stroke": "orange",
                        "stroke-width": 2,
                        "fill": "none",
                        "class": pathClass
                    });
                
                // append chart title
                svg.append("text")
                    .attr("x", (rawSvg.attr("width") / 2))             
                    .attr("y", 15)
                    .attr("text-anchor", "middle")  
                    .style("font-size", "16px") 
                    .text("Comments count evolution over time");
            }

            function redrawStepChart() {
                
                setChartParameters();

                svg.selectAll("g.y.axis").call(yAxisGen);

                svg.selectAll("g.x.axis").call(xAxisGen);

                svg.selectAll("."+pathClass)
                    .attr({
                        d: lineFun(commentCountToPlot)
                    });
            }
        }
   };
});