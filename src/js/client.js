import React from "react";
import ReactDOM from "react-dom";
import Layout from "./pages/Layout";
import Featured from "./pages/Featured";
import Archives from "./pages/Archives";
import Bootstrap from "bootstrap-without-jquery";

import { Router, Route, IndexRoute, hashHistory} from "react-router";
//missing Bootstrap js


const app = document.getElementById('app');

ReactDOM.render(
	<Router history = {hashHistory}>
		<Route path= "/" component={Layout}>
			<IndexRoute component={Featured}></IndexRoute>
			<Route path="archives(/:article)" component={Archives}></Route>
			<Route path="featured" component={Featured}></Route>
		</Route>
	</Router>, 
app);
