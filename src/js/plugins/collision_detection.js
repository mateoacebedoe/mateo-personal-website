import d3 from "d3";

d3.run_collision_detection = function (events) {

  var width = 960,
      height = 500;

  var margin = {top: 60, right: 60, bottom: 60, left: 60}

  var x = d3.time.scale()
        .domain([new Date("2015-01-01"), new Date("2015-12-31")])
        .range([margin.left, width - margin.right]);

  var randomNodes = d3.range(100).map(function(d, i) { 
    var id = Math.random() > .5 ? (~~(Math.random() * 12) + 1) : 3 * (~~(Math.random() * 3) + 1);
    var date = "2015-" + id + "-01";
     
    return {
      radius: Math.random() * 12 + 4,
      id: id,
      date: date,
      x: x(new Date(date)),
      y: 50 + ~~(Math.random() * 2) * 500
    }; 
  })

  var nodes = events;

  nodes.forEach(function(d){
    d.radius = Math.random() * 12 + 4;
  });

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .gravity(0.05)
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
      .data(nodes)
      .enter().append("circle")
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d, i) { return color(~~(Math.random() * 12)); })

      .text("something");



  force.on("tick", tick);

  function tick(e){
    var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;
    console.log(q);
    while (++i < n) q.visit(collide(nodes[i]));

    //nodes.forEach(modeTowardsCategoryCenter(e.alpha));

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

    // var x_force_strength = alpha * .3;
    // var y_force_strength = alpha * .3;

    var x_force_strength = 1;
    var y_force_strength = 1;

    return function(d){
      d.y += (height/2 - d.y) * y_force_strength;
      d.x += (x(new Date(d.date)) - d.x) * x_force_strength;
    }
  }
}
