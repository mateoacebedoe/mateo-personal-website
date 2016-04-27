import d3 from "d3";

d3.run_timeline = function (nodes) {
  console.log("======nodes");
  console.log(nodes);
  var width = 960,
      height = 500;

  var margin = {top: 60, right: 60, bottom: 60, left: 60}

  var x = d3.time.scale()
        .domain([oldestDate(nodes), Date.now()])
        .range([margin.left, width - margin.right]);

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .gravity(0.05)
      .charge(0)
      .nodes(nodes)
      .size([width, height]);
      //.friction(0);

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

  svg.selectAll("circle")
      .data(nodes.slice(1))
    .enter().append("circle")
      .attr("r", function(d) { return 10; })
      .style("fill", function(d, i) { return color(~~(Math.random() * 20)); })


  force.on("tick", tick);

  function tick(e){
    var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;

    while (++i < n) q.visit(collide(nodes[i]));

    //nodes.forEach(modeTowardsCategoryCenter(e.alpha));

    svg.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  function collide(node) {
    console.log("======node x");
    console.log(node);
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
            r = node.radius + quad.point.radius;
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

    var x_force_strength = alpha * .3;
    var y_force_strength = alpha * .3;
    return function(d){
      d.y += (height/2 - d.y) * y_force_strength;
      d.x += (x(new Date(d.date)) - d.x) * x_force_strength;
    }
  }

  function oldestDate(nodes){
    //TODO
    return new Date("2011-06-01");
  }
}
