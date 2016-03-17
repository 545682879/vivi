"use strict";
define(function(require, exports, module) {
	require("../css/main.css");
	var react = require("jquery");
	var react = require("react");
	var reactDom = require("reactDom");
	
	var header = React.createClass({displayName: "header",
		getDefaultProps: function() {
			return {
			  names: ['a', 'b', 'c']
			}
		},
		handleClick: function(event) {
			
		},
		render: function () {
			var names = this.props.names;
			return (
				React.createElement("ul", {style: {display:inline-block}}, 
					
						names.map(function(name) {
						  return React.createElement("li", {key: name}, name);
						})
					
				)
			);
		}
	});

	module.exports = header;
	
});