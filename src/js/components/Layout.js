import React from "react";

export default class Layout extends React.Component {
	render() {
		return(
			<div className="layout">
				<h1>It fucking works Bitcss!</h1>
				<IntroBanner />
				<Sprint />
				<Backlog />
				<Patched />
			</div>
		);
	}
}

class IntroBanner extends React.Component {
	render(){
		return(
			<div className="introBanner">
				<h2> IntroBanner!! This shit is getting real.</h2>
			</div>
		);
	}
}

class Sprint extends React.Component{
	render(){
		return(
			<div className="sprint">
				<h3>This is the container of my bastard sprint</h3>
			</div>
		);
	}
}

class Backlog extends React.Component{
	render(){
		return(
			<div className="backlog">
				<h3>This is the container to my backlog</h3>
			</div>
		);
	}
}

class Patched extends React.Component{
	render(){
		return(
			<div className="patched">
				<h5><i>This is the container to my patched work</i></h5>
			</div>
		);
	}
}