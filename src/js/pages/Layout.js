import React from "react";
import { Link } from "react-router";
import { NavigationBar } from "../Pages/NavigationBar"



export default class Layout extends React.Component {
	navigate(){
		this.props.history.pushState(null, "/")
	}

	render() {
		return(
			<div className="layout">
				<NavigationBar />
				{this.props.children}
				<Link to="archives/" className="btn btn-danger" activeClassName="active">archives</Link>
				<Link to="featured" className="btn btn-success">Featured</Link>
				<button onClick={this.navigate.bind(this)}>Featured</button>
			</div>
		);
	}
}