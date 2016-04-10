import React from "react";
import sankey from "../plugins/sankey.js";
import bubbles from "../plugins/bubble_chart.js";


export default class CurrentSprint extends React.Component {
	componentDidMount(){
		d3.run_bubbles();
	}

	render() {

		const search_button_style={display:"none"};
		const g_tip_style={
							width:"150px",
							height:"80px",
							display:"none"
						};

		return(
			<div id="currentSprint">
				<h1>This is a container for my chart</h1>
				<div class="g-content">
					<div class="g-graphic">
						<div class="g-search">
							<input type="text" placeholder="Find a company or industry&hellip;"/>
							<button style={search_button_style} class="g-search-clear">X</button>
						</div>
						<div class="g-buttons">
							<button class="g-button g-active" data-view="overall">The Overall Picture</button>
							<button class="g-button" data-view="sector">The View by Industry</button>
						</div>
					</div>
					<div class="g-sector-notes"></div>
					<div class="g-tip" style={g_tip_style}>
						<div class="g-tip-shadow"></div>
						<svg class="g-tip-box" width="150" height="87">
						<path transform="translate(75,91)" d="M0.5,-6.5l5,-5H74.5v-79H-74.5v79H-5Z"></path>
						</svg>
						<div class="g-tip-content">
							<div class="g-tip-title">Apple</div>
							<div class="g-tip-metric" data-name="rate">
								<span class="g-tip-metric-name">Effective tax rate</span>
								<span class="g-tip-metric-value">14%</span>
							</div>
							<div class="g-tip-metric" data-name="taxes">
								<span class="g-tip-metric-name">Taxes paid</span>
								<span class="g-tip-metric-value">$4.3B</span>
							</div>
							<div class="g-tip-metric" data-name="earnings">
								<span class="g-tip-metric-name">Earnings</span>
								<span class="g-tip-metric-value">$16.2B</span>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}