import React from "react";
import { Link } from "react-router";
import { NavBar } from "../components/NavBar";



export default class Layout extends React.Component {
	navigate(){
		this.props.history.pushState(null, "/")
	}

	render() {
		return(
			<div className="layout">
				<NavBar />
				{this.props.children}
				<Link to="archives/" className="btn btn-danger" activeClassName="active">archives</Link>
				<Link to="featured" className="btn btn-success">Featured</Link>
				<button onClick={this.navigate.bind(this)}>Featured</button>
			</div>
		);
	}
}