import d3 from "d3";

d3.run_multiple_foci = function () {
  var width = 960,
      height = 500;

  var margin = {top: 60, right: 60, bottom: 60, left: 60}

  var fill = d3.scale.category10();

  var x = d3.time.scale()
        .domain([new Date("2016-01-01"), Date.now()])
        .range([margin.left, width - margin.right]);

  var foci = [{x: x(new Date("2016-01-01")), y: 250}, 
              {x: x(new Date("2016-02-01")), y: 250}, 
              {x: x(new Date("2016-04-01")), y: 250}];

  var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.months, 1)
    .tickFormat(d3.time.format('%m'))
    .tickSize(0)
    .tickPadding(8);

  svg.append('g')
    .attr('class', 'x axis')
    .call(xAxis);

  var nodes = d3.range(100).map(function(d, i) {
    return {
      x: Math.random() * width / 2,
      y: Math.random() * height / 2,
      r: Math.random() * 10 + 3,
      id: ~~(Math.random() * 3),
      r: ~~(Math.random() * 10)
    };
  });

  var force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .gravity(-.05)
      .friction(.2)
      .charge(function(d) { return -Math.pow(d.r, 4) / 8; })
      .size([width, height])
      .on("tick", tick);

  force.start();

  var node = svg.selectAll("circle")
        .data(nodes).enter().append("circle")
        .attr("class", "node")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r * 5})
        .style("fill", function(d) { return fill(d.id); })
        .style("stroke", function(d) { return d3.rgb(fill(d.id)).darker(2); })
        .call(force.drag);

  function tick(e) {
    var k = .1 * e.alpha;

    // Push nodes toward their designated focus.
    nodes.forEach(function(o, i) {
      o.y += (foci[o.id].y - o.y) * k;
      o.x += (foci[o.id].x - o.x) * k;
    });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
}
