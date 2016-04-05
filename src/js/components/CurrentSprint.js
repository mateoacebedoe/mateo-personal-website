import React from "react";

export default class CurrentSprint extends React.Component {

	componentDidMount(){
		var data = [
			{
				"id": 1,
				"name": "Improve flexibility",
				"type": "soccer",
				"description": "I want to improve my flexibility in order to be able to have more reach. Ideally I would work on it 3 times a week through April 2016"
			},
			{
				"id": 2,
				"name": "Get Stronger",
				"type": "soccer",
				"description": "I want to get stronger in order to be better"
			}
		];


		var canvas = d3.select("#chart").append("svg").attr("width", 1000).attr("height", 1000).append("g");
		var width = 200;
		var height = 300;				

		var rectangles = canvas.selectAll("rect")
				.data(data)
				.enter()
				.append("g")
				.attr("class", "rectangle_group")
				
			rectangles.append("rect")
				.attr("width", width)
				.attr("height", height)
				.attr("x", function(d) { return width * (d.id-1); })
				.style("left", 200)
				.style("fill", "red")
				.style("stroke", "black")
				.style("stroke-width", "2px");
		
		
			rectangles.append("text")
				.text(function(d) { return d.name; })
				.attr("x", function(d) { return (width * (d.id-1)) + (width/2); })
				.attr("y", height/2)
				.style("fill", "black").style("font-size", "20px");

	}

	render() {
		return(
			<div id="currentSprint">
				<h1>This is a container for my chart</h1>
				<div id="chart"></div>
			</div>

		);
	}
}