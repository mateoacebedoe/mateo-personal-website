import d3 from "d3";

d3.run_collision_detection = function () {
  var width = 960,
      height = 500;

  var foci = [{x: 100, y: 250}, 
              {x: 400, y: 250}, 
              {x: 700, y: 250}];

  var nodes = d3.range(100).map(function() { 
    return {
      radius: Math.random() * 12 + 4,
      id: ~~(Math.random() * 3)
    }; 
  }),
      root = nodes[0],
      color = d3.scale.category10();

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

  svg.selectAll("circle")
      .data(nodes.slice(1))
    .enter().append("circle")
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d, i) { return color(d.id); });

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
    var k = alpha * .05;
    return function(d){
      d.y += (foci[d.id].y - d.y) * k;
      d.x += (foci[d.id].x - d.x) * k;
    }
  }
}
