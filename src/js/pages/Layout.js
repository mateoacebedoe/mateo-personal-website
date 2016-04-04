import React from "react";
import { Link } from "react-router";
import NavBar from "../components/NavBar";



export default class Layout extends React.Component {
	render() {
		return(
			<div className="layout">
				<NavBar />
				{this.props.children}
			</div>
		);
	}
}