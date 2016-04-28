import d3 from "d3";
import d3tip from "d3-tip";

d3.run_collision_detection = function (events) {

  var nodes = events,
      width = 960,
      height = 500;

  var margin = {top: 60, right: 60, bottom: 60, left: 60}

  var x = d3.time.scale()
        .domain([oldestDate(nodes), Date.now()])
        .range([margin.left, width - margin.right]);

  var y0 = d3.scale.ordinal()
        .domain(["overall"])
        .range([height/2]);

  var radius = d3.scale.linear()
        .domain([1,2000])
        .range([10,70]);

  var color = d3.scale.category10();

  var force = d3.layout.force()
      .gravity(0.05)
      .charge(function(d, i) { return 0; })
      .nodes(events)
      .size([width, height])
      .friction(.05);

  force.start();

  var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.months, 6)
    .tickFormat(d3.time.format('%y, %m'))
    .tickSize(0)
    .tickPadding(8);

  svg.append('g')
    .attr('class', 'x axis')
    .call(xAxis);

  var circles = svg.selectAll("circle")
      .data(nodes)
      .enter()
      .append("g");

  var tip = d3.tip().attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(render_tooltip);

  svg.call(tip);

  circles.append("circle")
      .attr("r", function(d) { return radius(d.hours); })
      .style("fill", function(d) { return color(d.category); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);


  force.on("tick", tick);

  function tick(e){
    var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;
    while (++i < n) q.visit(collide(nodes[i]));

    nodes.forEach(modeTowardsCategoryCenter(e.alpha));

    svg.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  function collide(node) {
    var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = radius(node.hours) + radius(quad.point.hours);
        if (l < r) {
          l = (l - r) / l * .5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }

  function modeTowardsCategoryCenter(alpha){
     var force_strength = alpha * .3;

    //var x_force_strength = 1;
    //var y_force_strength = 1;

    return function(d){
      d.y += (y0("overall") - d.y) * force_strength;
      d.x += (x(new Date(d.date)) - d.x) * force_strength;
    }
  }

  function oldestDate(nodes){
    //TODO
    return new Date("2011-06-01");
  }

  function render_tooltip(d){
    return "<strong>Name:</strong> <span style='color:red'>" + d.name + "</span></br></br>" + 
           "<strong>Hours Spent:</strong> <span style='color:red'>" + d.hours + "</span>";
  }
}
