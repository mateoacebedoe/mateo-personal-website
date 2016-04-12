import React from "react";
import foci from "../plugins/multiple_foci.js";


export default class Archives extends React.Component {
	componentDidMount(){
		d3.run_multiple_foci();
	}

	render() {
		return(
			<div id="foci_example">
				<h1>This is my archives page and it works </h1>
				<div id="chart"></div>
			</div>
		);
	}
}