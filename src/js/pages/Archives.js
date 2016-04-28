import React from "react";
import foci from "../plugins/multiple_foci.js";
import collisions from "../plugins/collision_detection.js";
import timeline_chart from "../plugins/timeline_chart.js";

export default class Archives extends React.Component {

	componentDidMount(){
		//d3.run_multiple_foci();
		this.get_data(d3.run_collision_detection);
	}

	render() {
		return(
			<div id="foci_example">
				<h1>This is my archives page and it works </h1>
				<div id="chart"></div>
			</div>
		);
	}

	get_data(callback){
		this.firebaseRef = new Firebase("https://mae-personal-website.firebaseio.com/events");

		var events = null;

		this.firebaseRef.on("value", function(dataSnapshot) {
			events = dataSnapshot.val();
			callback(events);
		}.bind(this));
	}
}