d3.select(window).on("resize", makeResponsive);
makeResponsive();

function makeResponsive() {
  var svgArea = d3.select(".chart")
                  .select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  };
  
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    right: 100,
    bottom: 130,
    left: 100
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper.
  var svg = d3.select(".chart")
              .append("svg")
              .attr("width", svgWidth)
              .attr("height", svgHeight);

  var chartGroup = svg.append("g")
                      .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data, set data as numbers.
  d3.csv("veteran_ds.csv", function (err, mindData) {
    if (err) throw err;

    vetData.forEach(function (d) {
      d.veteran_p = +d.veteran_p;
      d.heavy_dr_p = +d.heavy_dr_p;
      d.total_pop = +d.total_pop;
    });

  // Scale.
    var xLinearScale = d3.scaleLinear()
      .domain([0, ((d3.max(vetData, d => d.veteran_p))+4)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .range([height, 0]);
  
    var heavyMax = d3.max(vetData, d => d.heavy_dr_p);
    var popMax = d3.max(mindData, d => d.total_pop);
    if (hsMax > popMax) {
      yMax = heavyMax;
    }
    else {
      yMax = popMax;
    };
    yLinearScale.domain([0, (yMax+5)]);    

  // Add the axes.
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

    chartGroup.append("g")
            .call(leftAxis);

    var xAxisData = vetData.map(d => d.veteran_p);
    var yAxisData1 = vetData.map(d => d.heavy_dr_p);
    var yAxisData2 = vetData.map(d => d.total_pop);

    var regression1 = leastSquaresequation(xAxisData, yAxisData1);
    var regression2 = leastSquaresequation(xAxisData, yAxisData2);
    
    var chart1 = chartGroup.append('g').classed('chart1', true);
    var chart2 = chartGroup.append('g').classed("chart2", true);

    var line1 = d3.line()
                  .x(d => xLinearScale(d.veteran_p))
                  .y(d => yLinearScale(regression1(d.veteran_p)));

    var line2 = d3.line()
                  .x(d => xLinearScale(d.veteran_p))
                  .y(d => yLinearScale(regression2(d.veteran_p)));

    chart1.append("path")
              .attr("d", line1(vetData))
              .classed("line1", true);
    
    chart2.append("path")
              .attr("d", line2(vetData))
              .classed("line2", true);

  // Add circles and text.
    var dataSet1 = chartGroup.selectAll("g")
                            .data(vetData)
                            .enter();
    
    var circlesGroup1 = dataSet1.append("circle")
                                .attr("cx", d => xLinearScale(d.veteran_p))
                                .attr("cy", d => yLinearScale(d.heavy_dr_p))
                                .attr("r", "15")
                                .attr("fill", "rgb(41, 128, 185)")
                                .attr("opacity", ".5");
                                
    var text1 = dataSet1.append("text")
                        .attr("dx", function(d){ return xLinearScale(d.veteran_p);})
                        .attr("dy", function(d){ return yLinearScale(d.heavy_dr_p);})
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "central")
                        .text(function(d) {return d.abbr;})
                        .attr("class", "bubbleText");
                        
    var circlesGroup2 = dataSet1.append("circle")
                                .attr("cx", d => xLinearScale(d.veteran_p))
                                .attr("cy", d => yLinearScale(d.total_pop))
                                .attr("r", "15")
                                .attr("fill", "rgb(156, 11, 147)")
                                .attr("opacity", ".5");
                                
    var text2 = dataSet1.append("text")
                        .attr("dx", function(d){ return xLinearScale(d.veteran_p);})
                        .attr("dy", function(d){ return yLinearScale(d.total_pop);})
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "central")
                        .text(function(d) {return d.abbr;})
                        .attr("class", "bubbleText");
    
    // Define what is in the tool tip.
    var toolTip1 = d3.tip()
                      .attr("class", "tooltip1")
                      .offset([80, -60])
                      .html(function (d) {
                        return (`${d.name}<hr>Memory: ${d.memory}%<br>High School: ${d.heavy_dr_p}%`);
    });

    var toolTip2 = d3.tip()
                      .attr("class", "tooltip2")
                      .offset([80, -60])
                      .html(function (d) {
                        return (`${d.name}<hr>Memory: ${d.memory}%<br>Bachelors: ${d.total_pop}%`);
    });
  
    // Define actions with even listeners.
    chartGroup.call(toolTip1);
    chartGroup.call(toolTip2);

    text1.on("mouseover", function (data) {
      toolTip1.show(data);
      })
      .on("mouseout", function (data, index) {
        toolTip1.hide(data);
      });

    text2.on("mouseover", function (data) {
      toolTip2.show(data);
    })
      .on("mouseout", function (data, index) {
        toolTip2.hide(data);
      });

  // Create axes and title labels
    chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 30)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Percent Population");

    chartGroup.append("text")
            .attr("transform", `translate(${width/2}, ${height + margin.top + 10})`)
            .attr("class", "axisText")
            .text("Percent Veterans");

    chartGroup.append("text")
              .attr("transform", `translate(${width/2}, -20)`)
              .attr("class", "titleText")
              .text("Veterans v. Heavy Drinkers");
    
    // Add action for checkboxes.
    d3.selectAll('.messageCheckBox1').on("click", function() {
      var opacity1 = this.checked ? 1:0
      var opacity2 = this.checked? 0.5:0
        text1.attr("opacity", opacity1);
        circlesGroup1.attr("opacity", opacity2);
        chart1.attr("opacity", opacity1);
    });
    
    d3.selectAll('.messageCheckBox2').on("click", function() {
      var opacity1 = this.checked ? 1:0
      var opacity2 = this.checked? 0.5:0
        text2.attr("opacity", opacity1);
        circlesGroup2.attr("opacity", opacity2);
        chart2.attr("opacity", opacity1);
    });
    
  });
};

// Add analysis.
// d3.select(".text")
// .html(`<strong>ANALYSIS</strong><br><br>write something.<br><br><hr><br<br><br>`);

// // Function for best fit line.
// function leastSquaresequation(XaxisData, Yaxisdata) {
//   var ReduceAddition = function(prev, cur) { return prev + cur; };
  
//   // finding the mean of Xaxis and Yaxis data
//   var xBar = XaxisData.reduce(ReduceAddition) * 1.0 / XaxisData.length;
//   var yBar = Yaxisdata.reduce(ReduceAddition) * 1.0 / Yaxisdata.length;

//   var SquareXX = XaxisData.map(function(d) { return Math.pow(d - xBar, 2); })
//     .reduce(ReduceAddition);
  
//   var ssYY = Yaxisdata.map(function(d) { return Math.pow(d - yBar, 2); })
//     .reduce(ReduceAddition);
    
//   var MeanDiffXY = XaxisData.map(function(d, i) { return (d - xBar) * (Yaxisdata[i] - yBar); })
//     .reduce(ReduceAddition);
    
//   var slope = MeanDiffXY / SquareXX;
//   var intercept = yBar - (xBar * slope);
  
// // returning regression function
//   return function(x){
//     return x*slope+intercept;
//   }

// }