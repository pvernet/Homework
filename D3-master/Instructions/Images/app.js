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
    bottom: 150,
    left: 100
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3.select(".chart")
              .append("svg")
              .attr("width", svgWidth)
              .attr("height", svgHeight)

  var chartGroup = svg.append("g")
                      .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
  d3.csv("veterans_ds.csv", function (err, vetData) {
    if (err) throw err;

    vetData.forEach(function (d) {
      d.veteran_p = +d.veteran_p;
      d.heavy_dr_p = +d.heavy_dr_p;
    });

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([0, ((d3.max(vetData, d => d.veteran_p))+4)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .range([height, 0]);
  
  var heavyMax = d3.max(vetData, d => d.heavy_dr_p); {
      yMax = heavyMax
  };
    yLinearScale.domain([0, (yMax+5)]);    

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

  chartGroup.append("g")
            .call(leftAxis);

   // Step 5: Create Circles
  // ==============================
  var circlesGroup1 = chartGroup.selectAll("g")
                                .data(vetData)
                                .enter()
                                .append("circle")
                                .attr("cx", d => xLinearScale(d.veteran_p))
                                .attr("cy", d => yLinearScale(d.heavy_dr_p))
                                .attr("r", "15")
                                .attr("fill", "rgb(41, 128, 185)")
                                .attr("opacity", ".5")

  //THIS IS WHERE I AM HAVING ISSUES.
  circlesGroup1.selectAll("circle")
                .data(vetData)
                .append("text")
                .attr("x", d => xLinearScale(d.veteran_p))
                .attr("y", d => yLinearScale(d.heavy_dr_p))
                .style("opacity", 1)
                .text("foo")

  circlesGroup1.selectAll("g")
                .append("text")
                .attr("x", d => xLinearScale(d.veteran_p))
                .attr("y", d => yLinearScale(d.heavy_dr_p))
                .text((d, i) => vetData[i].abbr)


  // Step 6: Initialize tool tip
  // ==============================
  var toolTip1 = d3.tip()
                  .attr("class", "tooltip1")
                  .offset([80, -60])
                  .html(function (d) {
                    return (`${d.name}<hr>veteran: ${d.memory}%<br>Heavy drinker: ${d.hs}%`);

  });
 

    var toolTip2 = d3.tip()
                      .attr("class", "tooltip2")
                      .offset([80, -60])
                      .html(function (d) {
                        return (`${d.name}<hr>Memory: ${d.memory}%<br>Bachelors: ${d.bach}%`);
    });
  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip1);
  chartGroup.call(toolTip2);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  circlesGroup1.on("click", function (data) {
      toolTip1.show(data);
    })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip1.hide(data);
    });

  circlesGroup2.on("click", function (data) {
      toolTip2.show(data);
    })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip2.hide(data);
    });
  // Create axes labels
  chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 30)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Percent Population, veteran");

  chartGroup.append("text")
            .attr("transform", `translate(${width/2}, ${height + margin.top + 10})`)
            .attr("class", "axisText")
            .text("Percent heavy drinkers");
  });
};