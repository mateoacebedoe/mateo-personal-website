import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";

class IntroBanner extends React.Component {
	render(){
		return(
			<div className="IntroBanner">
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



const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
