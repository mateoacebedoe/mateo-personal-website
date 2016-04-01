import React from "react";
import { Link } from "react-router";

export default class Layout extends React.Component {
	navigate(){
		this.props.history.pushState(null, "/")
	}

	render() {
		return(
			<div className="layout">
				{this.props.children}
				<Link to="archives" className="btn btn-danger">archives</Link>
				<Link to="featured" className="btn btn-success">Featured</Link>
				<button onClick={this.navigate.bind(this)}>Featured</button>
			</div>
		);
	}
}