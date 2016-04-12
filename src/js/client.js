import React from "react";
import ReactDOM from "react-dom";
import Layout from "./pages/Layout";
import CurrentSprint from "./Components/CurrentSprint";
import Archives from "./pages/Archives";

import Bootstrap from "bootstrap-without-jquery";
import d3 from "d3";


import { Router, Route, IndexRoute, hashHistory} from "react-router";
//missing Bootstrap js


const app = document.getElementById('app');

ReactDOM.render(
	<Router history = {hashHistory}>
		<Route path= "/" component={Layout}>
			<IndexRoute component={CurrentSprint}></IndexRoute>
			<Route path="archives" component={Archives}></Route>
			<Route path="current_sprint" component={CurrentSprint}></Route>
		</Route>
	</Router>, 
app);
