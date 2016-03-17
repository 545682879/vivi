"use strict";
define(function(require, exports, module) {
	require("../css/main.css");
	var react = require("jquery");
	var react = require("react");
	var reactDom = require("reactDom");
	
	var frameComponent = React.createClass({displayName: "frameComponent",
		render: function () {
			return (
				React.createElement("div", {className: "frame"}, 
					"Hello World!"
				)
			);
		}
	});
	
	// �����ĵ� 
	ReactDOM.render(
		React.createElement(frameComponent, null),
		document.getElementById('example')
  	);
	
	//module.exports = frameComponent;
	
});