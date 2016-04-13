import d3 from "d3";

d3.run_collision_detection = function () {
  var width = 960,
      height = 500;

  var margin = {top: 60, right: 60, bottom: 60, left: 60}

  var x = d3.time.scale()
        .domain([new Date("2015-01-01"), new Date("2015-12-31")])
        .range([margin.left, width - margin.right]);

  var nodes = d3.range(20).map(function(d, i) { 
    var id = (i % 12) + 1;
    //var id = ~~(Math.random() * 12)
    var date = "2015-" + id + "-01";
    return {
      radius: Math.random() * 12 + 4,
      id: id,
      date: date
    }; 
  }),
      root = nodes[0],
      color = d3.scale.category20();

  root.radius = 0;
  root.fixed = true;

  var force = d3.layout.force()
      .gravity(0)
      .charge(function(d, i) { return 0; })
      .nodes(nodes)
      .size([width, height]);

  force.start();

  var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.months, 1)
    .tickFormat(d3.time.format('%y, %m'))
    .tickSize(0)
    .tickPadding(8);

  svg.append('g')
    .attr('class', 'x axis')
    .call(xAxis);

  svg.selectAll("circle")
      .data(nodes.slice(1))
    .enter().append("circle")
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d, i) { return color(d.id); })


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

    var k = alpha * .07;
    return function(d){
      console.log("date: " + d.date);
      console.log("returned X: " + x(new Date(d.date)));
      console.log("d.x: " + d.x);
      console.log("x: " + (x(new Date(d.date)) - d.x ));
      d.y += (height/2 - d.y) * k;
      d.x += (x(new Date(d.date)) - d.x) * k;
    }
  }
}
