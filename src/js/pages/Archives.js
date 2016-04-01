import React from "react";

export default class Archives extends React.Component {
	render() {
		const params = this.props.params;
		const article = params.article;
		console.log(this.props);
		const {filter} =  this.props.location.query;
		return(
			<div>
				<h1>Archives {this.props.params.article}</h1>
				<h4>filter = {filter}</h4>
			</div>

		);
	}
}