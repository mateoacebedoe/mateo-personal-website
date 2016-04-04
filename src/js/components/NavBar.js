import React from "react";
import { Link, IndexLink} from "react-router";

export default class NavBar extends React.Component {
  render() {
    return(
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <IndexLink to="/" class="navbar-brand">Mateo Acebedo</IndexLink>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><Link to="current_sprint">Current Sprint</Link></li>
              <li><Link to="archives">Archives</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}